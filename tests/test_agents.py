import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

from agents.planner import create_research_plan
from agents.verifier import verify_research
from agents.reviewer import review_report


def test_planner():

    plan = create_research_plan(
        "AI in Healthcare"
    )

    assert "sections" in plan

    assert len(
        plan["sections"]
    ) > 0


def test_verifier():

    sample_data = {
        "Market Overview":
        "This is a detailed market overview " * 20
    }

    result = verify_research(
        sample_data
    )

    assert result["score"] > 0


def test_reviewer():

    report = """
    Executive Summary

    Market Overview

    Analysis

    Conclusion
    """

    result = review_report(
        report
    )

    assert result["score"] > 0