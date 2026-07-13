from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import fitz
import os
import json
import re
import hashlib
import requests

# Load ENV
load_dotenv()

# OpenRouter API Key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "SciJudge Backend Running"
    }

@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    paper_language: str = Form(...),
    feedback_language: str = Form(...),
    judge_persona: str = Form(...)
):

    try:

        # Read PDF
        pdf_bytes = await file.read()

        # Open PDF
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")

        text = ""

        # Extract text
        for page in doc:
            text += page.get_text()

        # Limit text size
        text = text[:12000]

        # --- DEBUG: prove this request has its own distinct content ---
        text_hash = hashlib.md5(text.encode("utf-8", errors="ignore")).hexdigest()

        print(
            f"[UPLOAD] filename={file.filename} "
            f"persona={judge_persona} "
            f"text_len={len(text)} "
            f"text_hash={text_hash} "
            f"preview={text[:120]!r}"
        )
        # ----------------------------------------------------------------

        # PERSONA SYSTEM
        persona_prompt = ""

        if judge_persona == "ISEF Judge":

            persona_prompt = """
You are an official ISEF scientific judge.

Be fair, analytical, scientific, and balanced.

Evaluate based on:
- innovation
- methodology
- feasibility
- scientific impact
- presentation quality

Use realistic science competition standards.

Use the FULL scoring scale from 1 to 10.
Do not avoid low scores when justified.
"""

        elif judge_persona == "MIT Professor":

            persona_prompt = """
You are a highly critical MIT research professor.

Be deeply technical and intellectually demanding.

Focus heavily on:
- methodology
- scientific rigor
- novelty
- scalability
- experimental validation

Challenge assumptions aggressively.

Do NOT inflate scores.

Use the FULL scoring scale from 1 to 10.
"""

        elif judge_persona == "Harsh Reviewer":

            persona_prompt = """
You are an extremely harsh peer reviewer.

Aggressively criticize:
- weak methodology
- unsupported claims
- logical flaws
- lack of validation
- poor experimentation

Be brutally honest.

Low scores are acceptable if deserved.

Use the FULL scoring scale from 1 to 10.
"""

        elif judge_persona == "Supportive Mentor":

            persona_prompt = """
You are a supportive scientific mentor.

Encourage the student while still providing constructive criticism.

Focus on:
- growth potential
- creativity
- future improvements
- student motivation

Be supportive but realistic.

Use the FULL scoring scale from 1 to 10.
"""

        # Guard against an empty/unreadable PDF producing a generic,
        # near-identical prompt across different uploads.
        if not text.strip():

            return {
                "error": "Could not extract any text from this PDF. "
                         "It may be scanned/image-only or corrupted."
            }

        # MAIN PROMPT
        prompt = f"""
{persona_prompt}

Analyze this scientific research paper critically.

Paper Language: {paper_language}

Return ALL feedback in {feedback_language}.

Return ONLY valid JSON.

JSON format:

{{
  "overall_score": 8.5,
  "innovation_score": 9,
  "methodology_score": 8,
  "impact_score": 7,
  "clarity_score": 8,

  "strengths": [
    "strength 1",
    "strength 2"
  ],

  "weaknesses": [
    "weakness 1",
    "weakness 2"
  ],

  "judge_questions": [
    "question 1",
    "question 2"
  ],

  "final_verdict": "short final verdict"
}}

Research Paper:
{text}
"""

        # OpenRouter Request
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openrouter/auto",
                "temperature": 0.7,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            },
            timeout=60
        )

        result = response.json()

        print(f"[UPLOAD] filename={file.filename} openrouter_status={response.status_code}")

        # Handle API errors
        if "choices" not in result:

            return {
                "error": result
            }

        raw_text = result["choices"][0]["message"]["content"]

        # Remove markdown formatting
        cleaned = re.sub(r"```json|```", "", raw_text).strip()

        # Convert AI response to JSON
        parsed = json.loads(cleaned)

        print(
            f"[UPLOAD] filename={file.filename} "
            f"overall_score={parsed.get('overall_score')} "
            f"innovation_score={parsed.get('innovation_score')}"
        )

        return {
            "filename": file.filename,
            "analysis": parsed
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "error": str(e)
        }