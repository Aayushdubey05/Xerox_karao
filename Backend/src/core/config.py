from sqlalchemy.orm import Session, sessionmaker
from dotenv import load_dotenv

class Setting:
    DB_URL = "postgresql://postgres:Aayush%402005@localhost:5432/xerox"

setting = Setting()
# print(setting.DB_URL)
