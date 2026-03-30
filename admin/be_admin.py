import os
from login.be_dangnhap import tim_nguoi_dung_db, ket_noi_postgres
from login.be_dangky import password_strength_ok, hash_password, tai_env_tu_file


def check_password(username: str, password: str) -> bool:
    return isinstance(tim_nguoi_dung_db(username, password), dict)


def reset_password(username: str, new_password: str):
    tai_env_tu_file()
    if not password_strength_ok(new_password):
        return {"mat_khau_yeu": True}
    conn, err = ket_noi_postgres()
    if err:
        return err
    try:
        hp = hash_password(new_password)
        with conn.cursor() as cur:
            cur.execute("UPDATE public.dangnhap SET mat_khau=%s WHERE ten_dang_nhap=%s", (hp, username))
            conn.commit()
            return {"ok": True}
    except Exception as e:
        return f"loi_reset_mk: {e}"
    finally:
        try:
            conn.close()
        except Exception:
            pass
