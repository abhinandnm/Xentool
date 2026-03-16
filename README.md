# Xentool

Xentool is an all-in-one online file utility platform where users can easily convert, compress, and extract information from files quickly and securely in their browser.

## Features
1. Image to PDF Converter
2. PDF Compressor
3. Text to QR Code Generator
4. PDF to Word Converter
5. PowerPoint Text Extraction

## Tech Stack
- **Frontend Dashboard:** React, Vite, Tailwind CSS, React Router v6
- **Backend API:** FastAPI, Python 3.11
- **File Processing:** PyPDF2, Pillow, img2pdf, qrcode, pdf2docx, python-pptx

## Local Development Setup

### Backend (Python)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Unix:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Node)
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

You can deploy Xentool as a containerized stack using Docker Compose.

```bash
docker-compose up -d --build
```

- Frontend will run on port `80`
- Backend API will run on port `8000`

### Deploying to Render / Railway
1. **Database:** Not required. Xentool is fully stateless.
2. **Backend Engine:** Create a Web Service from the `/backend` directory. Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Frontend App:** Create a Static Site from the `/frontend` directory using command `npm run build` and publish directory `dist`.

### Monetization & Ads
Google AdSense placeholders are integrated directly into `frontend/src/components/Layout.jsx`. 
Simply replace the `<AdPlaceholder />` components with your `<ins class="adsbygoogle">` script tags provided by your AdSense dashboard.
