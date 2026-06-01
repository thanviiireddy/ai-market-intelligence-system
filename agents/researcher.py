import os

from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Create Gemini client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def research_section(topic, section):

    prompt = f"""
Research this topic:

{topic}

Section:

{section}

Give 5 bullet points.

Include:
- Key facts
- Trends
- Important insights
- Major players if relevant
"""

    print("Sending prompt...\n")
    print(prompt)

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print(f"\nError: {e}")

        return f"""
Research for section '{section}' could not be completed.

Possible reasons:
- Gemini quota exceeded
- Temporary server overload
- API unavailable

Further research required.
"""


if __name__ == "__main__":

    topic = "Indian EV Market"

    section = "Government Policies"

    notes = research_section(
        topic,
        section
    )

    print("\n========================")
    print("RESEARCH NOTES")
    print("========================\n")

    print(notes)