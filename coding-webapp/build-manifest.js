const fs = require("fs");
const path = require("path");

// Configuration
const LESSONS_DIR = path.join(__dirname, "course-content", "lessons");
const MANIFEST_PATH = path.join(LESSONS_DIR, "manifest.json");

// Get all markdown files and sort them numerically
function getLessonFiles() {
  const files = fs
    .readdirSync(LESSONS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort((a, b) => {
      // Extract leading numbers for proper sorting (1, 2, 10 instead of 1, 10, 2)
      const numA = parseInt(a.match(/^(\d+)/)?.[1] || "0");
      const numB = parseInt(b.match(/^(\d+)/)?.[1] || "0");
      return numA - numB;
    });

  return files;
}

// Generate manifest
function generateManifest() {
  const lessons = getLessonFiles();

  const manifest = {
    lessons: lessons,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log("✅ Manifest generated successfully!");
  console.log(`📚 Found ${lessons.length} lessons:`);
  lessons.forEach((lesson, i) => {
    console.log(`   ${i + 1}. ${lesson}`);
  });
}

generateManifest();
