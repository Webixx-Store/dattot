import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBlogById, loadBlogByIdSuccess } from 'src/app/actions/blog.actions';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { BlogModel } from 'src/app/model/blog.model';
import { BlogState, selectSelectedBlog } from 'src/app/selectors/blog.selectors';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostDetailComponent implements OnInit {

  blog: BlogModel = {} as BlogModel;
  blog$ = new Observable<BlogModel>();
  imgUrl:string = '';
  constructor(private sanitizer: DomSanitizer , private route: ActivatedRoute , private blogStore : Store<BlogState> , private meta: Meta,       // Inject Meta service
    private title: Title ) {
    this.blog$ = this.blogStore.select(selectSelectedBlog)
   }
  ngOnInit(): void {
    const id  = this.route.snapshot.paramMap.get('id');
    this.blogStore.dispatch(loadBlogById({id:String(id)}))
    this.blog$.subscribe(res =>{
      if(ValidationUtil.isNotNullAndNotEmpty(res.id)){
        this.blog = res;
        this.addLazyLoadingToImages();
        this.updateMetaTags();
      }
    })

    this.updateMetaTags();
  }

  ngOnDestroy(): void {
    this.blogStore.dispatch(loadBlogByIdSuccess({blog: {} as BlogModel}))
  }

  get sanitizedContent() {
    this.addLazyLoadingToImages();
    return this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
  }

  addLazyLoadingToImages() {


    const imgRegex = /<img\s+([^>]+)>/g;

    const firstImgMatch = imgRegex.exec(this.blog.content);
    if (firstImgMatch) {
      // Extract the src attribute value from the first image
      const srcRegex = /src="([^"]+)"/;
      const srcMatch = srcRegex.exec(firstImgMatch[1]);
      if (srcMatch) {
        const imgUrl: string = srcMatch[1];  // This will be the URL of the first image
        this.imgUrl = imgUrl
      }
    }

    this.blog.content = this.blog.content .replace(imgRegex, (match: string, group: string) => {
      // Thêm hoặc thay đổi thuộc tính "loading" thành "lazy"
      if (!group.includes('loading="lazy"')) {
        return `<img ${group} loading="lazy">`;
      }
      return match; // Nếu đã có thuộc tính "lazy", giữ nguyên
    });
  }

  updateMetaTags() {
    if (!this.blog.title || !this.imgUrl) return;

    // Basic META
    this.title.setTitle(this.blog.title);
    this.meta.updateTag({ name: 'description', content: this.blog.title });
    
    this.meta.updateTag({ property: 'title', content: this.blog.title }); // Sửa name thành property
    this.meta.updateTag({ property: 'description', content: this.blog.title });
    this.meta.updateTag({ property: 'image', content: this.imgUrl });
    this.meta.updateTag({ property: 'url', content: window.location.href });
    this.meta.updateTag({ property: 'type', content: 'article' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: this.blog.title }); // Sửa name thành property
    this.meta.updateTag({ property: 'og:description', content: this.blog.title });
    this.meta.updateTag({ property: 'og:image', content: this.imgUrl });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    this.meta.updateTag({ property: 'og:type', content: 'article' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.blog.title });
    this.meta.updateTag({ name: 'twitter:description', content: this.blog.title });
    this.meta.updateTag({ name: 'twitter:image', content: this.imgUrl });
  }

}
