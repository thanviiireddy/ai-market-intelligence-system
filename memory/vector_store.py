import chromadb

from config.settings import CHROMA_DB_DIR


client = chromadb.PersistentClient(
    path=CHROMA_DB_DIR
)

collection = client.get_or_create_collection(
    name="research_memory"
)


def save_to_memory(text):

    count = collection.count()

    collection.add(
        documents=[text],
        ids=[f"doc_{count}"]
    )

    print("\nSaved to memory.")


def search_memory(query, n_results=3):

    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )

    return results


def show_memory():

    data = collection.get()

    print("\nMemory Contents:\n")

    for doc in data["documents"]:

        print("-" * 50)
        print(doc[:300])
        print()


if __name__ == "__main__":

    print("\nTesting ChromaDB Memory...\n")

    save_to_memory(
        "Indian EV Market Report"
    )

    save_to_memory(
        "Electric Vehicles are growing rapidly in India."
    )

    print("\nSearching Memory...\n")

    results = search_memory(
        "electric vehicles"
    )

    print(results)

    print("\nDisplaying Stored Memory...\n")

    show_memory()