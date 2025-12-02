// Main Application Controller
class CodingExercisesApp {
  constructor() {
    this.parser = new MarkdownParser();
    this.executor = new CodeExecutor();
    this.courseManager = new CourseManager();
    this.editor = null;
    this.currentExercise = null;

    this.init();
  }

  // Initialize the application
  async init() {
    await this.setupEditor();
    await this.loadLesson();
    this.setupEventListeners();
    this.updateNavigationButtons();
  }

  // Setup Monaco Editor with fallback
  setupEditor() {
    return new Promise((resolve) => {
      // Try Monaco Editor first
      require.config({
        paths: {
          vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
        },
      });

      require(["vs/editor/editor.main"], () => {
        try {
          this.editor = monaco.editor.create(
            document.getElementById("code-editor"),
            {
              value: "",
              language: "javascript",
              theme: "vs-light",
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: "on",
              wordWrap: "on",
            }
          );

          // Handle editor changes
          this.editor.onDidChangeModelContent(() => {
            this.clearOutput();
          });

          console.log("Monaco Editor loaded successfully");
          resolve();
        } catch (error) {
          console.error("Monaco Editor failed, using fallback:", error);
          this.setupFallbackEditor();
          resolve();
        }
      }, (error) => {
        console.error("Failed to load Monaco Editor:", error);
        this.setupFallbackEditor();
        resolve();
      });
    });
  }

  // Fallback to simple textarea editor
  setupFallbackEditor() {
    const editorContainer = document.getElementById("code-editor");

    // Replace Monaco editor div with textarea
    editorContainer.innerHTML = `
      <textarea 
        id="fallback-editor" 
        style="width: 100%; height: 300px; font-family: 'Courier New', monospace; font-size: 14px; padding: 10px; border: 1px solid #ccc; border-radius: 5px; resize: vertical; background: #f8f9fa;"
        placeholder="Select an exercise to start coding..."
        disabled
      ></textarea>
    `;

    // Create simple editor interface
    this.editor = {
      getValue: () => document.getElementById("fallback-editor").value,
      setValue: (value) =>
        (document.getElementById("fallback-editor").value = value),
      focus: () => document.getElementById("fallback-editor").focus(),
      getModel: () => ({ getLanguageId: () => "plaintext" }),
      dispose: () => {},
    };

    // Handle editor changes
    document.getElementById("fallback-editor").addEventListener("input", () => {
      this.clearOutput();
    });

    console.log("Using fallback textarea editor");
  }

  // Load current lesson
  async loadLesson() {
    const lesson = this.courseManager.getCurrentLesson();
    if (!lesson) return;

    // Parse lesson content
    this.parser.clear();
    const parsedContent = this.parser.parse(lesson.content);

    // Display lesson content
    document.getElementById("lesson-content").innerHTML = parsedContent;
    document.getElementById("lesson-title").textContent = lesson.title;

    // Setup exercise interactions
    this.setupExerciseInteractions();

    // Update progress
    this.updateProgress();
  }

  // Setup exercise card interactions
  setupExerciseInteractions() {
    const exerciseCards = document.querySelectorAll(
      ".in-browser-programming-exercise"
    );

    exerciseCards.forEach((card) => {
      card.addEventListener("click", () => {
        const exerciseId = card.dataset.exerciseId;
        this.openExercise(exerciseId);
      });
    });
  }

  // Open exercise in editor
  openExercise(exerciseId) {
    const exercises = this.parser.getExercises();
    const exercise = exercises.find((ex) => ex.id === exerciseId);

    if (!exercise) return;

    this.currentExercise = exercise;

    // Update exercise panel
    document.getElementById("exercise-title").textContent = exercise.name;
    document.getElementById("exercise-panel").style.display = "block";

    // Set editor language (only for Monaco editor)
    if (this.setEditorLanguage) {
      this.setEditorLanguage(exercise.language);
    }

    // Extract starter code from exercise content
    const starterCode = this.extractStarterCode(exercise.content);
    this.editor.setValue(starterCode);

    // Enable editor
    const editorElement =
      document.querySelector("#code-editor textarea") ||
      document.querySelector("#code-editor");
    if (editorElement) {
      editorElement.disabled = false;
      if (editorElement.tagName === "TEXTAREA") {
        editorElement.placeholder = "Write your code here...";
      }
    }

    // Show expected output if available
    const expectedOutput = this.extractExpectedOutput(exercise.content);
    document.getElementById("expected-output").textContent =
      expectedOutput || "No expected output specified";

    // Focus editor
    this.editor.focus();

    this.clearOutput();
  }

  // Extract starter code from exercise content
  extractStarterCode(content) {
    // Look for code blocks in the exercise content
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const matches = content.match(codeBlockRegex);

    if (matches) {
      // Return the first code block found
      const match = matches[0];
      const codeMatch = match.match(/```(?:\w+)?\n([\s\S]*?)```/);
      if (codeMatch) {
        return codeMatch[1].trim();
      }
    }

    return "";
  }

