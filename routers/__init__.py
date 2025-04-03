from .auth_routes import router as auth_router
from .match_routes import router as match_routers
from .Matchcompletion import router as Matchcompletion

all_routers = [auth_router, match_routers,Matchcompletion]