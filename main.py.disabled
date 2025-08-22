from claude_service import claude_service
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import aiosqlite
from database import init_db
from datetime import timedelta, datetime, date
from typing import Optional

# Auth import test
AUTH_ENABLED = False
CLIENTS_ENABLED = False
APPOINTMENTS_ENABLED = False
CASES_ENABLED = False

try:
    from auth import UserCreate, UserLogin, UserResponse, Token
    from auth import create_user, authenticate_user, create_access_token
    from auth import get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES
    AUTH_ENABLED = True
    print("✅ Auth modülü yüklendi")
except Exception as e:
    print(f"❌ Auth hatası: {e}")

try:
    from clients import (
        ClientCreate, ClientUpdate, ClientResponse,
        create_client, get_client_by_id, get_all_clients,
        search_clients, update_client, delete_client, get_client_count
    )
    CLIENTS_ENABLED = True
    print("✅ Clients modülü yüklendi")
except Exception as e:
    print(f"❌ Clients hatası: {e}")

try:
    from appointments import (
        AppointmentCreate, AppointmentUpdate, AppointmentResponse,
        create_appointment, get_appointment_by_id, get_user_appointments,
        get_appointments_by_date_range, update_appointment, delete_appointment,
        get_appointment_statistics, search_appointments
    )
    APPOINTMENTS_ENABLED = True
    print("✅ Appointments modülü yüklendi")
except Exception as e:
    print(f"❌ Appointments hatası: {e}")

try:
    from cases import (
        CaseCreate, CaseUpdate, CaseResponse, HearingCreate, HearingUpdate, HearingResponse,
        create_case, get_case_by_id, get_user_cases, update_case, delete_case,
        search_cases, get_case_statistics, create_hearing, get_hearing_by_id, get_user_hearings
    )
    CASES_ENABLED = True
    print("✅ Cases modülü yüklendi")
