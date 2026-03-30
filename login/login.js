// TRANG ĐĂNG NHẬP 

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

  formDangNhap.addEventListener('submit', async (suKien) => {
    suKien.preventDefault();
    const taiKhoan = inputTaiKhoan.value.trim();
    const matKhau = inputMatKhau.value;
    try {
      const res = await fetch('https://pmbuysource-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: taiKhoan, password: matKhau }),
      });
      const data = await res.json();
      if (data && data.thanh_cong) {
        localStorage.setItem('admin_auth', '1');
        const trangCanQuayLai = window.Auth && typeof window.Auth.getReturnUrl === 'function' ? window.Auth.getReturnUrl() : '../index.html';
        window.location.href = trangCanQuayLai || '../index.html';
        return;
      }
      hienThiLoi('Sai tài khoản hoặc mật khẩu!');
    } catch (e) {
      hienThiLoi('Không kết nối được máy chủ. Hãy chạy python3 server.py');
    }
  });

});
