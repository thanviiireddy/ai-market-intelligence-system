import os

from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()

client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


def search_web(query):

    print(f"\nSearching for: {query}")

    response = client.search(
        query=query,
        max_results=5
    )

    results = []

    for item in response["results"]:

        results.append(
            {
                "title": item["title"],
                "url": item["url"]
            }
        )

    return results


if __name__ == "__main__":

    data = search_web(
        "Indian EV Market"
    )

    print("\nResults:\n")

    for result in data:

        print(result["title"])
        print(result["url"])
        print()