except Exception as e:
    print(f"❌ Cases hatası: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print("Uygulama başlatıldı!")
    yield

app = FastAPI(
    title="Avukat Ajanda Sistemi",
    description="Avukatlar için kapsamlı ajanda, müşteri ve dava yönetim sistemi - Claude AI Destekli",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/")
async def root():
    return {
        "message": "Avukat Ajanda API - Claude AI Destekli",
        "version": "2.0.0",
        "auth_enabled": AUTH_ENABLED,
        "clients_enabled": CLIENTS_ENABLED,
        "appointments_enabled": APPOINTMENTS_ENABLED,
        "cases_enabled": CASES_ENABLED,
        "claude_enabled": claude_service.is_available,
        "endpoints": {
            "docs": "/docs",
            "health": "/health",
            "claude_help": "/claude-help"
        }
    }

@app.get("/health")
async def health():
    return {
        "status": "ok", 
        "modules": {
            "auth": AUTH_ENABLED,
            "clients": CLIENTS_ENABLED,
            "appointments": APPOINTMENTS_ENABLED,
            "cases": CASES_ENABLED,
            "claude": claude_service.is_available
        }
    }

# CLAUDE ENDPOINT
@app.get("/claude-help")
async def claude_help(error: str = "Genel yardım"):
    """Claude'dan yardım al"""
    if claude_service.is_available:
        analysis = await claude_service.analyze_error(error)
        return {"status": "success", "claude_response": analysis}
    else:
        return {"status": "error", "message": "Claude kullanılamıyor"}

# AUTH ENDPOINTS
if AUTH_ENABLED:
    @app.post("/auth/register")
    async def register(user_data: UserCreate):
        new_user = await create_user(user_data)
        access_token = create_access_token(data={"sub": new_user["username"]})
        return {"access_token": access_token, "token_type": "bearer"}

    @app.post("/auth/login")
    async def login(user_credentials: UserLogin):
        user = await authenticate_user(user_credentials.username, user_credentials.password)
        if not user:
            raise HTTPException(status_code=401, detail="Hatalı giriş")
        access_token = create_access_token(data={"sub": user["username"]})
        return {"access_token": access_token, "token_type": "bearer"}

    @app.get("/auth/me")
    async def get_me(current_user: dict = Depends(get_current_active_user)):
        return current_user

# CLIENT ENDPOINTS
if CLIENTS_ENABLED:
    @app.post("/clients")
    async def create_new_client(client_data: ClientCreate, current_user: dict = Depends(get_current_active_user)):
        new_client = await create_client(client_data)
        return new_client

    @app.get("/clients")
    async def list_all_clients(skip: int = 0, limit: int = 100, current_user: dict = Depends(get_current_active_user)):
        clients = await get_all_clients(skip=skip, limit=limit)
        return clients

    @app.get("/clients/search")
    async def search_clients_endpoint(q: str, current_user: dict = Depends(get_current_active_user)):
        if len(q.strip()) < 2:
            raise HTTPException(status_code=400, detail="Arama terimi en az 2 karakter olmalıdır")
        clients = await search_clients(q.strip())
        return {"query": q, "results": clients, "count": len(clients)}

    @app.get("/clients/{client_id}")
    async def get_one_client(client_id: int, current_user: dict = Depends(get_current_active_user)):
        client = await get_client_by_id(client_id)
        if not client:
            raise HTTPException(status_code=404, detail="Müşteri bulunamadı")
        return client

    @app.put("/clients/{client_id}")
    async def update_client_endpoint(client_id: int, client_data: ClientUpdate, current_user: dict = Depends(get_current_active_user)):
        updated_client = await update_client(client_id, client_data)
        return updated_client

    @app.delete("/clients/{client_id}")
    async def delete_client_endpoint(client_id: int, current_user: dict = Depends(get_current_active_user)):
        return await delete_client(client_id)

# APPOINTMENT ENDPOINTS
if APPOINTMENTS_ENABLED:
    @app.post("/appointments", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
    async def create_new_appointment(
        appointment_data: AppointmentCreate, 
        current_user: dict = Depends(get_current_active_user)
    ):
        """Yeni randevu oluştur"""
        try:
            new_appointment = await create_appointment(appointment_data, current_user["id"])
            return AppointmentResponse(**new_appointment)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Randevu oluşturulurken hata: {str(e)}"
            )

    @app.get("/appointments", response_model=list[AppointmentResponse])
    async def list_appointments(
        skip: int = 0,
        limit: int = 100,
        status_filter: Optional[str] = None,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Randevuları listele"""
        try:
            appointments = await get_user_appointments(
                current_user["id"], skip=skip, limit=limit, status_filter=status_filter
            )
            return [AppointmentResponse(**appointment) for appointment in appointments]
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Randevular getirilirken hata: {str(e)}"
            )

    @app.get("/appointments/calendar")
    async def get_calendar_appointments(
        start_date: str,
        end_date: str,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Takvim görünümü için randevuları getir"""
        try:
            start_dt = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
            end_dt = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
            
            appointments = await get_appointments_by_date_range(
                current_user["id"], start_dt, end_dt
            )
            
            return {
                "start_date": start_date,
                "end_date": end_date,
                "appointments": [AppointmentResponse(**appointment) for appointment in appointments],
                "total_count": len(appointments)
            }
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Geçersiz tarih formatı: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Takvim randevuları getirilirken hata: {str(e)}"
            )

    @app.get("/appointments/search")
    async def search_appointments_endpoint(
        q: str,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Randevu arama"""
        if len(q.strip()) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Arama terimi en az 2 karakter olmalıdır"
            )
        
        try:
            appointments = await search_appointments(current_user["id"], q.strip())
            return {
                "query": q,
                "results": [AppointmentResponse(**appointment) for appointment in appointments],
                "count": len(appointments)
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Arama sırasında hata: {str(e)}"
            )

    @app.get("/appointments/stats")
    async def get_appointment_stats(
        current_user: dict = Depends(get_current_active_user)
    ):
        """Randevu istatistikleri"""
        try:
            stats = await get_appointment_statistics(current_user["id"])
            return {
                "user_id": current_user["id"],
                "statistics": stats,
                "message": f"Toplam {stats.get('total', 0)} randevunuz bulunmaktadır"
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"İstatistikler getirilirken hata: {str(e)}"
            )

    @app.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
    async def get_appointment(
        appointment_id: int,
        current_user: dict = Depends(get_current_active_user)
    ):
        """ID'ye göre randevu getir"""
        appointment = await get_appointment_by_id(appointment_id, current_user["id"])
        if not appointment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Randevu bulunamadı"
            )
        return AppointmentResponse(**appointment)

    @app.put("/appointments/{appointment_id}", response_model=AppointmentResponse)
    async def update_appointment_endpoint(
        appointment_id: int,
        appointment_data: AppointmentUpdate,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Randevu güncelle"""
        try:
            updated_appointment = await update_appointment(appointment_id, appointment_data, current_user["id"])
            return AppointmentResponse(**updated_appointment)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Randevu güncellenirken hata: {str(e)}"
            )

    @app.delete("/appointments/{appointment_id}")
    async def delete_appointment_endpoint(
        appointment_id: int,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Randevuyu sil"""
        try:
            return await delete_appointment(appointment_id, current_user["id"])
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Randevu silinirken hata: {str(e)}"
            )

# CASE ENDPOINTS - Dava Yönetimi
if CASES_ENABLED:
    @app.post("/cases", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
    async def create_new_case(
        case_data: CaseCreate, 
        current_user: dict = Depends(get_current_active_user)
    ):
        """Yeni dava oluştur"""
        try:
            new_case = await create_case(case_data, current_user["id"])
            return CaseResponse(**new_case)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Dava oluşturulurken hata: {str(e)}"
            )

    @app.get("/cases", response_model=list[CaseResponse])
    async def list_cases(
        skip: int = 0,
        limit: int = 100,
        status_filter: Optional[str] = None,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Davaları listele"""
        try:
            cases = await get_user_cases(
                current_user["id"], skip=skip, limit=limit, status_filter=status_filter
            )
            return [CaseResponse(**case) for case in cases]
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Davalar getirilirken hata: {str(e)}"
            )

    @app.get("/cases/search")
    async def search_cases_endpoint(
        q: str,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Dava arama"""
        if len(q.strip()) < 2:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Arama terimi en az 2 karakter olmalıdır"
            )
        
        try:
            cases = await search_cases(current_user["id"], q.strip())
            return {
                "query": q,
                "results": [CaseResponse(**case) for case in cases],
                "count": len(cases)
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Arama sırasında hata: {str(e)}"
            )

    @app.get("/cases/stats")
    async def get_case_stats(
        current_user: dict = Depends(get_current_active_user)
    ):
        """Dava istatistikleri"""
        try:
            stats = await get_case_statistics(current_user["id"])
            return {
                "user_id": current_user["id"],
                "statistics": stats,
                "message": f"Toplam {stats.get('total', 0)} davanız bulunmaktadır"
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"İstatistikler getirilirken hata: {str(e)}"
            )

    @app.get("/cases/{case_id}", response_model=CaseResponse)
    async def get_case(
        case_id: int,
        current_user: dict = Depends(get_current_active_user)
    ):
        """ID'ye göre dava getir"""
        case = await get_case_by_id(case_id, current_user["id"])
        if not case:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Dava bulunamadı"
            )
        return CaseResponse(**case)

    @app.put("/cases/{case_id}", response_model=CaseResponse)
    async def update_case_endpoint(
        case_id: int,
        case_data: CaseUpdate,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Dava güncelle"""
        try:
            updated_case = await update_case(case_id, case_data, current_user["id"])
            return CaseResponse(**updated_case)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Dava güncellenirken hata: {str(e)}"
            )

    @app.delete("/cases/{case_id}")
    async def delete_case_endpoint(
        case_id: int,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Davayı sil"""
        try:
            return await delete_case(case_id, current_user["id"])
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Dava silinirken hata: {str(e)}"
            )

    # HEARING ENDPOINTS - Duruşma Yönetimi
    @app.post("/hearings", response_model=HearingResponse, status_code=status.HTTP_201_CREATED)
    async def create_new_hearing(
        hearing_data: HearingCreate, 
        current_user: dict = Depends(get_current_active_user)
    ):
        """Yeni duruşma oluştur"""
        try:
            new_hearing = await create_hearing(hearing_data, current_user["id"])
            return HearingResponse(**new_hearing)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Duruşma oluşturulurken hata: {str(e)}"
            )

    @app.get("/hearings", response_model=list[HearingResponse])
    async def list_hearings(
        skip: int = 0,
        limit: int = 100,
        current_user: dict = Depends(get_current_active_user)
    ):
        """Duruşmaları listele"""
        try:
            hearings = await get_user_hearings(current_user["id"], skip=skip, limit=limit)
            return [HearingResponse(**hearing) for hearing in hearings]
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Duruşmalar getirilirken hata: {str(e)}"
            )

    @app.get("/hearings/{hearing_id}", response_model=HearingResponse)
    async def get_hearing(
        hearing_id: int,
        current_user: dict = Depends(get_current_active_user)
    ):
        """ID'ye göre duruşma getir"""
        hearing = await get_hearing_by_id(hearing_id, current_user["id"])
        if not hearing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Duruşma bulunamadı"
            )
        return HearingResponse(**hearing)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)