import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def write_report(topic, research_results):

    prompt = f"""
You are a professional market intelligence analyst.

Create a detailed report on:

{topic}

Using the following research:

{research_results}

Structure:

1. Executive Summary
2. Market Overview
3. Key Findings
4. Analysis
5. Conclusion

Write professionally.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print(f"\nWriter Error: {e}")

        # Fallback report
        report = f"""
=================================
{topic.upper()} REPORT
=================================

EXECUTIVE SUMMARY

This report analyzes the {topic}.

KEY FINDINGS

"""

        for section, notes in research_results.items():

            report += f"\n\n{section}\n"
            report += "-" * len(section)
            report += f"\n{notes}\n"

        report += """

CONCLUSION

Further analysis recommended based on latest market developments.
"""

        return report


if __name__ == "__main__":

    sample_data = {
        "Market Overview": "EV market growing rapidly",
        "Competition": "Tata Motors leads market",
        "Infrastructure": "Charging network expanding"
    }

    report = write_report(
        "Indian EV Market",
        sample_data
    )

    print(report)