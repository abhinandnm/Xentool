import os
import shutil
import uuid
from typing import List
from fastapi import UploadFile

# Use a temporary directory for processing
TEMP_DIR = "temp_processing"

def ensure_temp_dir():
    if not os.path.exists(TEMP_DIR):
        os.makedirs(TEMP_DIR)

def get_temp_file_path(filename: str) -> str:
    """Generate a unique temporary file path."""
    ensure_temp_dir()
    unique_id = str(uuid.uuid4())
    _, ext = os.path.splitext(filename)
    return os.path.join(TEMP_DIR, f"{unique_id}{ext}")

async def save_upload_file_tmp(upload_file: UploadFile) -> str:
    """Save an uploaded file to a temporary location."""
    temp_path = get_temp_file_path(upload_file.filename)
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    finally:
        upload_file.file.close()
    return temp_path

def cleanup_file(path: str):
    """Delete a file if it exists."""
    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception as e:
        print(f"Error cleaning up file {path}: {e}")

def cleanup_files(paths: List[str]):
    """Delete multiple files."""
    for path in paths:
        cleanup_file(path)
