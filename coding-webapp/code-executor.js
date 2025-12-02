// Code Executor for Multiple Programming Languages
class CodeExecutor {
  constructor() {
    this.pyodide = null;
    this.initPyodide();
  }

  // Initialize Pyodide for Python execution
  async initPyodide() {
    try {
      // Load Pyodide with proper configuration
      this.pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });
      console.log("Pyodide loaded successfully");
    } catch (error) {
      console.error("Failed to load Pyodide:", error);
      // Fallback for demo purposes
      this.pyodide = null;
    }
  }

  // Execute code based on language
  async execute(code, language, expectedOutput = "") {
    try {
      switch (language) {
        case "python":
          return await this.executePython(code);
        case "javascript":
          return await this.executeJavaScript(code);
        case "html":
          return await this.executeHTML(code);
        case "css":
          return this.executeCSS(code);
        default:
          throw new Error(`Unsupported language: ${language}`);
      }
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.message,
      };
    }
  }

  // Execute Python code using Pyodide
  async executePython(code) {
    if (!this.pyodide) {
      await this.initPyodide();
    }

    try {
      // Capture print output
      const wrappedCode = `
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()

try:
    ${code}
finally:
    sys.stdout = old_stdout

captured_output.getvalue()
            `;

      const result = this.pyodide.runPython(wrappedCode);
      return {
        success: true,
        output: result,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.toString(),
      };
    }
  }

  // Execute JavaScript code
  async executeJavaScript(code) {
    try {
      // Create a safe execution context
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const script = `
                try {
                    let output = '';
                    const originalLog = console.log;
                    console.log = function(...args) {
                        output += args.join(' ') + '\\n';
                        originalLog.apply(console, args);
                    };
                    
                    ${code}
                    
                    return output || 'Code executed successfully (no output)';
                } catch (error) {
                    return 'Error: ' + error.message;
                }
            `;

      const result = iframe.contentWindow.eval(script);
      document.body.removeChild(iframe);

      return {
        success: true,
        output: result,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.message,
      };
    }
  }

  // Execute HTML code
  async executeHTML(code) {
    try {
      // Create a temporary container to test HTML validity
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = code;

      // Check for basic HTML validity
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        `<html><body>${code}</body></html>`,
        "text/html"
      );

      const errors = [];

      // Check for unclosed tags (basic check)
      const openTags = [];
      const tags = code.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g) || [];

      for (const tag of tags) {
        const tagName = tag.match(/<([a-zA-Z][a-zA-Z0-9]*)/)?.[1];
        if (!tagName) continue;

        if (tag.startsWith("</")) {
          // Closing tag
          const expectedOpenTag = openTags.pop();
          if (expectedOpenTag !== tagName) {
            errors.push(`Mismatched closing tag: ${tag}`);
          }
        } else if (!tag.endsWith("/>") && !this.isSelfClosing(tagName)) {
          // Opening tag
          openTags.push(tagName);
        }
      }

      if (openTags.length > 0) {
        errors.push(`Unclosed tags: ${openTags.join(", ")}`);
      }

      if (errors.length > 0) {
        return {
          success: false,
          output: "",
          error: errors.join("; "),
        };
      }

      return {
        success: true,
        output: "HTML structure is valid",
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.message,
      };
    }
  }

  // Execute CSS code (syntax validation)
  executeCSS(code) {
    try {
      // Create a temporary style element to test CSS
      const style = document.createElement("style");
      style.textContent = code;
      document.head.appendChild(style);

      // Check for basic CSS syntax errors
      const errors = [];
      const lines = code.split("\n");

      lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("/*") || trimmed.startsWith("//"))
          return;

        // Check for missing semicolons (except last property)
        if (trimmed.includes("{") && !trimmed.includes("}")) {
          // Check previous lines for properties without semicolons
          let propertyCount = 0;
          let braceCount = 0;
          for (let i = index; i < lines.length; i++) {
            const l = lines[i].trim();
            if (l.includes("{")) braceCount++;
            if (l.includes("}")) braceCount--;

            if (
              braceCount > 0 &&
              l.includes(":") &&
              !l.includes(";") &&
              !l.includes("{") &&
              !l.includes("}")
            ) {
              propertyCount++;
            }

            if (braceCount === 0) break;
          }

          if (propertyCount > 0) {
            errors.push(
              `Line ${index + 1}: Missing semicolons in CSS properties`
            );
          }
        }
      });

      document.head.removeChild(style);

      if (errors.length > 0) {
        return {
          success: false,
          output: "",
          error: errors.join("; "),
        };
      }

      return {
        success: true,
        output: "CSS syntax is valid",
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.message,
      };
    }
  }

  // Check if tag is self-closing
  isSelfClosing(tagName) {
    const selfClosingTags = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];
    return selfClosingTags.includes(tagName.toLowerCase());
  }

  // Compare output with expected output
  compareOutputs(actualOutput, expectedOutput, language) {
    if (!expectedOutput) return true;

    // Normalize outputs for comparison
    const normalize = (output) => {
      return output
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/[ \t]+$/gm, "")
        .toLowerCase();
    };

    const normalizedActual = normalize(actualOutput);
    const normalizedExpected = normalize(expectedOutput);

    return normalizedActual === normalizedExpected;
  }

  // Format output for display
  formatOutput(result) {
    if (result.success) {
      return {
        className: "success",
        text: result.output || "Code executed successfully",
      };
    } else {
      return {
        className: "error",
        text: `Error: ${result.error}`,
      };
    }
  }
}
