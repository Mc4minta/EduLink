# CSV Format Guide for Professor Import

## Required CSV Format

Your CSV file should be named: `edulink_vectors_for_supabase.csv`

### Required Columns:

| Column Name      | Type   | Description                                    | Example                                    |
|------------------|--------|------------------------------------------------|--------------------------------------------|
| `doc_id`         | text   | Unique document identifier                     | `professor:A5070164108`                    |
| `doc_type`       | text   | Type of document (optional)                    | `professor` or `paper`                     |
| `professor_name` | text   | Full name of the professor                     | `Aung Myo Htut`                           |
| `author_id`      | text   | Unique identifier for the professor            | `A5070164108`                             |
| `paper_id`       | text   | Unique identifier for the paper (optional)     | `W1234567890`                             |
| `work_title`     | text   | Title of the research paper                    | `HIV Risk Factors in Southeast Asia`      |
| `topics`         | text   | Research topics (comma-separated or list)      | `['HIV', 'Drug Use', 'Sexual Risk']`      |
| `text`           | text   | Full text or abstract of the paper             | `This study examines...`                  |
| `embedding`      | text   | 384-dimensional vector as list of floats       | `[0.123, -0.456, 0.789, ...]`             |

### Important Notes:

1. **`author_id`** - This is the KEY field that links everything together
   - Must be unique per professor
   - Same professor can have multiple rows (one per paper)
   - Example: `A5070164108`

2. **`embedding`** - Must be exactly 384 dimensions
   - Format: Python list or JSON array of floats
   - Example: `[0.123, -0.456, 0.789, ..., 0.321]`
   - Generated using: `sentence-transformers/all-MiniLM-L6-v2`

3. **`topics`** - Can be in multiple formats:
   - Python list: `['Topic 1', 'Topic 2', 'Topic 3']`
   - JSON array: `["Topic 1", "Topic 2", "Topic 3"]`
   - Comma-separated: `Topic 1, Topic 2, Topic 3`

4. **Multiple Papers per Professor**:
   - Each row represents ONE paper
   - Same `author_id` can appear in multiple rows
   - The import script will aggregate embeddings using mean pooling

### Example CSV Structure:

```csv
doc_id,doc_type,professor_name,author_id,paper_id,work_title,topics,text,embedding
professor:A5070164108,professor,Aung Myo Htut,A5070164108,W123,HIV Risk Study,"['HIV', 'Drug Use']",This study examines...,"[0.123, -0.456, ...]"
professor:A5070164108,professor,Aung Myo Htut,A5070164108,W124,TB Prevention,"['TB', 'Epidemiology']",This paper discusses...,"[0.789, -0.321, ...]"
professor:B1234567890,professor,John Smith,B1234567890,W125,Machine Learning,"['AI', 'ML', 'NLP']",We propose a new...,"[0.456, -0.789, ...]"
```

### What the Import Script Does:

1. **Groups by `author_id`**: All papers by the same professor are grouped together
2. **Aggregates embeddings**: Calculates the mean of all paper embeddings for each professor
3. **Extracts topics**: Collects unique topics from all papers
4. **Creates two records**:
   - One in `professors` table (metadata: name, email, department, expertise)
   - One in `professor_vectors` table (aggregated 384-dim embedding)

### Your Current CSV:

✅ You already have the correct format!
- File: `edulink_vectors_for_supabase.csv`
- Rows: 560 papers
- Unique professors: ~multiple (grouped by author_id)
- Embedding dimensions: 384 ✅

### To Import:

```bash
cd EduLink-Backend
python database/import_professors.py
```

The script will automatically:
- Read the CSV
- Group papers by professor
- Calculate mean embeddings
- Insert into Supabase

### If You Need to Create Your Own CSV:

Use this Python code to generate embeddings:

```python
from sentence_transformers import SentenceTransformer
import pandas as pd

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Your professor data
data = {
    'author_id': 'A123456',
    'professor_name': 'Dr. Jane Doe',
    'paper_text': 'Your research paper text here...',
    'topics': "['Machine Learning', 'NLP', 'AI']"
}

# Generate embedding (384 dimensions)
embedding = model.encode(data['paper_text'], normalize_embeddings=True)
embedding_list = embedding.tolist()

# Save to CSV
df = pd.DataFrame([{
    'doc_id': f"professor:{data['author_id']}",
    'doc_type': 'professor',
    'professor_name': data['professor_name'],
    'author_id': data['author_id'],
    'paper_id': 'W123',
    'work_title': 'Paper Title',
    'topics': data['topics'],
    'text': data['paper_text'],
    'embedding': str(embedding_list)
}])

df.to_csv('edulink_vectors_for_supabase.csv', index=False)
```

### Troubleshooting:

**Error: "Embedding dimension mismatch"**
- Check that embeddings are exactly 384 floats
- Verify you're using `all-MiniLM-L6-v2` model

**Error: "Unable to parse embedding"**
- Ensure embedding is formatted as a list: `[0.1, 0.2, ...]`
- Not as a string: `"0.1 0.2 ..."`

**Error: "Professor not found after import"**
- Check that `author_id` is consistent across all rows
- Verify data was actually inserted: `SELECT COUNT(*) FROM professors;`
