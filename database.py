import aiosqlite
import asyncio

async def init_db():
    async with aiosqlite.connect("avukat.db") as db:
        # Kullanıcılar tablosu
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                hashed_password TEXT NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Müşteriler tablosu
        await db.execute("""
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Randevular tablosu - YENİ!
        await db.execute("""
            CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                client_id INTEGER,
                user_id INTEGER NOT NULL,
                appointment_date DATETIME NOT NULL,
                duration_minutes INTEGER DEFAULT 60,
                status TEXT DEFAULT 'scheduled',
                location TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE SET NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)
        
        # Davalar tablosu - YENİ!
        await db.execute("""
            CREATE TABLE IF NOT EXISTS cases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_number TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                case_type TEXT NOT NULL,
                status TEXT DEFAULT 'active',
                client_id INTEGER,
                user_id INTEGER NOT NULL,
                court_name TEXT,
                judge_name TEXT,
                opposing_party TEXT,
                case_value DECIMAL(15,2),
                start_date DATE,
                expected_end_date DATE,
                actual_end_date DATE,
                priority TEXT DEFAULT 'medium',
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE SET NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)
        
        # Dava belgeleri tablosu
        await db.execute("""
            CREATE TABLE IF NOT EXISTS case_documents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_id INTEGER NOT NULL,
                document_name TEXT NOT NULL,
                document_type TEXT,
                file_path TEXT,
                upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                notes TEXT,
                FOREIGN KEY (case_id) REFERENCES cases (id) ON DELETE CASCADE
            )
        """)
        
        # Dava duruşmaları tablosu
        await db.execute("""
            CREATE TABLE IF NOT EXISTS hearings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_id INTEGER NOT NULL,
                hearing_date DATETIME NOT NULL,
                court_room TEXT,
                hearing_type TEXT DEFAULT 'durusma',
                status TEXT DEFAULT 'scheduled',
                notes TEXT,
                result TEXT,
                next_hearing_date DATETIME,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (case_id) REFERENCES cases (id) ON DELETE CASCADE
            )
        """)
        
        await db.commit()
        print("Veritabanı başarıyla oluşturuldu!")

if __name__ == "__main__":
    asyncio.run(init_db())
