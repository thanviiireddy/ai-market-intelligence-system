import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)

import streamlit as st

from graph.workflow import run_workflow

st.title("📊 AI Market Intelligence System")

topic = st.text_input(
    "Enter a research topic"
)

if st.button("Generate Report"):

    with st.spinner(
        "Generating market intelligence report..."
    ):

        state = run_workflow(topic)

    st.success("Workflow completed!")

    st.subheader("Research Plan")

    st.write(
        f"**Topic:** {state.topic}"
    )

    for section in state.plan["sections"]:

        st.write(f"• {section}")

    st.subheader("Research Results")

    for section, notes in state.research_results.items():

        st.markdown(f"### {section}")

        st.write(notes)

    st.subheader("Final Report")

    st.write(state.report)

    st.subheader("Verification")

    st.write(
        f"Score: {state.verification['score']}/100"
    )

    st.subheader("Review")

    st.write(
        f"Score: {state.review['score']}/100"
    )

    st.download_button(
        label="📥 Download Report",
        data=state.report,
        file_name=f"{topic}_report.txt",
        mime="text/plain"
    )