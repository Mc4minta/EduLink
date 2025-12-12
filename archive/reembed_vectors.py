import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import os
import ast
import json

import pickle

# Configuration
INPUT_CSV = "edulink_vectors_for_supabase.csv"
OUTPUT_CSV = "edulink_vectors_1024d.csv"
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "embedding_model.pkl")


def main():
    print(f"🚀 Starting re-embedding process using custom model from {MODEL_PATH}...")

    # 1. Load Model
    print("Loading model...")
    if not os.path.exists(MODEL_PATH):
        print(f"❌ Model file not found: {MODEL_PATH}")
        return

    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)

    # 2. Load CSV
    if not os.path.exists(INPUT_CSV):
        print(f"❌ Input file not found: {INPUT_CSV}")
        return

    print(f"Reading {INPUT_CSV}...")
    df = pd.read_csv(INPUT_CSV)
    print(f"Found {len(df)} rows.")

    # 3. Re-calculate embeddings
    new_embeddings = []

    for idx, row in df.iterrows():
        text = str(row.get("text", ""))
        if not text:
            # Fallback to reconstructing text if 'text' column logic is messy
            text = f"{row.get('project_name', '')} {row.get('short_description', '')}"

        if idx % 10 == 0:
            print(f"Processing row {idx}/{len(df)}...", end="\r")

        emb = model.encode(text, normalize_embeddings=True)
        new_embeddings.append(emb.tolist())

    df["embedding"] = new_embeddings

    # 4. Save
    print(f"\nSaving to {OUTPUT_CSV}...")
    df.to_csv(OUTPUT_CSV, index=False)
    print("✅ Done! You can now import this file.")


if __name__ == "__main__":
    main()
