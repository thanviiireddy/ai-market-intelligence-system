def verify_research(research_results):

    verification_report = []

    score = 100

    for section, notes in research_results.items():

        if "could not be completed" in notes.lower():

            verification_report.append(
                f"❌ {section}: Research failed."
            )

            score -= 20

        elif len(notes) < 200:

            verification_report.append(
                f"⚠️ {section}: Research may be too short."
            )

            score -= 10

        else:

            verification_report.append(
                f"✅ {section}: Looks good."
            )

    return {
        "score": max(score, 0),
        "details": verification_report
    }


if __name__ == "__main__":

    sample_data = {
        "Market Overview":
        "EV market growing rapidly in India."
    }

    result = verify_research(sample_data)

    print(result)