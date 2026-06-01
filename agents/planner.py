import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def create_research_plan(topic):

    prompt = f"""
    Create a research plan for:

    {topic}

    Return ONLY JSON.

    Format:

    {{
        "topic": "...",
        "sections": [
            "...",
            "...",
            "..."
        ]
    }}
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    return json.loads(text)
topic = input("Enter a topic: ")

plan = create_research_plan(topic)

print("\nTopic:")
print(plan["topic"])

print("\nSections:")

for i, section in enumerate(plan["sections"], start=1):
    print(f"{i}. {section}")