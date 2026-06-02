from agents.planner import create_research_plan
from agents.researcher import research_section
from agents.verifier import verify_research
from agents.writer import write_report

from tools.export_tool import save_report


topic = input("Enter a topic: ")

print("\nCreating Research Plan...\n")

plan = create_research_plan(topic)

research_results = {}

for section in plan["sections"]:

    print(f"\nResearching Section:\n{section}\n")

    notes = research_section(
        topic,
        section
    )

    research_results[section] = notes


print("\nVerifying Research...\n")

verification = verify_research(
    research_results
)

print(f"\nVerification Score: {verification['score']}/100\n")

for item in verification["details"]:
    print(item)


print("\nGenerating Final Report...\n")

report = write_report(
    topic,
    research_results
)


save_report(
    report,
    topic
)


print("\n===================================")
print("FINAL RESEARCH REPORT")
print("===================================\n")

print(report)