# SCIJUDGE AI

SCIJUDGE AI is a web application that assists in evaluating scientific research papers. It provides structured feedback and scoring based on common judging criteria, helping students, researchers, and science fair judges review papers more efficiently.

The project is currently under active development, and new features are continuously being added and improved.

---
## Live Demo

🚀 Try SCIJUDGE AI online:

https://scijudge-ai.vercel.app

---

## Features

- Upload research papers in PDF format
- AI-assisted paper evaluation
- Overall score with category-based scoring
- Strengths and weaknesses analysis
- Detailed evaluation report
- Evaluation history
- Multi-language interface
- AI response language selection
- Downloadable evaluation reports
- Responsive and modern user interface

---

## Why I Built This

Research paper evaluation often takes significant time and can vary depending on the reviewer. I built SCIJUDGE AI to provide a structured evaluation process that helps reviewers analyze research papers more efficiently while keeping the final decision in the hands of humans.

This project is being developed as part of **Hack Club Horizons 2026**.

---

## How It Works

1. Upload a research paper in PDF format.
2. The backend extracts the paper's content.
3. The AI analyzes the research based on predefined evaluation criteria.
4. The system generates scores and detailed feedback.
5. Users can review or download the evaluation report.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python

### AI

- Large Language Model API

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/YassinAliElDeeb/SCIJUDGE-AI.git
cd SCIJUDGE-AI
```

### Backend

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend

```bash
cd frontend

npm install
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Project Structure

```
SCIJUDGE-AI
│
├── assets/
│
├── backend/
│
├── frontend/
│
└── README.md
```

---

## Screenshot

<p align="center">
  <img src="assets/home.png" alt="SCIJUDGE AI" width="900">
</p>

---

## Roadmap

- User authentication
- Cloud deployment
- PDF export improvements
- Research comparison
- Custom evaluation criteria
- Performance optimization
- Judge dashboard
- Team collaboration

---

## Contributing

Contributions, ideas, and feedback are always welcome. If you have suggestions or would like to contribute, feel free to open an issue or submit a pull request.

---

## Author

**Yassin Ali**

GitHub  
https://github.com/YassinAliElDeeb

Linktree  
https://linktr.ee/yassin.ali

LinkedIn  
https://www.linkedin.com/in/yassinali30/

---

## License

This project is licensed under the MIT License.