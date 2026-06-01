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
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        print(f"\nError: {e}")
        return "Research temporarily unavailable."


if __name__ == "__main__":

    # Test Data
    topic = "Indian EV Market"

    section = "Government Policies"

    # Run Research Agent
    notes = research_section(
        topic,
        section
    )

    # Print Output
    print("\n========================")
    print("RESEARCH NOTES")
    print("========================\n")

    print(notes)