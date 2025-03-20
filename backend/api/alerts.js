import psycopg2
import smtplib
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DB_URL = os.getenv("DATABASE_URL")
ALERT_EMAIL = os.getenv("ALERT_EMAIL")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int
