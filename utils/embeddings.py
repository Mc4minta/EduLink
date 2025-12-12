import numpy as np
from typing import List
from sklearn.metrics.pairwise import cosine_similarity
import hashlib

try:
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer('all-MiniLM-L6-v2')  # 384-dim embeddings
except Exception as e:
    print(f"⚠️ Warning: Could not load SentenceTransformer: {e}")
    model = None

def generate_embedding(text: str) -> List[float]:
    """Generate embedding for text using sentence-transformers."""
    if not model:
        # Fallback: Return hash-based pseudo-embedding
        hash_obj = hashlib.sha256(text.encode())
        hash_int = int(hash_obj.hexdigest(), 16)
        np.random.seed(hash_int % (2**31))
        return np.random.randn(384).tolist()
    
    try:
        embedding = model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    except Exception as e:
        print(f"❌ Error generating embedding: {e}")
        raise

def compute_similarity(embedding1: List[float], embedding2: List[float]) -> float:
    """Compute cosine similarity between two embeddings."""
    try:
        arr1 = np.array(embedding1).reshape(1, -1)
        arr2 = np.array(embedding2).reshape(1, -1)
        similarity = cosine_similarity(arr1, arr2)[0][0]
        return float(similarity)
    except Exception as e:
        print(f"❌ Error computing similarity: {e}")
        raise

def normalize_embedding(embedding: List[float]) -> List[float]:
    """Normalize embedding to unit length."""
    arr = np.array(embedding)
    norm = np.linalg.norm(arr)
    if norm == 0:
        return embedding
    return (arr / norm).tolist()