from fastapi import APIRouter

from graph.workflow import run_workflow

router = APIRouter()


@router.get("/research")
def research(topic: str):

    state = run_workflow(topic)

    return {
        "topic": state.topic,
        "plan": state.plan,
        "research_results": state.research_results,

        "verification": state.verification,

        "report": state.report,

        "review": state.review,

        "report_path": state.report_path
    }