def review_report(report):

    score = 100

    feedback = []

    if len(report) < 1000:

        score -= 20

        feedback.append(
            "⚠️ Report may be too short."
        )

    else:

        feedback.append(
            "✅ Report length looks good."
        )

    if "Conclusion" not in report:

        score -= 10

        feedback.append(
            "⚠️ Missing conclusion section."
        )

    else:

        feedback.append(
            "✅ Conclusion section found."
        )

    return {
        "score": max(score, 0),
        "feedback": feedback
    }


if __name__ == "__main__":

    sample_report = """
    Executive Summary

    Market Overview

    Analysis

    Conclusion
    """

    result = review_report(
        sample_report
    )

    print(result)