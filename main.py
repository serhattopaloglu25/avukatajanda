from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Boş static klasör tanımlı mı?
app.mount("/static", StaticFiles(directory="static"), name="static")

# Template klasörünü tanımla
templates = Jinja2Templates(directory="templates")

# Anasayfa endpoint’i
@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})
