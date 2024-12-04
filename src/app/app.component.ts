import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private meta: Meta, private title: Title) {
    // Đặt tiêu đề (title) cho trang
    this.title.setTitle('Mua bán đất chính chủ, giá tốt');

    // Thêm các thẻ meta
    this.meta.addTags([
      { name: 'description', content: 'Dattot.vn là nền tảng mua bán đất chính chủ, cập nhật giá tốt nhất và pháp lý minh bạch.' },
      { name: 'keywords', content: 'mua đất, bán đất, bất động sản, đất nền, giá rẻ xxx hoang linh' },
      { name: 'author', content: 'Dattot.vn' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
  }
}
