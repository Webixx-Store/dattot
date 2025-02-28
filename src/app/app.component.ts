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
    this.title.setTitle('Phân tích xu hướng tiền điện tử chuyên nghiệp');

  }
}
