from fastapi import FastAPI

from api.routes import router

app = FastAPI(
    title="AI Market Intelligence API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message": "AI Market Intelligence API Running"
    }