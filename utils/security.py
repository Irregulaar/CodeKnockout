import bcrypt

def hash_password(password: str) -> str:
    """
    Genera un hash seguro de la contraseña.
    """
    salt = bcrypt.gensalt()  # Genera un salt aleatorio
    hashed_password = bcrypt.hashpw(password.encode(), salt)  # Hashea la contraseña
    return hashed_password.decode()  # Devuelve el hash en formato de string

def verify_password(password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña coincide con su hash.
    """
    password_bytes = password.encode()
    hashed_bytes = hashed_password.encode()
    return bcrypt.checkpw(password_bytes, hashed_bytes)
