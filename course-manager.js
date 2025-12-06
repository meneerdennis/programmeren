// Course Manager for handling lessons and progress
class CourseManager {
  constructor() {
    this.lessons = [];
    this.currentLessonIndex = 0;
    this.progress = this.loadProgress();
    this.courseId = null;
    this.courseManifest = null;
    this.currentChunkIndex = 0; // Track current chunk within lesson
  }

  // Set the course to load
  setCourse(courseId) {
    this.courseId = courseId;
    console.log("Course set to:", courseId);
  }

  // Load course content from organized directory structure
  async loadCourse() {
    if (!this.courseId) {
      console.error("No course ID set");
      return false;
    }

    try {
      // Load lesson list from course-specific manifest file
      let lessonFiles = [];
      try {
        const manifestResponse = await fetch(
          `course-content/courses/${this.courseId}/manifest.json`
        );
        if (manifestResponse.ok) {
          this.courseManifest = await manifestResponse.json();
          lessonFiles = this.courseManifest.lessons.map(
            (file) => `course-content/courses/${this.courseId}/${file}`
          );
          console.log("Loaded lessons from manifest:", lessonFiles);
        } else {
          throw new Error(
            `Failed to load manifest for course ${this.courseId}`
          );
        }
      } catch (manifestError) {
        console.warn(
          `Could not load manifest for course ${this.courseId}, using fallback list:`,
          manifestError
        );
      }

      // Fallback to hardcoded list if manifest fails
      if (lessonFiles.length === 0) {
        if (this.courseId === "python") {
          lessonFiles = [
            `course-content/courses/python/1-getting-started.md`,
            `course-content/courses/python/2-information-from-the-user.md`,
            `course-content/courses/python/3-more-about-variables.md`,
            `course-content/courses/python/4-arithmetic-operations.md`,
            `course-content/courses/python/5-conditional-statements.md`,
          ];
        } else {
          lessonFiles = [
            `course-content/courses/${this.courseId}/1-introduction.md`,
          ];
        }
      }

      this.lessons = [];

      for (const filePath of lessonFiles) {
        try {
          console.log(`Attempting to load: ${filePath}`);
          const response = await fetch(filePath);
          console.log(
            `Response for ${filePath}: ${response.status} ${response.statusText}`
          );

          if (response.ok) {
            const content = await response.text();
            console.log(
              `Content length for ${filePath}: ${content.length} characters`
            );
            const lesson = this.parseLessonFromContent(content, filePath);
            console.log(
              `Parsed lesson for ${filePath}:`,
              lesson ? "Success" : "Failed"
            );

            if (lesson) {
              console.log(
                `Adding lesson: ${lesson.title} (ID: ${lesson.id}, Hidden: ${lesson.hidden})`
              );
              this.lessons.push(lesson);
            }
          } else {
            console.warn(
              `Failed to fetch ${filePath}: ${response.status} ${response.statusText}`
            );
          }
        } catch (fileError) {
          console.error(`Error loading ${filePath}:`, fileError);
        }
      }

      console.log(`Total lessons loaded: ${this.lessons.length}`);
      console.log(
        "Loaded lessons:",
        this.lessons.map((l) => ({
          title: l.title,
          id: l.id,
          hidden: l.hidden,
        }))
      );

      // If no lessons loaded, use fallback
      if (this.lessons.length === 0) {
        this.lessons = [this.getDefaultLesson()];
      }

      return true;
    } catch (error) {
      console.error("Error loading course:", error);
      // Fallback to embedded content for demo
      this.lessons = [this.getDefaultLesson()];
      return true;
    }
  }

