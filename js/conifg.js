// ===== CẤU HÌNH GIAO DIỆN (dùng cho Element SDK) =====
const defaultConfig = {
  background_color: '#0a0a1a',
  surface_color: '#1a1a3e',
  text_color: '#e8e8f0',
  accent_color: '#6c5ce7',
  accent_secondary_color: '#00cec9',
  font_family: 'Plus Jakarta Sans',
  font_size: 16,
  hero_headline: 'Build Your Future With Code',
  hero_subtext: "Hi, I'm Tran Manh — a Full-stack Developer specializing in web applications, backend systems, and practical IT solutions. I also teach programming and sell high-quality source code.",
  about_bio: 'I specialize in building web applications, backend systems, and practical IT solutions. With expertise in Python, Flask, JavaScript, and SQL, I create robust and scalable software. I\'m passionate about sharing knowledge through courses and providing production-ready source code.',
  contact_phone: '0923397935',
};

// ===== ÁP DỤNG NGÔN NGỮ =====
// Cài đặt -> chọn ngôn ngữ -> applyLanguage() sẽ:
// 1) lưu lang vào localStorage; 2) cập nhật text [data-i18n];
// 3) gọi applyConfig() để cập nhật các nội dung dài; 4) render lại thẻ
function applyLanguage(lang) {
  window.__lang = lang === 'vi' ? 'vi' : 'en';
  localStorage.setItem('lang', window.__lang);
  document.documentElement.lang = window.__lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    const value = t(key);
    if (!value) return;
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });

  const select = document.getElementById('languageSelect');
  if (select) select.value = window.__lang;

  applyConfig(languageConfig[window.__lang] || {});
  renderCards('coursesGrid', coursesData, 'course');
  renderCards('sourceGrid', sourceData, 'source');
  renderTestimonials();
  updateAuthUI();
  lucide.createIcons();
}

// ===== ÁP DỤNG CẤU HÌNH TỪ SDK =====
function applyConfig(config) {
  const c = { ...defaultConfig, ...config };

  // Hero
  const headline = document.getElementById('heroHeadline');
  if (headline) {
    const parts = (c.hero_headline || defaultConfig.hero_headline).split(' ');
    const mid = Math.ceil(parts.length / 2);
    headline.innerHTML = `<span class="gradient-text">${parts.slice(0, mid).join(' ')}</span><br>${parts.slice(mid).join(' ')}`;
  }
  const subtext = document.getElementById('heroSubtext');
  if (subtext) subtext.innerHTML = c.hero_subtext || defaultConfig.hero_subtext;

  const aboutBio = document.getElementById('aboutBio');
  if (aboutBio) aboutBio.textContent = c.about_bio || defaultConfig.about_bio;

  const phone = document.getElementById('contactPhone');
  if (phone) phone.textContent = c.contact_phone || defaultConfig.contact_phone;

  // Font
  const fontFamily = c.font_family || defaultConfig.font_family;
  const baseStack = 'Plus Jakarta Sans, sans-serif';
  document.body.style.fontFamily = `${fontFamily}, ${baseStack}`;

  // Font size
  const baseSize = c.font_size || defaultConfig.font_size;
  document.querySelectorAll('.section-title').forEach(el => el.style.fontSize = `${baseSize * 1.8}px`);
  document.querySelectorAll('.hero-desc, .about-text').forEach(el => el.style.fontSize = `${baseSize * 1.05}px`);
  document.querySelectorAll('.card-desc, .testimonial-quote').forEach(el => el.style.fontSize = `${baseSize * 0.9}px`);
}

// Kết nối Element SDK (nếu có) để chỉnh giao diện trực tiếp
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.accent_color || defaultConfig.accent_color, set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } },
        { get: () => config.accent_secondary_color || defaultConfig.accent_secondary_color, set: (v) => { config.accent_secondary_color = v; window.elementSdk.setConfig({ accent_secondary_color: v }); } },
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      },
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
      ['hero_subtext', config.hero_subtext || defaultConfig.hero_subtext],
      ['about_bio', config.about_bio || defaultConfig.about_bio],
      ['contact_phone', config.contact_phone || defaultConfig.contact_phone],
    ]),
  });
}

