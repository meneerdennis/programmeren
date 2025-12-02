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

    // Parse sample-output tags
    content = content.replace(
      /<sample-output>/g,
      '<div class="sample-output">'
    );
    content = content.replace(/<\/sample-output>/g, "</div>");

    // Parse in-browser-programming-exercise tags
    content = this.parseExerciseTags(content);

    return content;
  }

  // Parse exercise tags and extract their content
  parseExerciseTags(content) {
    const exerciseRegex =
      /<in-browser-programming-exercise([^>]*)>([\s\S]*?)<\/in-browser-programming-exercise>/g;
    let match;

    while ((match = exerciseRegex.exec(content)) !== null) {
      const attributes = this.parseAttributes(match[1]);
      const exerciseContent = match[2].trim();
      const exerciseId = `exercise-${this.exercises.length}`;

      // Store exercise data
      this.exercises.push({
        id: exerciseId,
        name: attributes.name || "Untitled Exercise",
        tmcname: attributes.tmcname || "",
        content: exerciseContent,
        language: this.detectLanguage(exerciseContent),
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
    // Simple language detection based on code patterns
    if (
      content.includes("print(") ||
      content.includes("def ") ||
      content.includes("import ")
    ) {
      return "python";
    } else if (content.includes("<") && content.includes(">")) {
      return "html";
    } else if (
      content.includes("{") &&
      content.includes("}") &&
      content.includes(";")
    ) {
      return "javascript";
    } else if (
      content.includes("margin") ||
      content.includes("padding") ||
      content.includes("color")
    ) {
      return "css";
    }

    return "javascript"; // default
  }

  // Basic markdown parsing
  parseMarkdown(content) {
    // Headers
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

    // Paragraphs
    content = content.replace(/^(?!<[h|u|l|d|p])(.+)$/gim, "<p>$1</p>");

    return content;
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
