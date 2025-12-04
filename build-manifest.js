const fs = require("fs");
const path = require("path");

// Configuration
const COURSES_DIR = path.join(__dirname, "course-content", "courses");

// Get all markdown files and sort them numerically
function getLessonFiles(dirPath) {
  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => {
      // Extract leading numbers for proper sorting (1, 2, 10 instead of 1, 10, 2)
      const numA = parseInt(a.match(/^(\d+)/)?.[1] || "0");
      const numB = parseInt(b.match(/^(\d+)/)?.[1] || "0");
      return numA - numB;
    });

  return files;
}

// Generate manifest for course-specific directories
function generateCourseManifests() {
  if (!fs.existsSync(COURSES_DIR)) {
    console.log(
      "⚠️  Courses directory not found, skipping course manifest generation"
    );
    return;
  }

  const courseDirs = fs
    .readdirSync(COURSES_DIR)
    .filter((dir) => fs.statSync(path.join(COURSES_DIR, dir)).isDirectory());

  console.log(`📚 Processing ${courseDirs.length} courses...`);

  courseDirs.forEach((courseId) => {
    const courseDir = path.join(COURSES_DIR, courseId);
    const manifestPath = path.join(courseDir, "manifest.json");

    const lessons = getLessonFiles(courseDir);

    // Try to read existing course info from manifest
    let courseInfo = {
      id: courseId,
      title: `${
        courseId.charAt(0).toUpperCase() + courseId.slice(1)
      } Programming`,
      description: `Learn ${courseId} programming with interactive exercises`,
      language: courseId,
      difficulty: "beginner",
      icon: courseId === "python" ? "🐍" : "💻",
    };

    // If manifest already exists, preserve course info
    if (fs.existsSync(manifestPath)) {
      try {
        const existingManifest = JSON.parse(
          fs.readFileSync(manifestPath, "utf8")
        );
        if (existingManifest.course) {
          courseInfo = existingManifest.course;
        }
      } catch (error) {
        console.warn(
          `Could not read existing manifest for ${courseId}:`,
          error.message
        );
      }
    }

    const manifest = {
      course: courseInfo,
      lessons: lessons,
      generatedAt: new Date().toISOString(),
      note: "This manifest is auto-generated. Do not edit manually.",
    };

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    console.log(`✅ Course manifest generated for ${courseId}!`);
    console.log(`   Found ${lessons.length} lessons:`);
    lessons.forEach((lesson, i) => {
      console.log(`      ${i + 1}. ${lesson}`);
    });
  });

  console.log("\n🎉 All course manifests generated successfully!");
  console.log("\n📋 Summary of generated manifests:");

  courseDirs.forEach((courseId) => {
    const manifestPath = path.join(COURSES_DIR, courseId, "manifest.json");
    console.log(`   • ${courseId}: ${path.relative(__dirname, manifestPath)}`);
  });
}

// Main function to generate course manifests
function generateManifests() {
  console.log("🚀 Starting course manifest generation...\n");
  generateCourseManifests();
}

// Allow running this script directly
if (require.main === module) {
  generateManifests();
}

// Export for use as module
module.exports = {
  generateManifests,
  generateCourseManifests,
};
