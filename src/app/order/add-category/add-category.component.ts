import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
ngOnInit(): void {
  throw new Error('Method not implemented.');
}

// Khai báo kiểu cho subCategories
  category = {
    mainCategory: '',         // Danh mục chính
    subCategories: [{ name: '' }] // Khởi tạo mảng subCategories với một đối tượng mẫu
  };

  // Hàm thêm danh mục con
  addSubCategory() {
    // Đảm bảo rằng subCategories là một mảng chứa các đối tượng có thuộc tính 'name'
    this.category.subCategories.push({ name: '' });
  }

  // Hàm xóa danh mục con theo chỉ số
  removeSubCategory(index: number) {
    this.category.subCategories.splice(index, 1);
  }

  // Hàm xử lý khi form được submit
  onSubmit() {
    console.log('Danh mục chính:', this.category.mainCategory);
    console.log('Danh mục con:', this.category.subCategories);
    // Gửi dữ liệu tới backend hoặc lưu trữ
    alert('Danh mục đã được lưu');
  }

}
