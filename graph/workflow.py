from graph.state import ResearchState

from agents.planner import create_research_plan
from agents.researcher import research_section
from agents.verifier import verify_research
from agents.writer import write_report
from agents.reviewer import review_report

from tools.export_tool import save_report

from memory.vector_store import save_to_memory


def run_workflow(topic):

    state = ResearchState()

    state.topic = topic

    print("\nRunning Planner...\n")

    state.plan = create_research_plan(
        topic
    )

    print("\nRunning Researcher...\n")

    for section in state.plan["sections"]:

        notes = research_section(
            topic,
            section
        )

        state.research_results[
            section
        ] = notes

    print("\nRunning Verifier...\n")

    state.verification = verify_research(
        state.research_results
    )

    print(
        f"Verification Score: "
        f"{state.verification['score']}/100"
    )

    print("\nGenerating Report...\n")

    state.report = write_report(
        topic,
        state.research_results
    )

    print("\nRunning Reviewer...\n")

    state.review = review_report(
        state.report
    )

    print(
        f"Report Score: "
        f"{state.review['score']}/100"
    )

    print("\nSaving Report...\n")

    state.report_path = save_report(
        state.report,
        topic
    )

    print("\nSaving Report To Memory...\n")

    save_to_memory(
        state.report
    )

    return state


if __name__ == "__main__":

    topic = input(
        "Enter a research topic: "
    )

    state = run_workflow(
        topic
    )

    print("\n===================================")
    print("FINAL REPORT")
    print("===================================\n")

    print(state.report)

    print("\n===================================")
    print("VERIFICATION")
    print("===================================\n")

    print(state.verification)

    print("\n===================================")
    print("REVIEW")
    print("===================================\n")

    print(state.review)

    print("\n===================================")
    print("REPORT SAVED")
    print("===================================\n")

    print(state.report_path)