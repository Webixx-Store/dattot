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
    // Set the page title
    this.title.setTitle(this.blog.title);
    // Update Open Graph meta tags
    this.meta.updateTag({ name: 'description', content: this.blog.title});
    this.meta.updateTag({ name: 'og:title', content: this.blog.title });
    this.meta.updateTag({ name: 'og:description', content: this.blog.title});
    this.meta.updateTag({ name: 'og:image', content: this.imgUrl });  // Ensure you have an image URL in the blog model
    this.meta.updateTag({ name: 'og:url', content: window.location.href });
  }

}
