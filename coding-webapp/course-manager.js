// Course Manager for handling lessons and progress
class CourseManager {
  constructor() {
    this.lessons = [];
    this.currentLessonIndex = 0;
    this.progress = this.loadProgress();
  }

  // Load course content (this would typically fetch from a server)
  async loadCourse() {
    // For demo purposes, we'll include the example lesson
    // In a real app, this would load from files or API
    try {
      const response = await fetch("1-getting-started.md");
      if (!response.ok) {
        throw new Error("Failed to load lesson");
      }
      const content = await response.text();

      this.lessons = [
        {
          id: "getting-started",
          title: "Getting Started",
          content: content,
          path: "/part-1/1-getting-started",
        },
      ];

      return true;
    } catch (error) {
      console.error("Error loading course:", error);
      // Fallback to embedded content for demo
      this.lessons = [this.getDefaultLesson()];
      return true;
    }
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

  // Navigate to next lesson
  nextLesson() {
    if (this.currentLessonIndex < this.lessons.length - 1) {
      this.currentLessonIndex++;
      return true;
    }
    return false;
  }

  // Navigate to previous lesson
  previousLesson() {
    if (this.currentLessonIndex > 0) {
      this.currentLessonIndex--;
      return true;
    }
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
      localStorage.setItem(
        "courseProgress",
        JSON.stringify({
          currentLessonIndex: this.currentLessonIndex,
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
      const saved = localStorage.getItem("courseProgress");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    return {
      currentLessonIndex: 0,
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
      completedExercises: [],
      lastAccessed: null,
    };
    this.saveProgress();
  }

  // Export progress
  exportProgress() {
    return {
      progress: this.progress,
      courseInfo: {
        totalLessons: this.lessons.length,
        courseTitle: "Coding Exercises",
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