// ===== RENDER THẺ SẢN PHẨM/KHÓA HỌC =====
function renderCards(container, data, type) {
  const grid = document.getElementById(container);
  grid.innerHTML = '';
  data.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card fade-up visible';
    card.style.transitionDelay = `${i * 0.08}s`;
    const getVal = (key, fb) => { const v = t(key); return v === key ? fb : v; };
    const idKey = (item.id || '').toLowerCase();
    const prefix = type === 'course' ? 'course' : 'source';
    const tagTxt = getVal(`${prefix}.${idKey}.tag`, item.tag);
    const titleTxt = getVal(`${prefix}.${idKey}.title`, item.title);
    const descTxt = getVal(`${prefix}.${idKey}.desc`, item.desc);
    card.innerHTML = `
      <div class="card-banner" style="background: linear-gradient(135deg, rgba(108,92,231,0.2), rgba(0,206,201,0.15));">
        <span style="font-size:3rem; position:relative; z-index:1;">${item.icon}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${tagTxt}</span>
        <h3 class="card-title">${titleTxt}</h3>
        <p class="card-desc">${descTxt}</p>
        <div class="card-footer">
          <div class="card-price">${item.price}</div>
          <button class="card-btn" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-type="${type}">
            ${type === 'course' ? `<i data-lucide="shopping-cart" style="width:14px;height:14px;"></i> ${t('card.buyNow')}` : `<i data-lucide="download" style="width:14px;height:14px;"></i> ${t('card.buy')}`}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== RENDER TESTIMONIALS =====
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = '';
  testimonials.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'testimonial fade-up visible';
    el.style.transitionDelay = `${i * 0.1}s`;
    const tid = `test.t${i+1}`;
    const roleTxt = (() => { const v = t(`${tid}.role`); return v === `${tid}.role` ? item.role : v; })();
    const textTxt = (() => { const v = t(`${tid}.text`); return v === `${tid}.text` ? item.text : v; })();
    el.innerHTML = `
      <div class="stars">★★★★★</div>
      <p class="testimonial-quote">"${textTxt}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${item.avatar}</div>
        <div>
          <div class="testimonial-name">${item.name}</div>
          <div class="testimonial-role">${roleTxt}</div>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

// ===== TẠO QR GIẢ =====
function generateFakeQR() {
  const container = document.getElementById('qrDisplay');
  container.innerHTML = '';
  const img = document.createElement('img');
  img.src = 'img/qr.png';
  img.alt = 'QR';
  img.className = 'qr-image';
  container.appendChild(img);
}

// ===== MỞ MODAL THANH TOÁN =====
function openPayment(title, price) {
  document.getElementById('modalTitle').textContent = `${t('payment.purchasePrefix')} ${title}`;
  document.getElementById('modalSubtitle').textContent = `${t('payment.amountPrefix')} ${price}`;
  document.getElementById('bankAmount').textContent = price;
  document.getElementById('bankContent').textContent = `MANHDEV ${title.toUpperCase().replace(/\s/g, '')}`;
  generateFakeQR();
  document.getElementById('paymentModal').classList.add('open');
}

// ===== THÔNG BÁO NGẮN (TOAST) =====
function showToast(msg) {
  const tEl = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  tEl.classList.add('show');
  setTimeout(() => tEl.classList.remove('show'), 3000);
}

// ===== CHUYỂN CHẾ ĐỘ TỐI/SÁNG =====
function toggleDarkMode() {
  const isDark = !document.documentElement.classList.contains('light-mode');
  document.documentElement.classList.toggle('light-mode', isDark);
  lucide.createIcons();
}

// ===== KHỞI TẠO SỰ KIỆN =====
// - Mở Cài đặt: openSettings() -> hiển thị modal, set giá trị ngôn ngữ hiện tại
// - Lưu Cài đặt: settingsSave -> gọi applyLanguage()
// - Các nút khác: dark mode, mobile menu, admin, mua hàng...
document.addEventListener('DOMContentLoaded', () => {
  renderCards('coursesGrid', coursesData, 'course');
  renderCards('sourceGrid', sourceData, 'source');
  renderTestimonials();
  lucide.createIcons();
  applyConfig(defaultConfig);

  const savedLang = localStorage.getItem('lang');
  applyLanguage(savedLang || 'vi');

  // Hiệu ứng xuất hiện
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Sticky nav
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu
  document.getElementById('mobileToggle').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
  });

  // Dark mode (hiện trên mobile nếu <=768px)
  const mdt = document.getElementById('darkToggleMobile');
  if (window.innerWidth <= 768) mdt.style.display = 'flex';
  window.addEventListener('resize', () => { mdt.style.display = window.innerWidth <= 768 ? 'flex' : 'none'; });
  const dt = document.getElementById('darkToggle');
  if (dt) dt.addEventListener('click', toggleDarkMode);
  document.getElementById('darkToggleMobile').addEventListener('click', toggleDarkMode);

  // USER MENU: avatar dropdown
  const avatarBtn = document.getElementById('userAvatarBtn');
  const userDropdown = document.getElementById('userDropdown');
  if (avatarBtn && userDropdown) {
    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = userDropdown.classList.toggle('open');
      avatarBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      lucide.createIcons();
    });
    document.addEventListener('click', (e) => {
      if (!userDropdown.contains(e.target) && e.target !== avatarBtn) {
        userDropdown.classList.remove('open');
        avatarBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const menuDarkToggle = document.getElementById('menuDarkToggle');
  if (menuDarkToggle) menuDarkToggle.addEventListener('click', () => { toggleDarkMode(); lucide.createIcons(); });
  const menuLangVi = document.getElementById('menuLangVi');
  if (menuLangVi) menuLangVi.addEventListener('click', () => { applyLanguage('vi'); updateAuthUI(); });
  const menuLangEn = document.getElementById('menuLangEn');
  if (menuLangEn) menuLangEn.addEventListener('click', () => { applyLanguage('en'); updateAuthUI(); });
  const menuLogout = document.getElementById('menuLogout');
  if (menuLogout) menuLogout.addEventListener('click', () => {
    if (window.Auth && typeof window.Auth.logout === 'function') window.Auth.logout();
    const overlay = document.getElementById('adminOverlay');
    if (overlay) overlay.classList.remove('open');
    updateAuthUI();
    lucide.createIcons();
    const dd = document.getElementById('userDropdown'); if (dd) dd.classList.remove('open');
  });

  // CÀI ĐẶT: mở/đóng modal và lưu ngôn ngữ
  const openSettings = () => {
    document.getElementById('settingsModal').classList.add('open');
    const select = document.getElementById('languageSelect');
    if (select) select.value = window.__lang || 'en';
    lucide.createIcons();
  };
  const sb_ = document.getElementById('settingsBtn');
  if (sb_) sb_.addEventListener('click', openSettings);
  const sbm_ = document.getElementById('settingsBtnMobile');
  if (sbm_) sbm_.addEventListener('click', openSettings);
  const smm_ = document.getElementById('settingsMenuMobile');
  if (smm_) smm_.addEventListener('click', (e) => {
      e.preventDefault();
      const mm = document.getElementById('mobileMenu'); if (mm) mm.classList.remove('open');
      openSettings();
  });
  const sc_ = document.getElementById('settingsClose');
  if (sc_) sc_.addEventListener('click', () => {
    const smodal = document.getElementById('settingsModal'); if (smodal) smodal.classList.remove('open');
  });
  const smodal_ = document.getElementById('settingsModal');
  if (smodal_) smodal_.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
  const ss_ = document.getElementById('settingsSave');
  if (ss_) ss_.addEventListener('click', () => {
    const sel = document.getElementById('languageSelect');
    const lang = sel ? sel.value : 'en';
    applyLanguage(lang);
    const sm = document.getElementById('settingsModal'); if (sm) sm.classList.remove('open');
  });

  // MUA HÀNG
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-btn');
    if (btn) {
      const logged =
        (window.Auth && typeof window.Auth.isLoggedIn === 'function' && window.Auth.isLoggedIn()) ||
        localStorage.getItem('admin_auth') === '1';
      if (!logged) {
        showToast(t('toast.loginRequired'));
        window.location.href = 'login/login.html';
        return;
      }
      openPayment(btn.dataset.title, btn.dataset.price);
    }
  });

  // PAYMENT MODAL
  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('paymentModal').classList.remove('open');
  });
  document.getElementById('paymentModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('tabQr').style.display = tab.dataset.tab === 'qr' ? 'block' : 'none';
      document.getElementById('tabBank').style.display = tab.dataset.tab === 'bank' ? 'block' : 'none';
    });
  });

  // LOGIN/LOGOUT: cập nhật nút theo trạng thái đăng nhập
  updateAuthUI();
  const handleAuthClick = () => {
    if (window.Auth && typeof window.Auth.isLoggedIn === 'function' && window.Auth.isLoggedIn()) {
      if (typeof window.Auth.logout === 'function') window.Auth.logout();
      const overlay = document.getElementById('adminOverlay');
      if (overlay) overlay.classList.remove('open');
      updateAuthUI();
      lucide.createIcons();
      return;
    }
    if (window.Auth && typeof window.Auth.gotoLogin === 'function') {
      window.Auth.gotoLogin({ returnUrl: window.location.href });
      return;
    }
    window.location.href = 'login/login.html';
  };
  const authBtn = document.getElementById('authBtn');
  if (authBtn) authBtn.addEventListener('click', handleAuthClick);
  const authMenuMobile = document.getElementById('authMenuMobile');
  if (authMenuMobile) {
    authMenuMobile.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('mobileMenu').classList.remove('open');
      handleAuthClick();
    });
  }

  // ADMIN OVERLAY
  const openAdminOverlay = () => {
    document.getElementById('adminOverlay').classList.add('open');
    document.body.classList.add('no-scroll');
    lucide.createIcons();
  };
  const gotoLogin = () => {
    if (window.Auth && typeof window.Auth.gotoLogin === 'function') {
      window.Auth.gotoLogin({ returnUrl: window.location.href });
      return;
    }
    window.location.href = 'login/login.html';
  };
  const handleAdminClick = () => {
    if (window.Auth && typeof window.Auth.isLoggedIn === 'function' && window.Auth.isLoggedIn()) {
      openAdminOverlay();
      return;
    }
    gotoLogin();
  };

  document.getElementById('adminBtn').addEventListener('click', handleAdminClick);
  document.getElementById('adminBtnMobile').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('mobileMenu').classList.remove('open');
    handleAdminClick();
  });
  document.getElementById('adminClose').addEventListener('click', () => {
    document.getElementById('adminOverlay').classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // ADMIN: Reset password
  const resetBtn = document.getElementById('resetSubmitBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      const secret = document.getElementById('adminSecretInput').value.trim();
      const username = document.getElementById('resetUserInput').value.trim();
      const pw = document.getElementById('resetPassInput').value;
      const cf = document.getElementById('resetConfirmInput').value;
      const msg = document.getElementById('resetMsg');
      if (!secret || !username || !pw || !cf) { msg.textContent = 'Điền đầy đủ thông tin.'; return; }
      if (pw !== cf) { msg.textContent = 'Mật khẩu xác nhận không khớp.'; return; }
      try {
        const res = await fetch('http://127.0.0.1:8001/api/admin/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Secret': secret },
          body: JSON.stringify({ username, new_password: pw }),
        });
        const data = await res.json();
        if (data && data.thanh_cong) { msg.textContent = 'Đặt lại mật khẩu thành công.'; return; }
        if (data && data.loi === 'mat_khau_yeu') { msg.textContent = 'Mật khẩu yếu: tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.'; return; }
        if (data && data.loi === 'khong_co_quyen') { msg.textContent = 'Sai admin secret.'; return; }
        msg.textContent = 'Không đặt lại được mật khẩu.';
      } catch (e) {
        msg.textContent = 'Không kết nối được máy chủ.';
      }
    });
  }
  // FORM LIÊN HỆ
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast(t('toast.messageSent'));
    e.target.reset();
  });
});
