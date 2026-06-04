import os


def save_report(report, topic):

    # Create reports folder if it doesn't exist
    os.makedirs("outputs/reports", exist_ok=True)

    # Create filename
    filename = (
    topic.strip()
    .lower()
    .replace(" ", "_")
    + "_report.txt"
)

    filepath = os.path.join(
        "outputs",
        "reports",
        filename
    )

    # Save report
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(report)

    print(f"\nReport saved to: {filepath}")

    return filepath


if __name__ == "__main__":

    sample_report = """
Indian EV Market Report

Market Overview:
EV market growing rapidly.

Competition:
Tata Motors leads market.
"""

    save_report(
        sample_report,
        "Indian EV Market"
    )