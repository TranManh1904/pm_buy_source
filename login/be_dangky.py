from .be_dangnhap import ket_noi_postgres, tai_env_tu_file
import os
import hashlib
try:
    import bcrypt  # optional: dùng nếu có
except Exception:
    bcrypt = None


def password_strength_ok(pw: str):
    if len(pw) < 8:
        return False
    has_upper = any(c.isupper() for c in pw)
    has_lower = any(c.islower() for c in pw)
    has_digit = any(c.isdigit() for c in pw)
    has_special = any(not c.isalnum() for c in pw)
    return has_upper and has_lower and has_digit and has_special


def hash_password(pw: str) -> str:
    if bcrypt:
        return "bcrypt$" + bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    salt = os.urandom(16)
    dk = hashlib.pbkdf2_hmac("sha256", pw.encode("utf-8"), salt, 100_000)
    return "pbkdf2$" + salt.hex() + "$" + dk.hex()


def tao_nguoi_dung_db(ten_dang_nhap: str, mat_khau: str):
    tai_env_tu_file()
    conn, err = ket_noi_postgres()
    if err:
        return err
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id FROM public.dangnhap WHERE ten_dang_nhap=%s LIMIT 1",
                (ten_dang_nhap,),
            )
            if cur.fetchone():
                return {"ton_tai": True}
            if not password_strength_ok(mat_khau):
                return {"mat_khau_yeu": True}
            hashed = hash_password(mat_khau)
            cur.execute(
                "INSERT INTO public.dangnhap (ten_dang_nhap, mat_khau, created_at) VALUES (%s, %s, NOW()) RETURNING id",
                (ten_dang_nhap, hashed),
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {"id": new_id}
    except Exception as e:
        return f"loi_tao_tai_khoan: {e}"
    finally:
        try:
            conn.close()
        except Exception:
            pass
