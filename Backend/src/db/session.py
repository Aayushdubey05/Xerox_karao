from src.core.config import setting
from sqlalchemy.orm import Session,sessionmaker, declarative_base, as_declarative,declared_attr
from sqlalchemy import create_engine


engine = create_engine(setting.DB_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        print("DB got connected")
        yield db
    finally:
        print("DB got disconnected")
        db.close

@as_declarative()
class Base:
    id : any
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
