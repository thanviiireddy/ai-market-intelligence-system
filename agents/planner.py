import json

from groq import Groq

from config.settings import (
    GROQ_API_KEY,
    MODEL_NAME
)

client = Groq(
    api_key=GROQ_API_KEY
)


def create_research_plan(topic):

    prompt = f"""
Create a market research plan for:

{topic}

Return ONLY valid JSON.

Example:

{{
    "topic": "{topic}",
    "sections": [
        "Market Overview",
        "Key Trends",
        "Major Players",
        "Challenges",
        "Future Outlook"
    ]
}}

Rules:
- Return JSON only
- No markdown
- No explanations
- No descriptions
- No nested objects
- Sections must be strings only
- Generate 5 relevant sections for the topic
"""

    try:

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        text = response.choices[
            0
        ].message.content

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        return json.loads(text)

    except Exception as e:

        print("\nUSING FALLBACK PLAN")
        print(f"\nPlanner Error: {e}")

        return {
            "topic": topic,
            "sections": [
                f"Overview of {topic}",
                f"Key Trends in {topic}",
                f"Major Players in {topic}",
                f"Challenges in {topic}",
                f"Future Outlook for {topic}"
            ]
        }


if __name__ == "__main__":

    topic = input(
        "Enter a topic: "
    )

    plan = create_research_plan(
        topic
    )

    print("\nTopic:")
    print(plan["topic"])

    print("\nSections:")

    for i, section in enumerate(
        plan["sections"],
        start=1
    ):
        print(f"{i}. {section}")