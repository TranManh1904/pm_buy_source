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