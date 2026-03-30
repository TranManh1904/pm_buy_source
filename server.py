import json
import uuid
import os
import pathlib

try:
    import psycopg2
except Exception:
    psycopg2 = None


# ========= HỖ TRỢ ENV =========

def tai_env_tu_file():
    try:
        root = pathlib.Path(__file__).resolve().parent
        env_path = root / ".env"
        if env_path.exists():
            for line in env_path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k and v and os.environ.get(k) is None:
                    os.environ[k] = v
            url = os.environ.get("DATABASE_URL")
            if url and url.startswith("postgres"):
                try:
                    scheme_sep = "://"
                    userinfo_host = url.split(scheme_sep, 1)[1]
                    userinfo, hostpart_db = userinfo_host.split("@", 1)
                    hostpart, dbname = hostpart_db.split("/", 1)
                    if ":" in userinfo:
                        user, password = userinfo.split(":", 1)
                        os.environ.setdefault("PG_USER", user)
                        os.environ.setdefault("PG_PASSWORD", password)
                    else:
                        os.environ.setdefault("PG_USER", userinfo)
                    host, port = (hostpart.split(":") + ["5432"])[:2]
                    os.environ.setdefault("PG_HOST", host)
                    os.environ.setdefault("PG_PORT", port)
                    os.environ.setdefault("PG_DB", dbname)
                except Exception:
                    pass
    except Exception:
        pass


from login.be_dangnhap import tim_nguoi_dung_db
from login.be_dangky import tao_nguoi_dung_db
from admin.be_admin import check_password, reset_password


