from groq import Groq

from config.settings import (
    GROQ_API_KEY,
    MODEL_NAME
)

client = Groq(
    api_key=GROQ_API_KEY
)


def write_report(topic, research_results):

    prompt = f"""
You are a professional market intelligence analyst.

Create a detailed report on:

{topic}

Using:

{research_results}

Structure:

1. Executive Summary
2. Market Overview
3. Key Findings
4. Analysis
5. Conclusion
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

        print(f"\nWriter Error: {e}")

        report = f"""
=================================
{topic.upper()} REPORT
=================================

EXECUTIVE SUMMARY

This report analyzes the {topic}.
"""

        for section, notes in research_results.items():

            report += f"\n\n{section}\n"
            report += "-" * len(section)
            report += f"\n{notes}\n"

        return report


if __name__ == "__main__":

    sample_data = {
        "Overview":
        "Market growing rapidly"
    }

    print(
        write_report(
            "Indian EV Market",
            sample_data
        )
    )