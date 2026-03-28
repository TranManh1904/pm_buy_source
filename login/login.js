// ================================
// TRANG ĐĂNG NHẬP (BẢN DỄ HIỂU)
// ================================

document.addEventListener('DOMContentLoaded', () => {

  // Lấy các phần tử trên giao diện
  const formDangNhap = document.getElementById('loginForm');
  const boxLoi = document.getElementById('loginError');
  const inputTaiKhoan = document.getElementById('username');
  const inputMatKhau = document.getElementById('password');

  // Hàm hiển thị lỗi
  function hienThiLoi(noiDung) {
    boxLoi.textContent = noiDung;
    boxLoi.style.display = 'block';
  }

  // // Hàm ẩn lỗi
  // function anLoi() {
  //   boxLoi.textContent = '';
  //   boxLoi.style.display = 'none';
  // }

  // Tự điền sẵn tài khoản demo
  if (inputTaiKhoan) inputTaiKhoan.value = 'admin';
  if (inputMatKhau) inputMatKhau.value = 'admin';

  // Bắt sự kiện khi bấm nút ĐĂNG NHẬP
  formDangNhap.addEventListener('submit', (suKien) => {
    
    // Ngăn reload trang
    suKien.preventDefault();

    // Ẩn lỗi cũ
    anLoi();

    // Kiểm tra có file auth.js không
    if (!window.Auth || typeof window.Auth.login !== 'function') {
      hienThiLoi('Thiếu file auth.js, kiểm tra lại nhé!');
      return;
    }

    // Lấy dữ liệu người dùng nhập
    const taiKhoan = inputTaiKhoan.value;
    const matKhau = inputMatKhau.value;

    // Gọi hàm đăng nhập 
    const dangNhapThanhCong = window.Auth.login(taiKhoan, matKhau);

    // Nếu sai
    if (!dangNhapThanhCong) {
      hienThiLoi('Sai tài khoản hoặc mật khẩu!');
      return;
    }

    // Nếu đúng → chuyển trang
    const trangCanQuayLai = window.Auth.getReturnUrl();
    window.location.href = trangCanQuayLai || '../index.html';
  });

});