// Main Application Controller
class CodingExercisesApp {
  constructor() {
    this.parser = new MarkdownParser();
    this.executor = new CodeExecutor();
    this.courseManager = new CourseManager();
    this.editor = null;
    this.currentExercise = null;
    this.availableCourses = [];
    this.currentCourseId = null;

    this.init();
  }

  // Initialize the application
  async init() {
    console.log("Initializing CodingExercisesApp...");

    try {
      await this.setupEditor();
      await this.loadAvailableCourses();
      this.setupEventListeners();
      this.addHomeButton();

      // Initialize current course (will check localStorage for saved selection)
      await this.initializeCurrentCourse();

      console.log("App initialized successfully");
    } catch (error) {
      console.error("Failed to initialize app:", error);
      this.showError(
        "Failed to initialize the application. Please refresh the page."
      );
    }
  }

  // Load all available courses
  async loadAvailableCourses() {
    console.log("Starting to load available courses...");

    // Always set fallback data immediately to ensure sidebar renders
    this.availableCourses = [
      {
        id: "html-css",
        manifest: {
          course: {
            id: "html-css",
            title: "HTML & CSS",
            description: "Build beautiful web pages with HTML and CSS",
            language: "html",
            difficulty: "beginner",
            icon: "🎨",
          },
        },
      },
      {
        id: "python",
        manifest: {
          course: {
            id: "python",
            title: "Python Programming",
            description: "Learn Python from scratch with interactive exercises",
            language: "python",
            difficulty: "intermediate",
            icon: "🐍",
          },
        },
      },
    ];

    console.log(
      "Available courses set to fallback data:",
      this.availableCourses
    );

    // Render sidebar immediately with fallback data
    this.renderSidebar();

    // Then try to enhance with actual manifest data
    try {
      const knownCourses = ["html-css", "python"]; // Maintain consistent order
      const enhancedCoursesMap = new Map(); // Use map to preserve order

      for (const courseId of knownCourses) {
        const fallback = this.availableCourses.find((c) => c.id === courseId);
        if (fallback) {
          enhancedCoursesMap.set(courseId, fallback);
        }
      }

      // Load manifests and update without changing order
      for (const courseId of knownCourses) {
        try {
          console.log(`Attempting to load manifest for course: ${courseId}`);
          const response = await fetch(
            `course-content/courses/${courseId}/manifest.json`
          );
          console.log(`Response status for ${courseId}:`, response.status);

          if (response.ok) {
            const manifest = await response.json();
            console.log(
              `Successfully loaded manifest for ${courseId}:`,
              manifest
            );
            enhancedCoursesMap.set(courseId, {
              id: courseId,
              manifest: manifest,
            });
          } else {
            console.warn(
              `Failed to load manifest for ${courseId}:`,
              response.status,
              response.statusText
            );
          }
        } catch (error) {
          console.warn(`Error loading manifest for ${courseId}:`, error);
        }
      }

      // Convert back to array maintaining order
      const enhancedCourses = Array.from(enhancedCoursesMap.values());

      // Update courses if we got better data
      if (enhancedCourses.length > 0) {
        this.availableCourses = enhancedCourses;
        console.log(
          "Updated courses with manifest data:",
          this.availableCourses
        );
        this.renderSidebar();
      }
    } catch (error) {
      console.error("Failed to enhance courses with manifest data:", error);
      // Keep fallback data
    }
  }

  // Render the sidebar with course navigation
  renderSidebar() {
    const sidebarContent = document.getElementById("sidebar-content");
    if (!sidebarContent) return;

    let html = "";

    for (const courseData of this.availableCourses) {
      const course = courseData.manifest.course;
      const isActive = this.currentCourseId === courseData.id;

      html += `
        <div class="sidebar-course">
          <div class="sidebar-course-header ${isActive ? "active" : ""}" 
               data-course-id="${courseData.id}">
            <span class="sidebar-course-icon">${course.icon}</span>
            <span class="sidebar-course-title">${course.title}</span>
            <span class="sidebar-course-status">${course.difficulty}</span>
          </div>
          <div class="sidebar-lessons" id="lessons-${courseData.id}" style="${
        isActive ? "" : "display: none;"
      }">
          </div>
        </div>
      `;
    }

    sidebarContent.innerHTML = html;

    // Add event listeners to course headers
    document.querySelectorAll(".sidebar-course-header").forEach((header) => {
      header.addEventListener("click", (e) => {
        const courseId = header.dataset.courseId;
        this.switchCourse(courseId);
      });
    });

    // Render lessons for current course
    if (this.currentCourseId) {
      this.renderLessonsForCurrentCourse();
    }
  }

