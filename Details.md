# 🎓 EduLink Project Summary

## 1️⃣ Frontend
**Stack Technologies:**
- React
- TypeScript
- Tailwind CSS

**Libraries / Tools:**
- React Router (Navigation)
- Axios / Fetch API (HTTP requests)
- React Query (Data fetching & caching, optional)
- UI Components (Custom or Headless UI / Radix UI)
- PDF Text Extraction (optional for student project input)

**Purpose:**
- Collect student project data (title, topic, abstract)
- Display ranked professors with match scores
- Smooth UI/UX for submissions and viewing results

---

## 2️⃣ Backend
**Stack Technologies:**
- Flask API (Python)
- Pandas / NumPy (Data manipulation)
- Tesseract OCR (Optional, professor documents)
- Sentence-Transformers / OpenAI embeddings (Vector embeddings for semantic search)

**Semantic Web / Knowledge Handling:**
- Knowledge Graph:
  - Entities: Professor, Paper, Topic, Student
  - Relationships: Professor → Paper → Topic, Student ↔ Professor
- Embeddings and semantic similarity search for matching
- Hybrid matching (TF-IDF + embeddings + knowledge graph) for better accuracy

**Responsibilities:**
- Receive student project data from frontend
- Fetch professor/paper/topic data from database
- Generate vector embeddings for papers/topics and student projects
- Compute similarity and match_score
- Store results in Match_History
- Return ranked professors to frontend

---

## 3️⃣ Operational Database (Raw Data Storage)
**Tech:** Supabase / PostgreSQL

**Purpose:**
- Store raw input data
- Fast read/write for API
- Base for AI pipeline processing

**Tables:**

```dbml
Table Topic {
  topic_id uuid [pk]
  name varchar
  created_at timestamp
}

Table Paper {
  paper_id uuid [pk]
  title varchar
  abstract text
  topic_ids uuid[]  // Many-to-many link to Topic
  created_at timestamp
}

Table Professor {
  prof_id uuid [pk]
  name varchar
  email varchar
  tel varchar
  position varchar
  paper_ids uuid[]  // One-to-many link to Paper
  created_at timestamp
  updated_at timestamp
}

Table Student {
  student_id uuid [pk]
  name varchar
  email varchar
  project_title text
  project_topic text
  project_abstract text
  created_at timestamp
}

Table Match_History {
  match_id uuid [pk]
  student_id uuid [ref: > Student.student_id]
  prof_id uuid [ref: > Professor.prof_id]
  project_id uuid
  match_score float
  created_at timestamp
}
