from fastapi import APIRouter, File, UploadFile, BackgroundTasks, Form
from fastapi.responses import FileResponse
from utils import save_upload_file_tmp, cleanup_files, get_temp_file_path
from core_logic import convert_image_to_pdf, compress_pdf_file, create_qr_code, convert_pdf_to_docx, extract_text_from_ppt

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10 MB

async def validate_file_size(file: UploadFile):
    file.file.seek(0, 2)
    file_size = file.file.tell()
    await file.seek(0)
    if file_size > MAX_FILE_SIZE:
        raise ValueError(f"File size exceeds 10MB limit")

@router.post("/image-to-pdf")
async def api_convert_image_to_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    await validate_file_size(file)
    input_path = await save_upload_file_tmp(file)
    output_path = get_temp_file_path("output.pdf")
    
    convert_image_to_pdf(input_path, output_path)
    
    background_tasks.add_task(cleanup_files, [input_path, output_path])
    return FileResponse(output_path, filename="converted.pdf", media_type="application/pdf")

@router.post("/pdf-compress")
async def api_compress_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...), compression_level: str = Form("minimum")):
    await validate_file_size(file)
    input_path = await save_upload_file_tmp(file)
    output_path = get_temp_file_path("compressed.pdf")
    
    compress_pdf_file(input_path, output_path, compression_level)
    
    background_tasks.add_task(cleanup_files, [input_path, output_path])
    return FileResponse(output_path, filename=f"compressed_{file.filename}", media_type="application/pdf")

@router.post("/text-to-qr")
async def api_generate_qr_code(background_tasks: BackgroundTasks, text: str = Form(...)):
    output_path = get_temp_file_path("qrcode.png")
    
    create_qr_code(text, output_path)
    
    background_tasks.add_task(cleanup_files, [output_path])
    return FileResponse(output_path, filename="qrcode.png", media_type="image/png")

@router.post("/pdf-to-word")
async def api_convert_pdf_to_word(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    await validate_file_size(file)
    input_path = await save_upload_file_tmp(file)
    output_path = get_temp_file_path("output.docx")
    
    convert_pdf_to_docx(input_path, output_path)
    
    background_tasks.add_task(cleanup_files, [input_path, output_path])
    return FileResponse(output_path, filename="converted.docx", media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")

@router.post("/ppt-extract")
async def api_extract_ppt_text(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    await validate_file_size(file)
    input_path = await save_upload_file_tmp(file)
    output_path = get_temp_file_path("extracted.txt")
    
    extract_text_from_ppt(input_path, output_path)
    
    background_tasks.add_task(cleanup_files, [input_path, output_path])
    return FileResponse(output_path, filename="extracted_text.txt", media_type="text/plain")
