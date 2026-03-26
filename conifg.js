// ===== DỮ LIỆU MẪU =====
const coursesData = [
  { id: 'c1', title: 'Python Mastery', desc: 'From zero to hero: Learn Python programming from basics to advanced topics including OOP, file handling, and automation.', price: '299K ₫', icon: '🐍', tag: 'Bestseller' },
  { id: 'c2', title: 'Web Dev Bootcamp', desc: 'Complete web development course: HTML, CSS, JavaScript, responsive design, and real-world projects.', price: '499K ₫', icon: '🌐', tag: 'Popular' },
  { id: 'c3', title: 'Flask REST API', desc: 'Build production-ready REST APIs with Flask, SQLAlchemy, JWT authentication, and deployment.', price: '199K ₫', icon: '⚡', tag: 'New' },
  { id: 'c4', title: 'SQL & Database Design', desc: 'Master relational databases: queries, joins, indexing, optimization, and PostgreSQL/MySQL.', price: '249K ₫', icon: '🗄️', tag: 'Essential' },
  { id: 'c5', title: 'Git & DevOps Basics', desc: 'Version control, CI/CD pipelines, Docker containers, and deployment workflows.', price: '149K ₫', icon: '🔧', tag: 'Practical' },
  { id: 'c6', title: 'JavaScript Advanced', desc: 'Deep dive into JS: closures, async/await, DOM manipulation, and modern ES6+ features.', price: '349K ₫', icon: '✨', tag: 'Advanced' },
];

const sourceData = [
  { id: 's1', title: 'E-Commerce System', desc: 'Full-featured online store with cart, checkout, admin panel, and payment integration. Flask + PostgreSQL.', price: '599K ₫', icon: '🛒', tag: 'Full System' },
  { id: 's2', title: 'Blog Platform', desc: 'Modern blog with user auth, rich text editor, comments, categories, and SEO optimization.', price: '349K ₫', icon: '📝', tag: 'Ready to Deploy' },
  { id: 's3', title: 'Task Manager App', desc: 'Kanban-style task management with drag-and-drop, teams, notifications, and analytics dashboard.', price: '399K ₫', icon: '📋', tag: 'Popular' },
  { id: 's4', title: 'Portfolio Template', desc: 'Beautiful responsive portfolio template. Easy to customize with dark/light mode support.', price: '149K ₫', icon: '💼', tag: 'Template' },
  { id: 's5', title: 'REST API Boilerplate', desc: 'Production-ready Flask API boilerplate with JWT auth, CORS, rate limiting, and Swagger docs.', price: '249K ₫', icon: '🔌', tag: 'Starter Kit' },
  { id: 's6', title: 'Student Management', desc: 'Complete student/class management system with grade tracking, attendance, and reports.', price: '499K ₫', icon: '🎓', tag: 'Full System' },
];

const testimonials = [
  { name: 'Nguyen Van A', role: 'Web Developer', text: 'The Python course was exactly what I needed. Clear explanations, practical projects, and great support from Manh.', avatar: 'N' },
  { name: 'Le Thi B', role: 'Student', text: 'I bought the E-Commerce source code and saved weeks of development time. Clean code, well documented. Highly recommend!', avatar: 'L' },
  { name: 'Pham Hoang C', role: 'Freelancer', text: 'Best programming courses in Vietnamese. The Flask API course helped me land my first freelance project. Thank you Manh!', avatar: 'P' },
];

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
  contact_phone: '0865853943',
};

