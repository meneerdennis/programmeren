# Course Management Workflow Guide

## Overview

This guide explains how to manage course content files for your coding exercises web application. The system has been reorganized with a clear directory structure for better organization and maintainability.

## Directory Structure

```
programmeren/
├── coding-webapp/              # Main web application
│   ├── index.html              # Main application interface
│   ├── app.js                  # Main application logic
│   ├── course-manager.js       # Course loading and navigation
│   ├── markdown-parser.js      # Markdown content parser
│   ├── code-executor.js        # Code execution engine
│   └── styles.css              # Application styling
├── course-content/             # Course materials
│   ├── lessons/                # All lesson files (.md)
│   │   ├── 1-getting-started.md
│   │   ├── 2-information-from-the-user.md
│   │   ├── 3-more-about-variables.md
│   │   └── 4-arithmetic-operations.md
│   ├── assets/                 # Images, videos, etc.
│   └── exports/                # Generated exports and backups
└── COURSE_WORKFLOW.md          # This documentation
```

## Adding New Course Files

### Step 1: Create New Lesson File

1. Create a new markdown file in `course-content/lessons/`
2. Follow the naming convention: `XX-descriptive-name.md`
   - Use numbers to indicate lesson order (01, 02, 03, etc.)
   - Use hyphens to separate words
   - Keep names descriptive but concise

Example: `05-loops-and-conditionals.md`

### Step 2: Add Lesson Metadata

Each lesson file should start with frontmatter metadata:

```markdown
---
path: "/part-1/5-loops-and-conditionals"
title: "Loops and Conditionals"
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section:

- You will understand loop structures
- You will be able to write conditional statements

</text-box>

# Lesson content starts here...
```

**Required Frontmatter Fields:**

- `path`: URL path for the lesson
- `title`: Display title for the lesson
- `hidden`: Set to `true` for drafts, `false` for published lessons

### Step 3: Add Exercises

Use the standard exercise format:

````markdown
<in-browser-programming-exercise name="Exercise Name" tmcname="part01-21_exercise_name">

Write your exercise description here...

```python
# Starter code if needed
print("Hello World")
```
````

</in-browser-programming-exercise>
```

### Step 4: Update Course Manager

The `course-manager.js` automatically loads all `.md` files from the `course-content/lessons/` directory. No manual updates needed!

## Content Types Supported

### 1. Learning Objectives

```markdown
<text-box variant='learningObjectives' name='Learning objectives'>
- Objective 1
- Objective 2
</text-box>
```

### 2. Programming Exercises

```markdown
<in-browser-programming-exercise name="Exercise Name" tmcname="unique-exercise-id">
Exercise description and requirements...
</in-browser-programming-exercise>
```

### 3. Code Examples

```python
# Use standard Python syntax
print("Hello, World!")
```

### 4. Sample Output

```markdown
<sample-output>
Expected output
goes here
</sample-output>
```

### 5. Hints and Tips

```markdown
<text-box variant="hint" name="Hint Title">
Helpful information for students...
</text-box>
```

## Managing Course Progress

### Student Progress

- Progress is automatically saved to browser's localStorage
- Students can export/import progress for backup
- Exercise completion is tracked per user

### Course Statistics

The system tracks:

- Total lessons available
- Current lesson position
- Completed exercises
- Overall progress percentage

## Maintenance Tasks

### Regular Maintenance

1. **Check for broken links** - Verify all exercise IDs are unique
2. **Test lesson navigation** - Ensure lessons load in correct order
3. **Validate markdown syntax** - Use markdown linters for consistency
4. **Update dependencies** - Keep course-manager.js in sync with new lessons

### Backup Procedures

1. **Export progress regularly** - Students should export progress
2. **Version control** - Use git to track changes to lesson files
3. **Regular backups** - Copy course-content directory regularly

## Troubleshooting

### Common Issues

**Lesson not loading?**

- Check file path in `course-content/lessons/`
- Verify frontmatter syntax
- Check browser console for errors

**Exercise not recognized?**

- Ensure `<in-browser-programming-exercise>` tag is properly closed
- Check that `tmcname` is unique within the lesson
- Verify markdown syntax

**Navigation not working?**

- Check that lesson files are numbered sequentially
- Verify that `path` field in frontmatter is unique

### Debug Mode

Enable debug logging in browser console:

```javascript
// Add to browser console
localStorage.setItem("debug", "true");
```

## Best Practices

1. **File Organization**

   - Keep files in logical order using numeric prefixes
   - Use consistent naming conventions
   - Group related lessons together

2. **Content Quality**

   - Test all code examples before publishing
   - Use clear, descriptive exercise names
   - Include learning objectives for each lesson

3. **Version Control**

   - Commit changes frequently
   - Use meaningful commit messages
   - Tag major releases

4. **User Experience**
   - Ensure exercises progress logically
   - Provide helpful error messages
   - Include progress indicators

## System Architecture

### How It Works

1. **Course Manager** (`course-manager.js`) - Loads and manages lessons
2. **Markdown Parser** (`markdown-parser.js`) - Converts markdown to HTML
3. **Code Executor** (`code-executor.js`) - Runs student code safely
4. **Main App** (`app.js`) - Coordinates all components

### Data Flow

```
Lesson File (.md)
    ↓
Course Manager (loadCourse())
    ↓
Markdown Parser (parse())
    ↓
HTML Content (display in browser)
```

## Support and Updates

### Getting Help

- Check browser console for error messages
- Review this documentation
- Test with simple lesson files first

### Feature Requests

To add new features:

1. Update the appropriate JavaScript module
2. Test thoroughly with existing lessons
3. Update documentation
4. Consider backward compatibility

---

## Quick Reference

### Adding a New Lesson

1. Create `XX-lesson-name.md` in `course-content/lessons/`
2. Add frontmatter with path, title, hidden status
3. Write lesson content with exercises
4. Test navigation and exercise functionality

### Common File Paths

- Main app: `coding-webapp/index.html`
- Course manager: `coding-webapp/course-manager.js`
- Lessons directory: `course-content/lessons/`
- Documentation: `COURSE_WORKFLOW.md`

### Browser Testing

Access the application at: `http://localhost:8000`
(Ensure the Python server is running: `python -m http.server 8000`)
