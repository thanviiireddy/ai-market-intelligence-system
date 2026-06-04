import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 600000, // 10 minutes timeout since LLM workflow may take a long time
});

/**
 * Triggers the market research agent workflow.
 * @param {string} topic - The research topic.
 * @returns {Promise<Object>} The final research execution state.
 */
export const triggerResearch = async (topic) => {
  try {
    const response = await apiClient.get(`/research?topic=${encodeURIComponent(topic)}`);
    return response.data;
  } catch (error) {
    console.error("API Error in triggerResearch:", error);
    throw error;
  }
};

/**
 * Checks backend health/connection.
 * @returns {Promise<boolean>} True if API is responsive.
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get("/", { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    console.warn("Backend API is currently offline:", error.message);
    return false;
  }
};
