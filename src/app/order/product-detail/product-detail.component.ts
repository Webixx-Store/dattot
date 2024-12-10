import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductResponseModel } from './../../model/product-response.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Observable, observable, Subject, takeUntil } from 'rxjs';
import { productAction } from 'src/app/actions/product.action';
import { AuthDetail } from 'src/app/common/util/auth-detail';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ProductModel } from 'src/app/model/product.model';
import { getProducts, ProductState } from 'src/app/selectors/product.selector';
import { CartService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/common/util/common-utils';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  isPopupOpen = true;
  product$ = new Observable<ProductResponseModel>();
  private destroy$ = new Subject<void>(); // Thêm destroy$ ở đây
  product : ProductModel = {} as ProductModel;
  constructor(private route: ActivatedRoute , private productStore: Store<ProductState>,
    private cartService : CartService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.product$ = this.productStore.select(getProducts);
  }
  productId:string = "";
  apiUrl:string = environment.apiUrl;

    description = '<p><strong>This is a product description</strong></p><p>This is another paragraph that should appear on a new line.</p>'
    // các thuộc tính khác



    ngOnInit(): void {
      // Sử dụng debounceTime để tránh việc gọi API quá nhiều
      this.route.paramMap.pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      ).subscribe({
        next: (params) => {
          const productId = params.get('product');
          if (productId && productId !== this.productId) {
            this.productId = String(productId);
            this.productStore.dispatch(productAction({params:{ id:this.productId }}));
          }
        },
        error: (error) => {
          console.error('Param error:', error);
          this.toastr.error('Có lỗi xảy ra khi tải thông tin');
        }
      });

      this.product$.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged()
      ).subscribe({
        next: (res) => {
          if (ValidationUtil.isNotNullAndNotEmpty(res)) {
            this.product = res.products[0];
          }
        },
        error: (error) => {
          console.error('Product error:', error);
          this.toastr.error('Có lỗi xảy ra khi tải sản phẩm');
        }
      });
    }

  closePopup():void{
    this.isPopupOpen = false;
  }

  getSanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.product.description);
  }

  getTextUpdate(updateAt:string){
    return CommonUtils.getUpdateTimeMessage(updateAt);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