  // Render lessons for the current course
  renderLessonsForCurrentCourse() {
    const lessonsContainer = document.getElementById(
      `lessons-${this.currentCourseId}`
    );
    if (!lessonsContainer || !this.courseManager.lessons.length) return;

    let html = "";

    this.courseManager.lessons.forEach((lesson, index) => {
      const isActive = this.courseManager.currentLessonIndex === index;
      const isCompleted = this.courseManager.isExerciseCompleted(lesson.id);

      html += `
        <div class="sidebar-lesson ${isActive ? "active" : ""} ${
        isCompleted ? "completed" : ""
      }" 
             data-lesson-index="${index}">
          <div class="sidebar-lesson-number">${index + 1}</div>
          <div class="sidebar-lesson-title">${lesson.title}</div>
          ${isCompleted ? '<div class="sidebar-lesson-check">✓</div>' : ""}
        </div>
      `;
    });

    lessonsContainer.innerHTML = html;

    // Add event listeners to lesson items
    document
      .querySelectorAll(`#lessons-${this.currentCourseId} .sidebar-lesson`)
      .forEach((lesson) => {
        lesson.addEventListener("click", (e) => {
          const lessonIndex = parseInt(lesson.dataset.lessonIndex);
          this.switchToLesson(lessonIndex);
        });
      });
  }

  // Switch to a different course
  async switchCourse(courseId) {
    if (this.currentCourseId === courseId) return;

    console.log("Switching to course:", courseId);
    this.currentCourseId = courseId;
    localStorage.setItem("selectedCourse", courseId);

    // Update UI immediately
    this.renderSidebar();

    // Reset course manager and load new course
    this.courseManager.setCourse(courseId);
    this.courseManager.currentLessonIndex = 0; // Reset to first lesson

    try {
      await this.courseManager.loadCourse();
      await this.loadLesson();
      this.updateNavigationButtons();
      this.renderLessonsForCurrentCourse();
    } catch (error) {
      console.error("Failed to load course:", error);
      this.showFallbackContent();
    }
  }

  // Switch to a specific lesson
  switchToLesson(lessonIndex) {
    if (lessonIndex === this.courseManager.currentLessonIndex) return;

    console.log("Switching to lesson:", lessonIndex);
    this.courseManager.currentLessonIndex = lessonIndex;
    this.loadLesson();
    this.updateNavigationButtons(); // Update arrow button states
    this.renderLessonsForCurrentCourse(); // Update sidebar selection
  }