  // Parse lesson content and extract metadata
  parseLessonFromContent(content, filePath) {
    try {
      // Extract metadata from frontmatter (lines between ---)
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let metadata = {};

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const lines = frontmatter.split("\n");
        lines.forEach((line) => {
          const [key, value] = line.split(":").map((s) => s.trim());
          if (key && value) {
            // Remove quotes from value if present
            metadata[key] = value.replace(/^["']|["']$/g, "");
          }
        });
      }

      // Extract title from metadata or filename
      const filename = filePath.split("/").pop().replace(".md", "");
      const title = metadata.title || this.formatTitleFromFilename(filename);

      return {
        id: filename,
        title: title,
        content: content,
        path: metadata.path || `/course/${filename}`,
        hidden: metadata.hidden === "true",
      };
    } catch (error) {
      console.error("Error parsing lesson:", error);
      return null;
    }
  }

  // Format filename to readable title
  formatTitleFromFilename(filename) {
    // Remove number prefix and format title
    const cleaned = filename.replace(/^\d+-/, "");
    return cleaned
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Default lesson content for demo
  getDefaultLesson() {
    return {
      id: "getting-started",
      title: "Getting Started",
      path: "/part-1/1-getting-started",
      content: `---\npath: "/part-1/1-getting-started"\ntitle: "Getting started"\nhidden: false\n---\n\n<text-box variant='learningObjectives' name='Learning objectives'>\n\nNa deze sectie:\n\n- Heb je je eerste Python-programma geschreven en uitgevoerd\n- Weet je hoe je het print-commando gebruikt\n- Kun je programmeren gebruiken voor rekenkundige bewerkingen\n\n</text-box>\n\nComputerprogramma's bestaan uit _commando's_, waarbij elk commando de computer instrueert om een bepaalde actie uit te voeren. Een computer voert deze commando's één voor één uit.\n\nLaten we beginnen met programmeren door vertrouwd te raken met het print commando, dat tekst _afdrukt_.\n\n<in-browser-programming-exercise name="Print Hello World" tmcname="part01-01_hello_world">\n\nSchrijf een programma dat "Hello, World!" afdrukt.\n\n</in-browser-programming-exercise>\n\n<in-browser-programming-exercise name="Print Your Name" tmcname="part01-02_print_name">\n\nSchrijf een programma dat je naam afdrukt. Vervang "Your Name" door je echte naam.\n\n</in-browser-programming-exercise>\n\n<in-browser-programming-exercise name="Simple Calculation" tmcname="part01-03_calculation">\n\nSchrijf een programma dat de som van 15 en 27 afdrukt.\n\n</in-browser-programming-exercise>`,
    };
  }

  // Get current lesson
  getCurrentLesson() {
    return this.lessons[this.currentLessonIndex] || null;
  }

  // Chunk navigation methods
  nextChunk() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return false;

    // Create parser for this lesson to check chunk capabilities
    const parser = new MarkdownParser();
    parser.splitIntoChunks(lesson.content);
    parser.currentChunkIndex = this.currentChunkIndex;

    if (parser.canGoNext()) {
      parser.nextChunk();
      this.currentChunkIndex = parser.currentChunkIndex;
      console.log(`Advanced to chunk ${this.currentChunkIndex + 1}`);
      return true;
    }
    console.log(`Cannot advance from chunk ${this.currentChunkIndex + 1}`);
    return false;
  }

  previousChunk() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return false;

    // Create parser for this lesson to check chunk capabilities
    const parser = new MarkdownParser();
    parser.splitIntoChunks(lesson.content);
    parser.currentChunkIndex = this.currentChunkIndex;

    if (parser.canGoPrevious()) {
      parser.previousChunk();
      this.currentChunkIndex = parser.currentChunkIndex;
      console.log(`Moved to previous chunk ${this.currentChunkIndex + 1}`);
      return true;
    }
    console.log(`Cannot go back from chunk ${this.currentChunkIndex + 1}`);
    return false;
  }

  canGoNextChunk() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return false;

    // Create parser for this lesson to check chunk capabilities
    const parser = new MarkdownParser();
    parser.splitIntoChunks(lesson.content);
    parser.currentChunkIndex = this.currentChunkIndex;

