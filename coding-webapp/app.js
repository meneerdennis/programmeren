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
    console.log("Initializing CodingExercisesApp...");

    // Set timeout for lesson loading
    const loadingTimeout = setTimeout(() => {
      console.warn(
        "Lesson loading is taking too long, showing fallback content"
      );
      this.showFallbackContent();
    }, 5000); // 5 second timeout

    try {
      await this.setupEditor();
      await this.loadLesson();
      this.setupEventListeners();
      this.updateNavigationButtons();
      console.log("App initialized successfully");

      // Clear timeout if loading completed successfully
      clearTimeout(loadingTimeout);
    } catch (error) {
      console.error("Failed to initialize app:", error);
      clearTimeout(loadingTimeout);
      this.showError(
        "Failed to initialize the application. Please refresh the page."
      );
    }
  }

  // Show fallback content if loading fails
  showFallbackContent() {
    const lessonContentEl = document.getElementById("lesson-content");
    if (lessonContentEl) {
      lessonContentEl.innerHTML = `
        <h2>Getting Started</h2>
        <p>Welcome to the coding exercises platform!</p>
        
        <h3>Sample Exercises:</h3>
        
        <div class="in-browser-programming-exercise" data-exercise-id="fallback-hello">
          <h4>🎯 Print Hello World</h4>
          <p>Write a program that prints "Hello, World!"</p>
        </div>
        
        <div class="in-browser-programming-exercise" data-exercise-id="fallback-name">
          <h4>🎯 Print Your Name</h4>
          <p>Write a program that prints your name</p>
        </div>
        
        <div class="in-browser-programming-exercise" data-exercise-id="fallback-math">
          <h4>🎯 Simple Math</h4>
          <p>Calculate and print 15 + 27</p>
        </div>
      `;

      // Setup interactions for fallback exercises
      this.setupExerciseInteractions();
    }
  }

  // Show error message
  showError(message) {
    const lessonContent = document.getElementById("lesson-content");
    if (lessonContent) {
      lessonContent.innerHTML = `
        <div class="error-message" style="padding: 2rem; text-align: center; color: #dc3545;">
          <h2>⚠️ Error</h2>
          <p>${message}</p>
          <p><a href="simple-editor.html" style="color: #007bff;">Try the simple version instead</a></p>
        </div>
      `;
    }
  }

  // Setup Monaco Editor with fallback
  setupEditor() {
    return new Promise((resolve) => {
      // Clear any existing loading message
      const editorContainer = document.getElementById("code-editor");
      if (editorContainer) {
        editorContainer.innerHTML = "";
      }

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
    console.log("Loading lesson...");

    // Ensure course is loaded (only load once)
    if (this.courseManager.lessons.length === 0) {
      await this.courseManager.loadCourse();
    }

    const lesson = this.courseManager.getCurrentLesson();
    if (!lesson) {
      console.error("No lesson available");
      return;
    }

    console.log("Lesson loaded:", lesson.title);

    // Parse lesson content
    this.parser.clear();
    const parsedContent = this.parser.parse(lesson.content);

    console.log("Parsed content length:", parsedContent.length);
    console.log(
      "Number of exercises found:",
      this.parser.getExercises().length
    );

    // Display lesson content
    const lessonContentEl = document.getElementById("lesson-content");
    if (lessonContentEl) {
      lessonContentEl.innerHTML = parsedContent;
    }

    const lessonTitleEl = document.getElementById("lesson-title");
    if (lessonTitleEl) {
      lessonTitleEl.textContent = lesson.title;
    }

    // Setup exercise interactions
    this.setupExerciseInteractions();

    // Update progress
    this.updateProgress();

    console.log("Lesson loading completed");
  }

  // Setup exercise card interactions
  setupExerciseInteractions() {
    console.log("Setting up exercise interactions...");
    const exerciseCards = document.querySelectorAll(
      ".in-browser-programming-exercise"
    );

    console.log("Found exercise cards:", exerciseCards.length);

    exerciseCards.forEach((card, index) => {
      console.log(
        `Setting up exercise card ${index}:`,
        card.dataset.exerciseId
      );
      card.addEventListener("click", () => {
        const exerciseId = card.dataset.exerciseId;
        console.log("Exercise card clicked:", exerciseId);
        this.openExercise(exerciseId);
      });
    });

    // Also setup interactions for all exercises data
    const exercises = this.parser.getExercises();
    console.log("Total exercises in parser:", exercises.length);
  }

  // Open exercise in editor
  openExercise(exerciseId) {
    console.log("Opening exercise:", exerciseId);

    // Check for fallback exercises first
    if (exerciseId.startsWith("fallback-")) {
      this.openFallbackExercise(exerciseId);
      return;
    }

    const exercises = this.parser.getExercises();
    console.log("Available exercises:", exercises.length);

    const exercise = exercises.find((ex) => ex.id === exerciseId);

    if (!exercise) {
      console.error("Exercise not found:", exerciseId);
      console.log("Available exercises:", exercises);
      return;
    }

    console.log("Exercise found:", exercise.name);
    this.currentExercise = exercise;

    // Update exercise panel
    const exerciseTitleEl = document.getElementById("exercise-title");
    const exercisePanelEl = document.getElementById("exercise-panel");

    if (exerciseTitleEl) {
      exerciseTitleEl.textContent = exercise.name;
    }
    if (exercisePanelEl) {
      exercisePanelEl.style.display = "block";
    }

    // Set editor language (only for Monaco editor)
    if (this.setEditorLanguage) {
      this.setEditorLanguage(exercise.language);
    }

    // Extract starter code from exercise content
    const starterCode = this.extractStarterCode(exercise.content);
    console.log("Starter code:", starterCode);
    this.editor.setValue(starterCode);

    // Enable editor and buttons
    this.enableEditor();

    // Show expected output if available
    const expectedOutput = this.extractExpectedOutput(exercise.content);
    const expectedOutputEl = document.getElementById("expected-output");
    if (expectedOutputEl) {
      expectedOutputEl.textContent =
        expectedOutput || "No expected output specified";
    }

    // Focus editor
    this.editor.focus();

    this.clearOutput();
    console.log("Exercise opened successfully");
  }

  // Open fallback exercise
  openFallbackExercise(exerciseId) {
    const fallbackExercises = {
      "fallback-hello": {
        name: "Print Hello World",
        language: "python",
        starterCode: 'print("Hello, World!")',
        expectedOutput: "Hello, World!",
      },
      "fallback-name": {
        name: "Print Your Name",
        language: "python",
        starterCode: 'print("Your Name")',
        expectedOutput: "Your Name",
      },
      "fallback-math": {
        name: "Simple Math",
        language: "python",
        starterCode: "print(15 + 27)",
        expectedOutput: "42",
      },
    };

    const exercise = fallbackExercises[exerciseId];
    if (!exercise) return;

    console.log("Opening fallback exercise:", exercise.name);
    this.currentExercise = {
      id: exerciseId,
      name: exercise.name,
      language: exercise.language,
      content: "",
    };

    // Update exercise panel
    const exerciseTitleEl = document.getElementById("exercise-title");
    const exercisePanelEl = document.getElementById("exercise-panel");

    if (exerciseTitleEl) {
      exerciseTitleEl.textContent = exercise.name;
    }
    if (exercisePanelEl) {
      exercisePanelEl.style.display = "block";
    }

    // Set editor language
    if (this.setEditorLanguage) {
      this.setEditorLanguage(exercise.language);
    }

    // Set starter code
    this.editor.setValue(exercise.starterCode);

    // Enable editor and buttons
    this.enableEditor();

    // Show expected output
    const expectedOutputEl = document.getElementById("expected-output");
    if (expectedOutputEl) {
      expectedOutputEl.textContent = exercise.expectedOutput;
    }

    // Focus editor
    this.editor.focus();

    this.clearOutput();
  }

  // Enable editor and buttons
  enableEditor() {
    const editorElement =
      document.querySelector("#code-editor textarea") ||
      document.querySelector("#code-editor");
    const runBtn = document.getElementById("run-code");
    const checkBtn = document.getElementById("check-exercise");

    if (editorElement) {
      editorElement.disabled = false;
      if (editorElement.tagName === "TEXTAREA") {
        editorElement.placeholder = "Write your code here...";
      }
    }

    if (runBtn) runBtn.disabled = false;
    if (checkBtn) checkBtn.disabled = false;
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
    const counterEl = document.getElementById("lesson-counter");

    prevBtn.disabled = !this.courseManager.canGoPrevious();
    nextBtn.disabled = !this.courseManager.canGoNext();

    // Update lesson counter
    if (counterEl) {
      const current = this.courseManager.currentLessonIndex + 1;
      const total = this.courseManager.lessons.length;
      counterEl.textContent = `(${current}/${total})`;
    }

    // Debug: log current state
    console.log("Navigation state:", {
      canGoPrevious: this.courseManager.canGoPrevious(),
      canGoNext: this.courseManager.canGoNext(),
      currentIndex: this.courseManager.currentLessonIndex,
      totalLessons: this.courseManager.lessons.length,
      lessons: this.courseManager.lessons.map((l) => ({
        title: l.title,
        id: l.id,
      })),
    });
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
