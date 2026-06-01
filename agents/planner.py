import os
import json

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
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

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        text = response.text

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print(f"\nPlanner Error: {e}")

        # Fallback plan if Gemini is unavailable
        return {
            "topic": topic,
            "sections": [
                "Market Overview",
                "Government Policies",
                "Competition",
                "Infrastructure",
                "Consumer Behavior"
            ]
        }


if __name__ == "__main__":

    topic = input("Enter a topic: ")

    plan = create_research_plan(topic)

    print("\nTopic:")
    print(plan["topic"])

    print("\nSections:")

    for i, section in enumerate(plan["sections"], start=1):
        print(f"{i}. {section}")