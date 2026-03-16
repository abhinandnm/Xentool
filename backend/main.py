from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routers import tools

app = FastAPI(title="Xentool API", description="API for Xentool file utilities")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global exception handler for Request Entity Too Large (if not handled by web server)
@app.exception_handler(ValueError)
async def value_error_exception_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )

app.include_router(tools.router, prefix="/api/tools", tags=["Tools"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Xentool API"}
