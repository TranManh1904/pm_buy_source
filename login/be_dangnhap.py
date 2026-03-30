import os
import pathlib
import hashlib
try:
    import bcrypt
except Exception:
    bcrypt = None

try:
    import psycopg2
except Exception:
    psycopg2 = None


def tai_env_tu_file():
    try:
        here = pathlib.Path(__file__).resolve().parent
        candidates = [here / ".env", here.parent / ".env"]
        env_path = next((p for p in candidates if p.exists()), None)
        if env_path:
            for line in env_path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                k = k.strip()
                v = v.strip().strip('"').strip("'")
                if k and v and os.environ.get(k) is None:
                    os.environ[k] = v
    except Exception:
        pass


def ket_noi_postgres():
    if psycopg2 is None:
        return None, "khong_co_thu_vien_psycopg2"
    tai_env_tu_file()
    host = os.environ.get("DB_HOST") or os.environ.get("PG_HOST") or "127.0.0.1"
    port = int(os.environ.get("DB_PORT") or os.environ.get("PG_PORT") or "5432")
    dbname = os.environ.get("DB_NAME") or os.environ.get("PG_DB") or "postgres"
    user = os.environ.get("DB_USER") or os.environ.get("PG_USER") or "postgres"
    password = os.environ.get("DB_PASSWORD") or os.environ.get("PG_PASSWORD") or ""
    try:
        conn = psycopg2.connect(host=host, port=port, dbname=dbname, user=user, password=password)
        return conn, None
    except Exception as e:
        return None, f"ket_noi_that_bai: {e}"


def tim_nguoi_dung_db(ten_dang_nhap: str, mat_khau: str):
    conn, err = ket_noi_postgres()
    if err:
        return err
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, ten_dang_nhap, mat_khau, email, created_at FROM public.dangnhap WHERE ten_dang_nhap=%s LIMIT 1",
                (ten_dang_nhap,),
            )
            row = cur.fetchone()
            if not row:
                return None
            stored = row[2] or ""
            ok = False
            if stored.startswith("bcrypt$") and bcrypt:
                ok = bcrypt.checkpw(mat_khau.encode("utf-8"), stored.replace("bcrypt$", "").encode("utf-8"))
            elif stored.startswith("pbkdf2$"):
                try:
                    _, salt_hex, hash_hex = stored.split("$", 2)
                    calc = hashlib.pbkdf2_hmac("sha256", mat_khau.encode("utf-8"), bytes.fromhex(salt_hex), 100_000).hex()
                    ok = calc == hash_hex
                except Exception:
                    ok = False
            else:
                ok = (stored == mat_khau)
            if not ok:
                return None
            return {
                "id": row[0],
                "ten_dang_nhap": row[1],
                "email": row[3],
                "created_at": row[4].isoformat() if row[4] else None,
            }
    except Exception as e:
        return f"loi_truy_van: {e}"
    finally:
        try:
            conn.close()
        except Exception:
            pass

def tao_nguoi_dung_db(ten_dang_nhap: str, mat_khau: str, email: str | None = None):
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
            cur.execute(
                "INSERT INTO public.dangnhap (ten_dang_nhap, mat_khau, email, created_at) VALUES (%s, %s, %s, NOW()) RETURNING id",
                (ten_dang_nhap, mat_khau, email),
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
