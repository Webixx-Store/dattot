import { ConvertUtil } from "./convert.util";

export class CommonUtils {

  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getUpdateTimeMessage(updatedAt: string): string {
    // Chuyển đổi chuỗi thành đối tượng Date
    const updatedDate = new Date(updatedAt);
    const now = new Date();
    // Tính số ngày chênh lệch
    const diffInTime = now.getTime() - updatedDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
      return "Cập nhật hôm nay";
    } else if (diffInDays === 1) {
      return "Cập nhật hôm qua";
    } else if (diffInDays >= 2 && diffInDays <= 30) {
      return `Cập nhật ${diffInDays} ngày trước`;
    } else if (diffInDays > 30 && diffInDays <= 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `Cập nhật ${diffInMonths} tháng trước`;
    } else if (diffInDays > 365) {
      const diffInYears = Math.floor(diffInDays / 365);
      return `Cập nhật ${diffInYears} năm trước`;
    }
    // Trường hợp mặc định: trả về ngày/giờ định dạng
    return `Cập nhật: ${updatedDate.toLocaleDateString('vi-VN')} ${updatedDate.toLocaleTimeString('vi-VN')}`;
  }

}
