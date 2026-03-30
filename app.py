"""
Ứng dụng khởi động BE
- Mục đích: tạo điểm chạy (entrypoint) quen thuộc tên app.py
- Cách hoạt động: gọi hàm chay_may_chu() đã viết trong server.py
- Kết quả: khởi chạy HTTP server trên host/port lấy từ .env (nếu có) hoặc mặc định 127.0.0.1:8001
"""

from server import chay_may_chu


if __name__ == "__main__":
    # Chạy máy chủ BE
    chay_may_chu()

