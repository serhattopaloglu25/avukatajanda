from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy import insert, select
from database import async_session, Email

app = FastAPI()

# Static ve templates klasörlerini bağla
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Ana sayfa - formla e-posta toplayan landing page
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Formdan e-posta alma
@app.post("/subscribe", response_class=HTMLResponse)
async def subscribe(request: Request, email: str = Form(...)):
    async with async_session() as session:
        stmt = insert(Email).values(address=email)
        await session.execute(stmt)
        await session.commit()
    return templates.TemplateResponse("success.html", {"request": request, "email": email})

# E-posta listesini görüntüleme (geliştirici testi için)
@app.get("/emails")
async def get_emails():
    async with async_session() as session:
        result = await session.execute(select(Email))
        emails = result.scalars().all()
        return {"emails": [e.address for e in emails]}

# robots.txt'yi kök dizinden sun
@app.get("/robots.txt", include_in_schema=False)
async def robots():
    return FileResponse("static/robots.txt", media_type="text/plain")