  // Initialize current course
  async initializeCurrentCourse() {
    const selectedCourse = localStorage.getItem("selectedCourse") || "python";
    this.currentCourseId = selectedCourse;
    this.courseManager.setCourse(selectedCourse);

    console.log("Initializing current course:", selectedCourse);

    // Ensure sidebar shows the current course as active
    this.renderSidebar();

    try {
      await this.courseManager.loadCourse();
      await this.loadLesson();
      this.updateNavigationButtons();
      this.renderLessonsForCurrentCourse();
    } catch (error) {
      console.error("Failed to initialize current course:", error);
      this.showFallbackContent();
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
              value: "# Python editor: test hier je code",
              language: "python",
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
        placeholder="# Python editor: test hier je code"
      ></textarea>
    `;

    // Create simple editor interface
    this.editor = {
      getValue: () => document.getElementById("fallback-editor").value,
      setValue: (value) =>
        (document.getElementById("fallback-editor").value = value),
      focus: () => document.getElementById("fallback-editor").focus(),
      getModel: () => ({ getLanguageId: () => "python" }),
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
    console.log("Exercise language:", exercise.language);
    console.log("Exercise content:", exercise.content);
    console.log("Exercise expectedOutput:", exercise.expectedOutput);
    this.currentExercise = exercise;

    // Update exercise panel
    const exerciseTitleEl = document.getElementById("exercise-title");

    if (exerciseTitleEl) {
      exerciseTitleEl.textContent = exercise.name;
    }
    // Exercise panel is always visible now

    // Set editor language (only for Monaco editor)
    if (this.setEditorLanguage) {
      this.setEditorLanguage(exercise.language);
    }

    // Extract starter code from exercise content
    const starterCode = this.extractStarterCode(exercise.content);
    console.log("Starter code extracted:", starterCode);

    // Use exercise content as a helpful hint, or starter code if available
    let editorContent = "";
    if (starterCode) {
      editorContent = starterCode;
      console.log("Using starter code:", starterCode);
    } else if (exercise.content && exercise.content.trim()) {
      // Use clean content as a comment/instruction
      const hintText = exercise.content.replace(/\n/g, " ").substring(0, 100);
      editorContent = `# ${hintText}\n# Write your code below:\n`;
      console.log("Using content as hint:", editorContent);
    } else {
      editorContent = "";
      console.log("Empty editor content");
    }

    this.editor.setValue(editorContent);

    // Enable editor and buttons
    this.enableEditor();

    // Show expected output if available
    const expectedOutputEl = document.getElementById("expected-output");
    if (expectedOutputEl) {
      console.log("Displaying expected output:", exercise.expectedOutput);
      expectedOutputEl.textContent =
        exercise.expectedOutput || "No expected output specified";
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

    if (exerciseTitleEl) {
      exerciseTitleEl.textContent = exercise.name;
    }
    // Exercise panel is always visible now

    // Set editor language
    if (this.setEditorLanguage) {
      this.setEditorLanguage(exercise.language);
    }

    // Set editor content (same logic as regular exercises)
    let editorContent = exercise.starterCode || "";
    this.editor.setValue(editorContent);

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

    // Editor is already enabled by default now
    // This method can be used for any additional setup if needed
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
        this.renderLessonsForCurrentCourse(); // Update sidebar selection
      }
    });

    document.getElementById("prev-lesson").addEventListener("click", () => {
      if (this.courseManager.previousLesson()) {
        this.loadLesson();
        this.updateNavigationButtons();
        this.renderLessonsForCurrentCourse(); // Update sidebar selection
      }
    });

    // Code execution buttons
    document.getElementById("run-code").addEventListener("click", () => {
      this.runCode();
    });

    document.getElementById("check-exercise").addEventListener("click", () => {
      this.checkExercise();
    });

    // Setup resize functionality
    this.setupResizeHandle();

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

  // Setup resize handle functionality
  setupResizeHandle() {
    // Setup main content resize only
    const resizeHandle = document.getElementById("resize-handle");
    const contentArea = document.querySelector(".content-area");
    const exercisePanel = document.querySelector(".exercise-panel");

    if (!resizeHandle || !contentArea || !exercisePanel) return;

    let isResizing = false;
    let startX = 0;
    let startContentWidth = 0;
    let startPanelWidth = 0;

    const minContentWidth = 200;
    const minPanelWidth = 300;
    const maxPanelWidth = 800;

    const onMouseDown = (e) => {
      isResizing = true;
      startX = e.clientX;
      startContentWidth = contentArea.getBoundingClientRect().width;
      startPanelWidth = exercisePanel.getBoundingClientRect().width;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      resizeHandle.style.background = "#a0a0a0";
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    };

    const onMouseMove = (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - startX;
      const newContentWidth = startContentWidth + deltaX;
      const newPanelWidth = startPanelWidth - deltaX;

      // Apply constraints
      if (
        newContentWidth >= minContentWidth &&
        newPanelWidth >= minPanelWidth &&
        newPanelWidth <= maxPanelWidth
      ) {
        contentArea.style.flexBasis = `${newContentWidth}px`;
        exercisePanel.style.width = `${newPanelWidth}px`;

        // Trigger resize for Monaco editor if it exists
        if (this.editor && typeof this.editor.layout === "function") {
          setTimeout(() => this.editor.layout(), 0);
        }
      }
    };

    const onMouseUp = () => {
      isResizing = false;

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);

      resizeHandle.style.background = "";
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    // Set initial widths
    exercisePanel.style.width = "400px";

    // Add event listeners
    resizeHandle.addEventListener("mousedown", onMouseDown);
  }

  // Run code
  async runCode() {
    const code = this.editor.getValue();
    let language = "python"; // Default to Python

    // If there's a current exercise, use its language
    if (this.currentExercise) {
      language = this.currentExercise.language;
    }

    console.log("Running code:", { code, language });

    this.showOutput("loading", "Running code...");

    try {
      const result = await this.executor.execute(code, language);
      const formatted = this.executor.formatOutput(result);
      console.log("Execution result:", result);

      // If code executed successfully but produced no output, give helpful feedback
      if (result.success && !result.output.trim()) {
        if (language === "python") {
          this.showOutput(
            "error",
            "Your code ran successfully but produced no output. Make sure you're using print() statements."
          );
        } else {
          this.showOutput("success", "Code executed successfully (no output)");
        }
      } else {
        this.showOutput(formatted.className, formatted.text);
      }
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
    const expectedOutput = this.currentExercise.expectedOutput || "";

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

  // Add home button to navigation
  addHomeButton() {
    const header = document.querySelector(".app-header");
    if (!header) return;

    const homeButton = document.createElement("button");
    homeButton.id = "home-btn";
    homeButton.className = "home-btn";
    homeButton.innerHTML = "🏠 Home";
    homeButton.style.cssText = `
      background: #6c757d;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 1rem;
      font-size: 0.9rem;
    `;

    homeButton.addEventListener("click", () => {
      // Clear selected course
      localStorage.removeItem("selectedCourse");
      // Redirect to home
      window.location.href = "home.html";
    });

    // Insert at the beginning of the nav
    const nav = header.querySelector(".course-nav");
    if (nav) {
      nav.insertBefore(homeButton, nav.firstChild);
    }
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new CodingExercisesApp();
});
