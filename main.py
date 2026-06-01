from agents.planner import create_research_plan
from agents.researcher import research_section


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


print("\n===================================")
print("FINAL RESEARCH REPORT")
print("===================================\n")

for section, notes in research_results.items():

    print(f"\n### {section}\n")

    print(notes)