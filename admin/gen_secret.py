import os
import pathlib
import secrets


def update_env(secret: str):
    root = pathlib.Path(__file__).resolve().parents[1]
    env_path = root / ".env"
    lines = []
    if env_path.exists():
        lines = env_path.read_text(encoding="utf-8").splitlines()
    found = False
    new_lines = []
    for line in lines:
        if line.strip().startswith("ADMIN_SECRET="):
            new_lines.append(f"ADMIN_SECRET={secret}")
            found = True
        else:
            new_lines.append(line)
    if not found:
        new_lines.append(f"ADMIN_SECRET={secret}")
    env_path.write_text("\n".join(new_lines) + ("\n" if new_lines and not new_lines[-1].endswith("\n") else ""), encoding="utf-8")
    return str(env_path)


def main():
    secret = secrets.token_urlsafe(32)
    path = update_env(secret)
    print(secret)
    print(path)


if __name__ == "__main__":
    main()

