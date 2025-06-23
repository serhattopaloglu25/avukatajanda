from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.future import select
from database import async_session, Email

app = FastAPI()

# Static ve templates klasörlerini bağla
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Ana sayfa - form gösterimi
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Formdan gelen e-postayı kaydet
@app.post("/subscribe", response_class=RedirectResponse)
async def subscribe(request: Request, email: str = Form(...)):
    async with async_session() as session:
        new_email = Email(address=email)
        session.add(new_email)
        await session.commit()
    return RedirectResponse("/", status_code=303)

# Kayıtlı e-postaları göster
@app.get("/emails", response_class=JSONResponse)
async def get_emails():
    async with async_session() as session:
        result = await session.execute(select(Email))
        emails = result.scalars().all()
        return [{"id": e.id, "address": e.address} for e in emails]
