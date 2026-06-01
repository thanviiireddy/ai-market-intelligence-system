from agents.planner import create_research_plan
from agents.researcher import research_section
from agents.writer import write_report


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


print("\nGenerating Final Report...\n")

report = write_report(
    topic,
    research_results
)


print("\n===================================")
print("FINAL RESEARCH REPORT")
print("===================================\n")

print(report)