// ===== I18N: BỘ DỊCH =====
// Chức năng Cài đặt: quản lý ngôn ngữ Việt/Anh
// - translations: từ điển chuỗi
// - languageConfig: cấu hình thay đổi nội dung dài (headline, bio)
// - t(key): hàm lấy chuỗi theo ngôn ngữ
// - applyLanguage(lang): áp dụng dịch và gọi applyConfig(), renderCards()
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.source': 'Source Code',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.adminDashboard': 'Admin Dashboard',
    'nav.settings': 'Settings',
    'hero.badge': 'Available for projects',
    'hero.btnCourses': 'View Courses',
    'hero.btnSource': 'Buy Source Code',
    'about.tag': 'About Me',
    'about.title': 'Know Who I Am',
    'about.subtitle': 'Passionate developer with years of hands-on experience',
    'about.skillsTitle': 'Skills & Technologies',
    'courses.tag': 'Courses',
    'courses.title': 'Learn & Level Up',
    'courses.subtitle': 'Practical programming courses to boost your career',
    'source.tag': 'Source Code',
    'source.title': 'Ready-Made Projects',
    'source.subtitle': 'High-quality source code to accelerate your development',
    'testimonials.tag': 'Testimonials',
    'testimonials.title': 'What Students Say',
    'contact.tag': 'Contact',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a question or want to work together?',
    'contact.phoneLabel': 'Phone / Zalo',
    'contact.locationLabel': 'Location',
    'contact.locationValue': 'Vietnam',
    'contact.responseLabel': 'Response Time',
    'contact.responseValue': 'Within 24 hours',
    'form.nameLabel': 'Your Name',
    'form.namePlaceholder': 'Enter your name',
    'form.emailLabel': 'Email',
    'form.messageLabel': 'Message',
    'form.messagePlaceholder': 'How can I help you?',
    'form.send': 'Send Message',
    'footer.desc': 'Full-stack developer, educator, and code creator. Building digital solutions and empowering developers.',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect',
    'settings.title': 'Settings',
    'settings.subtitle': 'Choose language',
    'settings.languageLabel': 'Language',
    'settings.save': 'Save',
    'payment.sample': '⚠ Sample / Demo',
    'payment.title': 'Payment Details',
    'payment.subtitle': 'Complete your purchase',
    'payment.tabQr': 'QR Code',
    'payment.tabBank': 'Bank Transfer',
    'payment.qrLabel': 'Scan to pay via banking app',
    'payment.qrNote': 'This is a sample QR. In production, a real QR would be generated.',
    'payment.bank.bank': 'Bank',
    'payment.bank.account': 'Account',
    'payment.bank.name': 'Name',
    'payment.bank.amount': 'Amount',
    'payment.bank.content': 'Content',
    'payment.demoNote': 'This is demo banking info. Contact Zalo: 0865853943 for real payment.',
    'payment.help': 'Need help? Contact Zalo:',
    'payment.purchasePrefix': 'Purchase:',
    'payment.amountPrefix': 'Amount:',
    'card.buyNow': 'Buy Now',
    'card.buy': 'Buy',
    'toast.messageSent': "Message sent! I'll reply within 24 hours.",
  },
  vi: {
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.courses': 'Khóa học',
    'nav.source': 'Mã nguồn',
    'nav.contact': 'Liên hệ',
    'nav.admin': 'Admin',
    'nav.adminDashboard': 'Bảng quản trị',
    'nav.settings': 'Cài đặt',
    'hero.badge': 'Sẵn sàng nhận dự án',
    'hero.btnCourses': 'Xem khóa học',
    'hero.btnSource': 'Mua mã nguồn',
    'about.tag': 'Về tôi',
    'about.title': 'Tìm hiểu về tôi',
    'about.subtitle': 'Lập trình viên đam mê với nhiều năm kinh nghiệm thực chiến',
    'about.skillsTitle': 'Kỹ năng & Công nghệ',
    'courses.tag': 'Khóa học',
    'courses.title': 'Học & Nâng cấp kỹ năng',
    'courses.subtitle': 'Khóa học thực tế giúp bạn phát triển sự nghiệp',
    'source.tag': 'Mã nguồn',
    'source.title': 'Dự án có sẵn',
    'source.subtitle': 'Mã nguồn chất lượng giúp bạn tăng tốc phát triển',
    'testimonials.tag': 'Đánh giá',
    'testimonials.title': 'Học viên nói gì',
    'contact.tag': 'Liên hệ',
    'contact.title': 'Kết nối với tôi',
    'contact.subtitle': 'Bạn có câu hỏi hoặc muốn hợp tác?',
    'contact.phoneLabel': 'SĐT / Zalo',
    'contact.locationLabel': 'Địa điểm',
    'contact.locationValue': 'Việt Nam',
    'contact.responseLabel': 'Thời gian phản hồi',
    'contact.responseValue': 'Trong vòng 24 giờ',
    'form.nameLabel': 'Họ và tên',
    'form.namePlaceholder': 'Nhập họ và tên',
    'form.emailLabel': 'Email',
    'form.messageLabel': 'Tin nhắn',
    'form.messagePlaceholder': 'Mình có thể giúp gì cho bạn?',
    'form.send': 'Gửi tin nhắn',
    'footer.desc': 'Lập trình viên full-stack, giảng viên và người tạo mã nguồn. Xây dựng giải pháp số và hỗ trợ cộng đồng lập trình.',
    'footer.quickLinks': 'Liên kết nhanh',
    'footer.connect': 'Kết nối',
    'settings.title': 'Cài đặt',
    'settings.subtitle': 'Tuỳ chọn ngôn ngữ',
    'settings.languageLabel': 'Ngôn ngữ',
    'settings.save': 'Lưu',
    'payment.sample': '⚠ Bản mẫu / Demo',
    'payment.title': 'Thông tin thanh toán',
    'payment.subtitle': 'Hoàn tất mua hàng',
    'payment.tabQr': 'Mã QR',
    'payment.tabBank': 'Chuyển khoản',
    'payment.qrLabel': 'Quét để thanh toán qua ứng dụng ngân hàng',
    'payment.qrNote': 'Đây là QR mẫu. Khi chạy thực tế, hệ thống sẽ tạo QR thật.',
    'payment.bank.bank': 'Ngân hàng',
    'payment.bank.account': 'Tài khoản',
    'payment.bank.name': 'Tên',
    'payment.bank.amount': 'Số tiền',
    'payment.bank.content': 'Nội dung',
    'payment.demoNote': 'Đây là thông tin demo. Liên hệ Zalo: 0865853943 để thanh toán thật.',
    'payment.help': 'Cần hỗ trợ? Liên hệ Zalo:',
    'payment.purchasePrefix': 'Mua:',
    'payment.amountPrefix': 'Số tiền:',
    'card.buyNow': 'Mua ngay',
    'card.buy': 'Mua',
    'toast.messageSent': 'Đã gửi tin nhắn! Mình sẽ phản hồi trong 24 giờ.',
  },
};

