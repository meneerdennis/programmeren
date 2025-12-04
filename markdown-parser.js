// Markdown Parser for Custom Course Tags
class MarkdownParser {
  constructor() {
    this.exercises = [];
    this.currentLesson = "";
  }

  // Parse markdown content and convert custom tags to HTML
  parse(content) {
    // First, handle frontmatter
    content = this.parseFrontmatter(content);

    // Handle custom tags
    content = this.parseCustomTags(content);

    // Handle regular markdown
    content = this.parseMarkdown(content);

    return content;
  }

  // Parse YAML frontmatter
  parseFrontmatter(content) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
    const match = content.match(frontmatterRegex);

    if (match) {
      const frontmatter = this.parseYAML(match[1]);
      this.currentLesson = {
        path: frontmatter.path || "",
        title: frontmatter.title || "Untitled Lesson",
        hidden: frontmatter.hidden || false,
      };
      content = content.replace(frontmatterRegex, "");
    }

    return content;
  }

  // Simple YAML parser for frontmatter
  parseYAML(yaml) {
    const result = {};
    const lines = yaml.split("\n");

    for (const line of lines) {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Remove quotes if present
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        result[key] = value;
      }
    }

    return result;
  }

  // Parse custom course tags
  parseCustomTags(content) {
    // Parse text-box tags
    content = content.replace(/<text-box([^>]*)>/g, (match, attributes) => {
      const attrs = this.parseAttributes(attributes);
      return `<div class="text-box ${attrs.variant || ""}" data-name="${
        attrs.name || ""
      }">`;
    });
    content = content.replace(/<\/text-box>/g, "</div>");

    // Parse in-browser-programming-exercise tags FIRST (they may contain sample-output)
    content = this.parseExerciseTags(content);

    // Parse remaining sample-output tags (those not inside exercises)
    content = content.replace(
      /<sample-output>/g,
      '<div class="sample-output">'
    );
    content = content.replace(/<\/sample-output>/g, "</div>");

    return content;
  }

  // Parse exercise tags and extract their content
  parseExerciseTags(content) {
    const exerciseRegex =
      /<in-browser-programming-exercise([^>]*)>([\s\S]*?)<\/in-browser-programming-exercise>/g;
    let match;

    while ((match = exerciseRegex.exec(content)) !== null) {
      const attributes = this.parseAttributes(match[1]);
      let exerciseContent = match[2].trim();
      const exerciseId = `exercise-${this.exercises.length}`;

      // Check if content contains sample-output and extract expected output
      const sampleOutputRegex = /<sample-output>([\s\S]*?)<\/sample-output>/;
      const sampleOutputMatch = exerciseContent.match(sampleOutputRegex);
      let expectedOutput = "";
      let cleanContent = exerciseContent; // Content for display

      console.log(`Processing exercise "${attributes.name}":`);
      console.log("Original exercise content:", exerciseContent);
      console.log("Sample output match:", sampleOutputMatch);

      if (sampleOutputMatch) {
        expectedOutput = sampleOutputMatch[1].trim();
        console.log("Extracted expected output:", expectedOutput);
        // Remove sample-output from exercise content for display
        cleanContent = exerciseContent.replace(sampleOutputRegex, "").trim();
        console.log(
          "Clean content after removing sample-output:",
          cleanContent
        );
      }

      // Detect language
      const detectedLanguage = this.detectLanguage(exerciseContent);
      console.log(`Language detection for exercise "${attributes.name}":`, {
        rawContent: exerciseContent,
        cleanContent: cleanContent,
        detectedLanguage: detectedLanguage,
      });

      // Store exercise data
      this.exercises.push({
        id: exerciseId,
        name: attributes.name || "Untitled Exercise",
        tmcname: attributes.tmcname || "",
        content: cleanContent,
        rawContent: exerciseContent, // Keep original for language detection
        expectedOutput: expectedOutput,
        language: detectedLanguage,
      });

      // Replace with clickable exercise card
      const exerciseCard = `
                <div class="in-browser-programming-exercise" data-exercise-id="${exerciseId}">
                    <h4>🎯 ${attributes.name || "Exercise"}</h4>
                    <p>Click to start coding...</p>
                </div>
            `;

      content = content.replace(match[0], exerciseCard);
    }

    return content;
  }

  // Parse HTML attributes
  parseAttributes(attributeString) {
    const attributes = {};
    const regex = /(\w+)="([^"]*)"/g;
    let match;

    while ((match = regex.exec(attributeString)) !== null) {
      attributes[match[1]] = match[2];
    }

    return attributes;
  }

  // Detect programming language from content
  detectLanguage(content) {
    // If no clear pattern, try to detect from code blocks first
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1];
      const code = match[2];

      if (language === "python" || code.includes("print(")) {
        return "python";
      } else if (language === "javascript") {
        return "javascript";
      } else if (language === "html") {
        return "html";
      } else if (language === "css") {
        return "css";
      }
    }

    // Check for print statements (Python indicator) - check more broadly
    const lowerContent = content.toLowerCase();
    if (
      lowerContent.includes("print(") ||
      lowerContent.includes("def ") ||
      lowerContent.includes("import ") ||
      lowerContent.includes("print ") ||
      /print\s*\(/.test(content) || // More flexible pattern for print statements
      lowerContent.includes("schrijf een programma") || // Dutch for "write a program"
      lowerContent.includes("emoticon") || // Common word in early programming exercises
      lowerContent.includes("programma") // Dutch for "program"
    ) {
      return "python";
    }

    // Check for JavaScript patterns
    if (
      content.includes("{") &&
      content.includes("}") &&
      content.includes(";")
    ) {
      return "javascript";
    }

    // Check for CSS patterns
    if (
      content.includes("margin") ||
      content.includes("padding") ||
      content.includes("color") ||
      /\{[^}]*\}/.test(content) // CSS rule pattern
    ) {
      return "css";
    }

    // Check for HTML patterns (only if we have actual HTML tags, not markdown)
    // Look for HTML tags like <tag> or </tag>
    const htmlTagRegex = /<\/?[a-zA-Z][^>]*>/;
    if (htmlTagRegex.test(content) && !content.includes("```")) {
      return "html";
    }

    // For coding exercises in this course, default to Python
    return "python";
  }

  // Basic markdown parsing
  parseMarkdown(content) {
    // Parse tables first (before other markdown elements)
    content = this.parseTables(content);

    // Parse lists (before headers to avoid conflicts)
    content = this.parseLists(content);

    // Headers
    content = content.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
    content = content.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
    content = content.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
    content = content.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    content = content.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    content = content.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold and italic
    content = content.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    content = content.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    // Inline code
    content = content.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Code blocks
    content = content.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (match, lang, code) => {
        const language = lang || "text";
        return `<pre><code class="language-${language}">${this.escapeHtml(
          code.trim()
        )}</code></pre>`;
      }
    );

    // Links
    content = content.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    // Horizontal rules
    content = content.replace(/^(?:[-*_]){3,}$/gim, "<hr>");

    // Paragraphs (but not for existing HTML elements)
    content = content.replace(
      /^(?!<[h|u|l|d|p|t|b|c|r|h])(.+)$/gim,
      "<p>$1</p>"
    );

    return content;
  }

  // Parse markdown lists
  parseLists(content) {
    // Parse unordered lists
    content = content.replace(/^(?:\s*)[-*+] (.+)$/gim, "<li>$1</li>");

    // Parse ordered lists (numbered)
    content = content.replace(/^(?:\s*)\d+\. (.+)$/gim, "<li>$1</li>");

    // Wrap consecutive list items in appropriate list containers
    // First, handle unordered lists
    content = content.replace(
      /(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gims,
      (match) => {
        // Check if this is already inside a list by looking at previous content
        return `<ul>${match}</ul>`;
      }
    );

    // Then, handle ordered lists (numbered)
    content = content.replace(
      /(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/gims,
      (match) => {
        // Only convert to ol if it doesn't already start with ul
        if (!match.trim().startsWith("<ul>")) {
          return `<ol>${match}</ol>`;
        }
        return match;
      }
    );

    return content;
  }

  // Parse markdown tables
  parseTables(content) {
    const tableRegex =
      /^(?:\| (.+?) \|(?:\r?\n|$))+?\|? ?[-:|]+ ?\|(?:\r?\n)?((?:\| (.+?) \|(?:\r?\n|$))+)/gim;

    let match;
    while ((match = tableRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const headerLine = match[1].trim();
      const alignmentLine = match[2];
      const bodyLines = match[3];

      console.log("Found table:", {
        fullMatch,
        headerLine,
        alignmentLine,
        bodyLines,
      });

      // Parse header row
      const headers = this.parseTableRow(headerLine);

      // Parse body rows
      const rows = [];
      const bodyRowRegex = /\| (.+?) \|/g;
      let bodyMatch;
      while ((bodyMatch = bodyRowRegex.exec(bodyLines)) !== null) {
        const rowData = this.parseTableRow(bodyMatch[1]);
        if (rowData.length > 0) {
          rows.push(rowData);
        }
      }

      // Generate HTML table
      const tableHtml = this.generateTableHtml(headers, rows);

      // Replace the table in content
      content = content.replace(fullMatch, tableHtml);
    }

    return content;
  }

  // Parse a single table row
  parseTableRow(rowString) {
    return rowString
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0)
      .map((cell) => {
        // Process inline markdown in table cells
        cell = cell.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        cell = cell.replace(/\*([^*]+)\*/g, "<em>$1</em>");
        cell = cell.replace(/`([^`]+)`/g, "<code>$1</code>");
        return cell;
      });
  }

  // Generate HTML table from parsed data
  generateTableHtml(headers, rows) {
    let html = '<div class="table-container"><table class="lesson-table">';

    // Add header row
    if (headers.length > 0) {
      html += "<thead><tr>";
      headers.forEach((header) => {
        html += `<th>${header}</th>`;
      });
      html += "</tr></thead>";
    }

    // Add body rows
    if (rows.length > 0) {
      html += "<tbody>";
      rows.forEach((row) => {
        html += "<tr>";
        row.forEach((cell) => {
          html += `<td>${cell}</td>`;
        });
        html += "</tr>";
      });
      html += "</tbody>";
    }

    html += "</table></div>";
    return html;
  }

  // Escape HTML entities
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Get exercises for current lesson
  getExercises() {
    return this.exercises;
  }

  // Get current lesson info
  getCurrentLesson() {
    return this.currentLesson;
  }

  // Clear exercises (call when loading new lesson)
  clear() {
    this.exercises = [];
    this.currentLesson = "";
  }
}
