const form = document.getElementById('registerForm');
const errEl = document.getElementById('registerError');
function showErr(msg) { errEl.textContent = msg; errEl.style.display = 'block'; }
function hideErr() { errEl.style.display = 'none'; }
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideErr();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  if (password !== confirm) { showErr('Mật khẩu xác nhận không khớp.'); return; }
  try {
    const res = await fetch('http://127.0.0.1:8001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data && data.thanh_cong) {
      window.location.href = 'login.html';
      return;
    }
    if (data && data.loi === 'ten_dang_nhap_ton_tai') {
      showErr('Tài khoản đã tồn tại, hãy chọn tên khác.');
      return;
    }
    if (data && data.loi === 'mat_khau_yeu') {
      showErr('Mật khẩu yếu: tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.');
      return;
    }
    showErr('Đăng ký thất bại, thử lại sau.');
  } catch (e_) {
    showErr('Không kết nối được máy chủ. Hãy chạy python3 app.py');
  }
});