  // Extract expected output from exercise content
  extractExpectedOutput(content) {
    // Look for sample-output blocks after the exercise
    const sampleOutputRegex = /<sample-output>([\s\S]*?)<\/sample-output>/g;
    let match;

    // Find the first sample-output block that comes after exercise content
    while ((match = sampleOutputRegex.exec(content)) !== null) {
      return match[1].trim();
    }

    return "";
  }

  // Set editor language based on exercise type
  setEditorLanguage(language) {
    // Only apply language for Monaco editor
    if (typeof monaco !== "undefined" && this.editor.getModel) {
      let monacoLanguage = "javascript";

      switch (language) {
        case "python":
          monacoLanguage = "python";
          break;
        case "html":
          monacoLanguage = "html";
          break;
        case "css":
          monacoLanguage = "css";
          break;
        case "javascript":
        default:
          monacoLanguage = "javascript";
          break;
      }

      const model = this.editor.getModel();
      monaco.editor.setModelLanguage(model, monacoLanguage);
    }
    // For fallback editor, language doesn't matter as it's just a textarea
  }

  // Setup event listeners
  setupEventListeners() {
    // Navigation buttons
    document.getElementById("next-lesson").addEventListener("click", () => {
      if (this.courseManager.nextLesson()) {
        this.loadLesson();
        this.updateNavigationButtons();
      }
    });

    document.getElementById("prev-lesson").addEventListener("click", () => {
      if (this.courseManager.previousLesson()) {
        this.loadLesson();
        this.updateNavigationButtons();
      }
    });

    // Code execution buttons
    document.getElementById("run-code").addEventListener("click", () => {
      this.runCode();
    });

    document.getElementById("check-exercise").addEventListener("click", () => {
      this.checkExercise();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "Enter") {
          e.preventDefault();
          this.runCode();
        } else if (e.key === "s") {
          e.preventDefault();
          this.checkExercise();
        }
      }
    });
  }

  // Run code
  async runCode() {
    if (!this.currentExercise) {
      this.showOutput("error", "Please select an exercise first");
      return;
    }

    const code = this.editor.getValue();
    const language = this.currentExercise.language;

    this.showOutput("loading", "Running code...");

    try {
      const result = await this.executor.execute(code, language);
      const formatted = this.executor.formatOutput(result);
      this.showOutput(formatted.className, formatted.text);
    } catch (error) {
      this.showOutput("error", `Execution failed: ${error.message}`);
    }
  }

  // Check exercise solution
  async checkExercise() {
    if (!this.currentExercise) {
      this.showOutput("error", "Please select an exercise first");
      return;
    }

    const code = this.editor.getValue();
    const language = this.currentExercise.language;
    const expectedOutput = this.extractExpectedOutput(
      this.currentExercise.content
    );

    this.showOutput("loading", "Checking solution...");

    try {
      const result = await this.executor.execute(code, language);

      if (!result.success) {
        this.showOutput("error", `Code failed to run: ${result.error}`);
        return;
      }

      // Compare outputs
      const isCorrect = this.executor.compareOutputs(
        result.output,
        expectedOutput,
        language
      );

      if (isCorrect) {
        this.showOutput("success", "🎉 Correct! Well done!");
        this.courseManager.markExerciseCompleted(this.currentExercise.id);
        this.updateProgress();

        // Mark exercise as completed in UI
        this.markExerciseAsCompleted(this.currentExercise.id);
      } else {
        this.showOutput(
          "error",
          `❌ Output doesn't match expected result.\n\nExpected:\n${expectedOutput}\n\nYour output:\n${result.output}`
        );
      }
    } catch (error) {
      this.showOutput("error", `Checking failed: ${error.message}`);
    }
  }

  // Mark exercise as completed in UI
  markExerciseAsCompleted(exerciseId) {
    const exerciseCard = document.querySelector(
      `[data-exercise-id="${exerciseId}"]`
    );
    if (exerciseCard) {
      exerciseCard.style.opacity = "0.6";
      exerciseCard.style.borderColor = "#28a745";
      exerciseCard.innerHTML += " ✅";
    }
  }

  // Show output in the output panel
  showOutput(type, message) {
    const outputElement = document.getElementById("exercise-output");
    outputElement.className = `output-box ${type}`;
    outputElement.textContent = message;
  }

  // Clear output
  clearOutput() {
    const outputElement = document.getElementById("exercise-output");
    outputElement.className = "output-box";
    outputElement.textContent = "";
  }

  // Update navigation buttons state
  updateNavigationButtons() {
    const prevBtn = document.getElementById("prev-lesson");
    const nextBtn = document.getElementById("next-lesson");

    prevBtn.disabled = !this.courseManager.canGoPrevious();
    nextBtn.disabled = !this.courseManager.canGoNext();
  }

  // Update progress display
  updateProgress() {
    const stats = this.courseManager.getStats();
    // You could add a progress bar or indicator here
    console.log("Course progress:", stats);
  }

  // Export progress
  exportProgress() {
    const data = this.courseManager.exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "course-progress.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  // Search functionality
  search(query) {
    const results = this.courseManager.searchLessons(query);
    return results;
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new CodingExercisesApp();
});
