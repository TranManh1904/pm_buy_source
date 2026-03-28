// ======================================
// XỬ LÝ ĐĂNG NHẬP (BẢN DỄ HIỂU)
// ======================================

(function () {

  // KEY lưu trong trình duyệt
  const KHOA_LUU_TRANG_THAI = 'admin_auth';

  // Tài khoản demo
  const TAI_KHOAN_ADMIN = 'admin';
  const MAT_KHAU_ADMIN = 'admin';

  // -------------------------------
  // KIỂM TRA ĐÃ ĐĂNG NHẬP CHƯA
  // -------------------------------
  function daDangNhap() {
    return localStorage.getItem(KHOA_LUU_TRANG_THAI) === '1';
  }

  // -------------------------------
  // HÀM ĐĂNG NHẬP
  // -------------------------------
  function dangNhap(taiKhoan, matKhau) {

    const dung =
      String(taiKhoan || '').trim() === TAI_KHOAN_ADMIN &&
      String(matKhau || '') === MAT_KHAU_ADMIN;

    if (dung) {
      // Nếu đúng → lưu trạng thái
      localStorage.setItem(KHOA_LUU_TRANG_THAI, '1');
    } else {
      // Nếu sai → xóa
      localStorage.removeItem(KHOA_LUU_TRANG_THAI);
    }

    return dung;
  }

  // -------------------------------
  // ĐĂNG XUẤT
  // -------------------------------
  function dangXuat() {
    localStorage.removeItem(KHOA_LUU_TRANG_THAI);
  }

  // -------------------------------
  // CHUYỂN ĐẾN TRANG LOGIN
  // -------------------------------
  function chuyenDenLogin(options) {
    const trangQuayLai = options?.returnUrl || '';

    const url = new URL('login/login.html', window.location.href);

    if (trangQuayLai) {
      url.searchParams.set('return', trangQuayLai);
    }

    window.location.href = url.toString();
  }

  // -------------------------------
  // LẤY TRANG QUAY LẠI SAU LOGIN
  // -------------------------------
  function layTrangQuayLai() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('return') || '../index.html';
    } catch {
      return '../index.html';
    }
  }
 
  // -------------------------------
  // EXPORT RA NGOÀI ĐỂ FILE KHÁC DÙNG
  // -------------------------------
  window.Auth = {
    daDangNhap,
    dangNhap,
    dangXuat,
    chuyenDenLogin,
    layTrangQuayLai,
  };

})();