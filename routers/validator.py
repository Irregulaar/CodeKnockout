import uuid

def es_uuid_valido(valor):
    try:
        uuid.UUID(valor, version=4)  # Intenta convertirlo a UUID versión 4
        return True
    except ValueError:
        return False

print(es_uuid_valido("550e8400-e29b-41d4-a716-446655440000"))  # ✅ True
print(es_uuid_valido("12345"))  # ❌ False
