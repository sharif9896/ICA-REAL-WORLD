import os
import cloudinary.uploader
import pymongo
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["IC"]  # Replace with your actual DB name
collection = db["students"]

image_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), "images")
image_files = os.listdir(image_folder)

for filename in image_files:
    reg_no, ext = os.path.splitext(filename)
    if ext.lower() in [".jpg", ".jpeg", ".png"]:
        try:
            file_path = os.path.join(image_folder, filename)
            upload_result = cloudinary.uploader.upload(
                file_path,
                public_id=f"students/{reg_no}",
                folder="students"
            )
            image_url = upload_result["secure_url"]
            result = collection.update_one(
                {"Reg_no": reg_no},
                {"$set": {"image": image_url}}
            )
            print(f"{reg_no} updated: {image_url}")
        except Exception as e:
            print(f"Error with {filename}: {str(e)}")