# ========= HTTP HANDLER =========

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class XuLyYeuCau(BaseHTTPRequestHandler):

    def thiet_lap_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def gui_json(self, ma_trang_thai: int, du_lieu):
        than = json.dumps(du_lieu).encode("utf-8")
        self.send_response(ma_trang_thai)
        self.thiet_lap_cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(than)))
        self.end_headers()
        self.wfile.write(than)

    def do_OPTIONS(self):
        self.send_response(204)
        self.thiet_lap_cors()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/status":
            self.gui_json(200, {"trang_thai": "ok"})
            return

        # Serve static files
        root = pathlib.Path(__file__).resolve().parent
        
        # Map path tới file
        if self.path == "/" or self.path == "":
            file_path = root / "index.html"
        else:
            # Bỏ dấu / ở đầu
            file_path = root / self.path.lstrip("/")

        if file_path.exists() and file_path.is_file():
            # Xác định content type
            ext = file_path.suffix.lower()
            content_types = {
                ".html": "text/html; charset=utf-8",
                ".css": "text/css",
                ".js": "application/javascript",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".ico": "image/x-icon",
            }
            ct = content_types.get(ext, "application/octet-stream")
            data = file_path.read_bytes()
            self.send_response(200)
            self.thiet_lap_cors()
            self.send_header("Content-Type", ct)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return

        self.gui_json(404, {"loi": "khong_tim_thay"})

    def do_POST(self):
        dai = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(dai) if dai > 0 else b"{}"
        try:
            du_lieu = json.loads(raw.decode("utf-8") or "{}")
        except Exception:
            self.gui_json(400, {"loi": "json_khong_hop_le"})
            return

        if self.path == "/api/login":
            tai_khoan = str(du_lieu.get("username", "")).strip()
            mat_khau = str(du_lieu.get("password", "")).strip()
            nguoi_dung = tim_nguoi_dung_db(tai_khoan, mat_khau)
            if isinstance(nguoi_dung, dict):
                token = str(uuid.uuid4())
                self.gui_json(200, {"thanh_cong": True, "token": token, "user": nguoi_dung})
            else:
                if nguoi_dung is None:
                    self.gui_json(200, {"thanh_cong": False})
                else:
                    self.gui_json(500, {"loi": nguoi_dung})
            return

        if self.path == "/api/contact":
            ten = str(du_lieu.get("name", "")).strip()
            email = str(du_lieu.get("email", "")).strip()
            noi_dung = str(du_lieu.get("message", "")).strip()
            if not ten or not email or not noi_dung:
                self.gui_json(400, {"loi": "thieu_truong"})
                return
            self.gui_json(200, {"thanh_cong": True})
            return

        if self.path == "/api/payment/intent":
            tieu_de = str(du_lieu.get("title", "")).strip()
            so_tien = str(du_lieu.get("price", "")).strip()
            self.gui_json(
                200,
                {
                    "thanh_cong": True,
                    "tieu_de": tieu_de,
                    "so_tien": so_tien,
                    "ngan_hang": {
                        "ten": "MBank",
                        "tai_khoan": "3355555789",
                        "chu_tai_khoan": "TRAN DUC MANH",
                    },
                },
            )
            return
        if self.path == "/api/register":
            tai_khoan = str(du_lieu.get("username", "")).strip()
            mat_khau = str(du_lieu.get("password", "")).strip()
            if not tai_khoan or not mat_khau:
                self.gui_json(400, {"loi": "thieu_truong"})
                return
            kq = tao_nguoi_dung_db(tai_khoan, mat_khau)
            if isinstance(kq, dict) and kq.get("ton_tai"):
                self.gui_json(200, {"thanh_cong": False, "loi": "ten_dang_nhap_ton_tai"})
                return
            if isinstance(kq, dict) and kq.get("mat_khau_yeu"):
                self.gui_json(200, {"thanh_cong": False, "loi": "mat_khau_yeu"})
                return
            if isinstance(kq, dict) and kq.get("id"):
                self.gui_json(200, {"thanh_cong": True, "id": kq["id"]})
                return
            if isinstance(kq, str):
                self.gui_json(500, {"loi": kq})
                return
            self.gui_json(500, {"loi": "khong_xac_dinh"})
            return
        if self.path == "/api/admin/check-password":
            secret = self.headers.get("X-Admin-Secret") or str(du_lieu.get("admin_secret", ""))
            if secret != os.environ.get("ADMIN_SECRET", ""):
                self.gui_json(403, {"loi": "khong_co_quyen"})
                return
            tai_khoan = str(du_lieu.get("username", "")).strip()
            mat_khau = str(du_lieu.get("password", "")).strip()
            ok = check_password(tai_khoan, mat_khau)
            self.gui_json(200, {"hop_le": bool(ok)})
            return
        if self.path == "/api/admin/reset-password":
            secret = self.headers.get("X-Admin-Secret") or str(du_lieu.get("admin_secret", ""))
            if secret != os.environ.get("ADMIN_SECRET", ""):
                self.gui_json(403, {"loi": "khong_co_quyen"})
                return
            tai_khoan = str(du_lieu.get("username", "")).strip()
            mat_khau_moi = str(du_lieu.get("new_password", "")).strip()
            kq = reset_password(tai_khoan, mat_khau_moi)
            if isinstance(kq, dict) and kq.get("mat_khau_yeu"):
                self.gui_json(200, {"thanh_cong": False, "loi": "mat_khau_yeu"})
                return
            if isinstance(kq, dict) and kq.get("ok"):
                self.gui_json(200, {"thanh_cong": True})
                return
            if isinstance(kq, str):
                self.gui_json(500, {"loi": kq})
                return
            self.gui_json(500, {"loi": "khong_xac_dinh"})
            return

        self.gui_json(404, {"loi": "khong_tim_thay"})


# ========= KHỞI ĐỘNG =========

def chay_may_chu():
    tai_env_tu_file()
    host = "0.0.0.0"  # đổi thành này
    try:
        port = int(os.environ.get("PORT") or "8001")  # Railway dùng biến PORT
    except Exception:
        port = 8001
    server = ThreadingHTTPServer((host, port), XuLyYeuCau)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    chay_may_chu()
