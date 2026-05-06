from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Şifreyi (Schen121224B) içine yerleştirdim.
SQLALCHEMY_DATABASE_URL = "postgresql://postgres.qhgmzqgmqwubuhjgxyrd:Schen121224B@aws-1-eu-central-1.pooler.supabase.com:5432/postgres"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()