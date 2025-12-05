import os
import pymongo
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
client = pymongo.MongoClient(mongo_uri)
db = client["IC"]
collection = db["attendance"]

# Fetch data from MongoDB
data = list(collection.find({}, {"_id": 0}))  # Exclude _id

# Convert to DataFrame
df = pd.DataFrame(data)

# Save Excel and PDF
excel_path = "exports/attendance.xlsx"
pdf_path = "exports/attendance.pdf"

os.makedirs("exports", exist_ok=True)
df.to_excel(excel_path, index=False)
df.to_string(buf=open(pdf_path, "w", encoding="utf-8"))

print("Exported Excel and PDF")
