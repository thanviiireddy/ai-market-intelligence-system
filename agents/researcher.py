import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from groq import Groq

from tools.search_tool import search_web

from config.settings import (
    GROQ_API_KEY,
    MODEL_NAME
)

client = Groq(
    api_key=GROQ_API_KEY
)


def research_section(topic, section):

    print(f"\nSearching web for: {section}\n")

    search_results = search_web(
        f"{topic} {section}"
    )

    source_text = ""

    for result in search_results:

        source_text += f"""
Title: {result['title']}
URL: {result['url']}
"""

    prompt = f"""
You are a market research analyst.

Topic:
{topic}

Section:
{section}

Web Sources:

{source_text}

Provide:

- Key Facts
- Important Trends
- Key Insights
- Major Companies

Write detailed research notes.
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

        return response.choices[
            0
        ].message.content

    except Exception as e:

        print(f"\nError: {e}")

        fallback_notes = f"""
Research for section '{section}'.

Sources Found:

"""

        for result in search_results:

            fallback_notes += f"""
• {result['title']}
{result['url']}
"""

        return fallback_notes


if __name__ == "__main__":

    notes = research_section(
        "Indian EV Market",
        "Government Policies"
    )

    print(notes)