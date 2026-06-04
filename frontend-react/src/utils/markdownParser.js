/**
 * Parses markdown to extract sections for Table of Contents navigation.
 * Matches lines starting with '#', '##', or '###'.
 * @param {string} markdownText - The report markdown.
 * @returns {Array<{id: string, text: string, level: number}>} Array of heading items.
 */
export const extractHeadings = (markdownText) => {
  if (!markdownText) return [];
  
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  
  // Reset regex state
  headingRegex.lastIndex = 0;
  
  while ((match = headingRegex.exec(markdownText)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Create an anchor-friendly ID
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
      
    headings.push({ id, text, level });
  }
  
  return headings;
};

/**
 * Scans markdown to find all unique URLs and references.
 * @param {string} markdownText - The report markdown.
 * @returns {Array<string>} Unique list of URL strings.
 */
export const extractCitations = (markdownText) => {
  if (!markdownText) return [];
  
  // Regex to match markdown links: [text](url) or naked URLs
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const nakedUrlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = new Set();
  let match;
  
  // Find markdown links first
  linkRegex.lastIndex = 0;
  while ((match = linkRegex.exec(markdownText)) !== null) {
    urls.add(match[2].trim());
  }
  
  // Find naked URLs
  nakedUrlRegex.lastIndex = 0;
  while ((match = nakedUrlRegex.exec(markdownText)) !== null) {
    // Avoid trailing punctuation from raw matching
    let url = match[1].trim();
    if (url.endsWith(".") || url.endsWith(",") || url.endsWith(")")) {
      url = url.slice(0, -1);
    }
    urls.add(url);
  }
  
  return Array.from(urls);
};
