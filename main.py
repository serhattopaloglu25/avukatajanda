from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database import async_session, Email, init_db
from sqlalchemy import select
from starlette.status import HTTP_302_FOUND

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/submit")
async def submit_email(email: str = Form(...)):
    async with async_session() as session:
        async with session.begin():
            existing_email = await session.scalar(select(Email).where(Email.address == email))
            if not existing_email:
                session.add(Email(address=email))
    return RedirectResponse(url="/", status_code=HTTP_302_FOUND)

@app.get("/emails")
async def get_emails():
    async with async_session() as session:
        result = await session.execute(select(Email))
        emails = result.scalars().all()
        return {"emails": [e.address for e in emails]}