    const canGo = parser.canGoNext();
    console.log(
      `Can go to next chunk from ${this.currentChunkIndex + 1}:`,
      canGo
    );
    return canGo;
  }

  canGoPreviousChunk() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return false;

    return this.currentChunkIndex > 0;
  }

  // Reset chunk navigation when changing lessons
  resetChunkNavigation() {
    console.log(
      `Resetting chunk navigation for lesson "${
        this.getCurrentLesson()?.title || "Unknown"
      }"`
    );
    this.currentChunkIndex = 0;
  }

  // Get chunk info for current lesson
  getCurrentChunkInfo() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return { index: 0, total: 0 };

    const parser = new MarkdownParser();
    parser.splitIntoChunks(lesson.content);
    parser.currentChunkIndex = this.currentChunkIndex;

    const info = {
      index: this.currentChunkIndex + 1,
      total: parser.getTotalChunks(),
    };

    console.log(`Chunk info for lesson "${lesson.title}":`, info);
    return info;
  }

  // Get current chunk content
  getCurrentChunkContent() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return "";

    // Create a fresh parser for this lesson
    const parser = new MarkdownParser();
    const chunks = parser.splitIntoChunks(lesson.content);
    parser.currentChunkIndex = this.currentChunkIndex;

    console.log(
      `Getting chunk content for lesson "${lesson.title}", chunk ${
        this.currentChunkIndex + 1
      }/${parser.getTotalChunks()}`
    );

    return parser.getCurrentChunkContent();
  }

  // Check if lesson has chunks (more than 1 chunk)
  hasChunks() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return false;

    const parser = new MarkdownParser();
    const chunks = parser.splitIntoChunks(lesson.content);
    const totalChunks = parser.getTotalChunks();
    const hasChunks = totalChunks > 1;

    console.log(
      `Lesson "${lesson.title}" has ${totalChunks} chunks, hasChunks: ${hasChunks}`
    );
    return hasChunks;
  }

  // Get total chunks for current lesson
  getTotalChunks() {
    const lesson = this.getCurrentLesson();
    if (!lesson) return 0;

    const parser = new MarkdownParser();
    const chunks = parser.splitIntoChunks(lesson.content);
    const total = parser.getTotalChunks();

    console.log(`Total chunks for lesson "${lesson.title}": ${total}`);
    return total;
  }

  // Navigate to next lesson
  nextLesson() {
    if (this.currentLessonIndex < this.lessons.length - 1) {
      this.currentLessonIndex++;
      this.resetChunkNavigation(); // Reset chunk navigation when changing lessons
      console.log(
        `Switched to next lesson ${
          this.currentLessonIndex + 1
        }, chunk navigation reset`
      );
      return true;
    }
    console.log(
      `Cannot go to next lesson, at last lesson ${
        this.currentLessonIndex + 1
      }/${this.lessons.length}`
    );
    return false;
  }

  // Navigate to previous lesson
  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
      this.resetChunkNavigation(); // Reset chunk navigation when changing lessons
      console.log(
        `Switched to previous lesson ${
          this.currentLessonIndex + 1
        }, chunk navigation reset`
      );
      return true;
    }
    console.log(
      `Cannot go to previous lesson, at first lesson ${
        this.currentLessonIndex + 1
      }`
    );
    return false;
  }

  // Check if can navigate
  canGoNext() {
    return this.currentLessonIndex < this.lessons.length - 1;
  }

  canGoPrevious() {
    return this.currentLessonIndex > 0;
  }

  // Save progress to localStorage
  saveProgress() {
    try {
      const progressKey = `courseProgress_${this.courseId}`;
      localStorage.setItem(
        progressKey,
        JSON.stringify({
          currentLessonIndex: this.currentLessonIndex,
          currentChunkIndex: this.currentChunkIndex, // Save chunk position
          completedExercises: this.progress.completedExercises || [],
          lastAccessed: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }

  // Load progress from localStorage
  loadProgress() {
    try {
      const progressKey = `courseProgress_${this.courseId}`;
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const progress = JSON.parse(saved);
        this.currentChunkIndex = progress.currentChunkIndex || 0; // Restore chunk position
        return progress;
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    return {
      currentLessonIndex: 0,
      currentChunkIndex: 0,
      completedExercises: [],
      lastAccessed: null,
    };
  }

  // Mark exercise as completed
  markExerciseCompleted(exerciseId) {
    if (!this.progress.completedExercises) {
      this.progress.completedExercises = [];
    }

    if (!this.progress.completedExercises.includes(exerciseId)) {
      this.progress.completedExercises.push(exerciseId);
      this.saveProgress();
    }
  }

  // Check if exercise is completed
  isExerciseCompleted(exerciseId) {
    return this.progress.completedExercises?.includes(exerciseId) || false;
  }

  // Get course statistics
  getStats() {
    const totalExercises = this.lessons.reduce((total, lesson) => {
      const parser = new MarkdownParser();
      parser.parse(lesson.content);
      return total + parser.getExercises().length;
    }, 0);

    const completedExercises = this.progress.completedExercises?.length || 0;

    return {
      totalLessons: this.lessons.length,
      currentLesson: this.currentLessonIndex + 1,
      totalExercises,
      completedExercises,
      progressPercentage:
        totalExercises > 0
          ? Math.round((completedExercises / totalExercises) * 100)
          : 0,
    };
  }

  // Reset progress
  resetProgress() {
    this.progress = {
      currentLessonIndex: 0,
      currentChunkIndex: 0,
      completedExercises: [],
      lastAccessed: null,
    };
    this.currentChunkIndex = 0;
    this.saveProgress();
  }

  // Export progress
  exportProgress() {
    return {
      progress: this.progress,
      courseInfo: {
        totalLessons: this.lessons.length,
        courseTitle: this.courseManifest?.course?.title || "Coding Exercises",
        courseId: this.courseId,
      },
      exportDate: new Date().toISOString(),
    };
  }

  // Import progress
  importProgress(data) {
    try {
      if (data.progress) {
        this.progress = data.progress;
        this.currentLessonIndex = this.progress.currentLessonIndex || 0;
        this.saveProgress();
        return true;
      }
    } catch (error) {
      console.error("Failed to import progress:", error);
    }
    return false;
  }

  // Search lessons
  searchLessons(query) {
    const results = [];
    const searchTerm = query.toLowerCase();

    this.lessons.forEach((lesson, index) => {
      const parser = new MarkdownParser();
      const parsedContent = parser.parse(lesson.content);

      // Simple search in title and content
      if (
        lesson.title.toLowerCase().includes(searchTerm) ||
        parsedContent.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          lessonIndex: index,
          lesson: lesson,
          relevance: this.calculateRelevance(lesson, parsedContent, searchTerm),
        });
      }
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Calculate relevance score for search results
  calculateRelevance(lesson, content, searchTerm) {
    let score = 0;

    // Title matches are more relevant
    if (lesson.title.toLowerCase().includes(searchTerm)) {
      score += 10;
    }

    // Count occurrences in content
    const matches = (content.match(new RegExp(searchTerm, "gi")) || []).length;
    score += matches;

    return score;
  }
}