const languageConfig = {
  en: {
    hero_headline: defaultConfig.hero_headline,
    hero_subtext: defaultConfig.hero_subtext,
    about_bio: defaultConfig.about_bio,
  },
  vi: {
    hero_headline: 'Xây Dựng Tương Lai Của Bạn Bằng Code',
    hero_subtext: 'Xin chào, mình là Tran Manh — Full-stack Developer chuyên về web app, hệ thống backend và các giải pháp IT thực tế. Mình cũng dạy lập trình và bán source code chất lượng.',
    about_bio: 'Mình chuyên xây dựng web app, hệ thống backend và các giải pháp IT thực tế. Thành thạo Python, Flask, JavaScript và SQL, mình tạo ra phần mềm mạnh mẽ, dễ mở rộng. Mình thích chia sẻ kiến thức qua khóa học và cung cấp source code sẵn sàng triển khai.',
  },
};

// Hàm lấy chuỗi theo ngôn ngữ hiện tại
function t(key) {
  const lang = window.__lang || 'en';
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

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
    card.className = 'card fade-up';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="card-banner" style="background: linear-gradient(135deg, rgba(108,92,231,0.2), rgba(0,206,201,0.15));">
        <span style="font-size:3rem; position:relative; z-index:1;">${item.icon}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.tag}</span>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.desc}</p>
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
  testimonials.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'testimonial fade-up';
    el.style.transitionDelay = `${i * 0.1}s`;
    el.innerHTML = `
      <div class="stars">★★★★★</div>
      <p class="testimonial-quote">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.avatar}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
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
  const grid = document.createElement('div');
  grid.className = 'qr-fake';
  for (let i = 0; i < 81; i++) {
    const span = document.createElement('span');
    span.style.background = Math.random() > 0.45 ? '#222' : '#fff';
    span.style.borderRadius = '1px';
    grid.appendChild(span);
  }
  // Các góc
  [0,1,2,6,7,8,9,17,18,26,54,62,63,71,72,73,74,78,79,80].forEach(idx => {
    if (grid.children[idx]) grid.children[idx].style.background = '#222';
  });
  container.appendChild(grid);
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
  applyLanguage(savedLang === 'vi' ? 'vi' : 'en');

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
  document.getElementById('darkToggle').addEventListener('click', toggleDarkMode);
  document.getElementById('darkToggleMobile').addEventListener('click', toggleDarkMode);

  // CÀI ĐẶT: mở/đóng modal và lưu ngôn ngữ
  const openSettings = () => {
    document.getElementById('settingsModal').classList.add('open');
    const select = document.getElementById('languageSelect');
    if (select) select.value = window.__lang || 'en';
    lucide.createIcons();
  };
  document.getElementById('settingsBtn').addEventListener('click', openSettings);
  document.getElementById('settingsBtnMobile').addEventListener('click', openSettings);
  document.getElementById('settingsMenuMobile').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('mobileMenu').classList.remove('open');
    openSettings();
  });
  document.getElementById('settingsClose').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('open');
  });
  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
  document.getElementById('settingsSave').addEventListener('click', () => {
    const lang = document.getElementById('languageSelect').value;
    applyLanguage(lang); // Gọi hàm áp dụng ngôn ngữ
    document.getElementById('settingsModal').classList.remove('open');
  });

  // MUA HÀNG
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-btn');
    if (btn) {
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

  // ADMIN OVERLAY
  document.getElementById('adminBtn').addEventListener('click', () => {
    document.getElementById('adminOverlay').classList.add('open');
    lucide.createIcons();
  });
  document.getElementById('adminBtnMobile').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('adminOverlay').classList.add('open');
    lucide.createIcons();
  });
  document.getElementById('adminClose').addEventListener('click', () => {
    document.getElementById('adminOverlay').classList.remove('open');
  });

  // FORM LIÊN HỆ
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast(t('toast.messageSent'));
    e.target.reset();
  });
});
