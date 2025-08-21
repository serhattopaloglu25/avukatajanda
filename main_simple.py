from fastapi import FastAPI

app = FastAPI(title="Test App")

@app.get("/")
async def root():
    return {"message": "Test"}

@app.get("/test-auth")
async def test_auth():
    try:
        from auth import UserCreate
        return {"status": "auth import success"}
    except Exception as e:
        return {"error": str(e)}
