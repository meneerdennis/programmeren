# Coding Exercises Webapp

A browser-based interactive coding exercises platform that allows students to practice programming directly in their web browser. The webapp supports HTML, CSS, JavaScript, and Python with an integrated code editor and automatic syntax checking.

## Features

### 📚 Course Content

- **Markdown-based lessons** with custom tags for interactive elements
- **Lesson navigation** with previous/next functionality
- **Progress tracking** saved to localStorage
- **Course statistics** and completion tracking

### 🏋️ Interactive Exercises

- **Click-to-start exercises** embedded in lesson content
- **Integrated Monaco Editor** with syntax highlighting
- **Multi-language support**: HTML, CSS, JavaScript, Python
- **Real-time code execution** and output display
- **Automatic solution checking** with expected output comparison

### 🔧 Custom Tags Support

The parser supports the following custom tags from your course files:

```markdown
<text-box variant='learningObjectives' name='Learning objectives'>
Content here...
</text-box>

<sample-output>
Expected output content...
</sample-output>

<in-browser-programming-exercise name="Exercise Name" tmcname="exercise_id">
Exercise description and content...
</in-browser-programming-exercise>
```

### 💻 Code Execution

- **Python**: Runs in Pyodide (WebAssembly Python)
- **JavaScript**: Executes in sandboxed iframe
- **HTML**: Validates HTML structure and syntax
- **CSS**: Validates CSS syntax and structure
- **Real-time output**: Shows execution results immediately

## File Structure

```
coding-webapp/
├── index.html              # Main application HTML (full-featured)
├── simple-editor.html      # Simple fallback version
├── styles.css              # Application styling
├── app.js                  # Main application controller
├── markdown-parser.js      # Custom markdown parser
├── code-executor.js        # Multi-language code execution engine
├── course-manager.js       # Course and progress management
├── build-manifest.js       # Auto-generates course manifests
├── course-content/         # Course content directory
├── test.html              # Quick test page
└── README.md              # This documentation
```

## Getting Started

### Quick Start

#### Option 1: Full-Featured Version

1. Open `index.html` in a modern web browser
2. Wait for Monaco Editor and Pyodide to load (may take 10-15 seconds on first load)
3. Click on any exercise card to start coding
4. Use "Run Code" to execute your solution
5. Use "Check Solution" to verify against expected output

#### Option 2: Simple Version (Fallback)

If you experience CDN loading issues, use the simple version:

1. Open `simple-editor.html` in a web browser
2. This version works immediately without external dependencies
3. Click on exercise cards to start coding
4. Limited to basic Python exercises but fully functional

### Running Locally

Since the app uses Pyodide and Monaco Editor from CDNs, you can simply open the HTML file in a browser. For best results with local file loading, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

### For Students

1. **Read the lesson** content on the left panel
2. **Click exercise cards** to open them in the editor
3. **Write your code** in the Monaco editor
4. **Run your code** using the "Run Code" button
5. **Check your solution** using the "Check Solution" button
6. **Navigate lessons** using the navigation buttons

### Keyboard Shortcuts

- `Ctrl+Enter` (or `Cmd+Enter` on Mac): Run code
- `Ctrl+S` (or `Cmd+S` on Mac): Check solution

### Code Editor Features

- **Syntax highlighting** for all supported languages
- **Auto-completion** and error detection
- **Code folding** and minimap (configurable)
- **Multiple themes** (currently using light theme)

## Supported Languages

### Python

- Full Python 3.x execution via Pyodide
- Print statement output capture
- Syntax error detection
- Runtime error reporting

### JavaScript

- Sandboxed execution for security
- Console output capture
- Error handling and reporting

### HTML

- HTML structure validation
- Tag matching verification
- Basic syntax checking

### CSS

- CSS syntax validation
- Property checking
- Structure verification

## Exercise Format

Exercises are defined using the custom `<in-browser-programming-exercise>` tag:

````markdown
<in-browser-programming-exercise name="Exercise Name" tmcname="unique_id">

Exercise description here...

```python
# Optional starter code
print("Hello, World!")
```
````

Optional expected output:

<sample-output>
Hello, World!
</sample-output>

</in-browser-programming-exercise>
```

### Exercise Content Structure

1. **Name**: Displayed in exercise panel
2. **Description**: Plain text or markdown
3. **Starter code**: Optional code blocks with language specification
4. **Expected output**: Optional `<sample-output>` block for validation

## Course Content Structure

### Directory Organization

```
course-content/
├── courses/
│   ├── python/                # Python programming course content
│   │   ├── 1-getting-started.md
│   │   ├── 2-information-from-the-user.md
│   │   ├── 3-more-about-variables.md
│   │   ├── 4-arithmetic-operations.md
│   │   ├── 5-conditional-statements.md
│   │   └── manifest.json       # Auto-generated Python course manifest
│   └── html-css/              # HTML/CSS course content
│       ├── 1-html-basics.md
│       └── manifest.json       # Auto-generated HTML-CSS course manifest
```

### Course Content Architecture

- **`course-content/courses/{course-name}/`**: Each course has its own independent lesson set
- **Self-Contained Courses**: Each course folder contains complete, standalone lesson content
- **Course-Specific Manifests**: Automatically generated manifests per course

### Auto-Generated Course Manifests

The `build-manifest.js` script automatically generates and updates course manifest files:

```bash
node build-manifest.js
```

This script:

- Scans all course directories (`course-content/courses/*/`)
- Auto-generates lesson lists in chronological order for each course
- Preserves existing course metadata and settings
- Provides detailed output of generated manifests

## Customization

### Automated Course Management

#### Step 1: Create Course Content

**For a New Course** (e.g., `course-content/courses/javascript/`):

```markdown
# course-content/courses/javascript/1-getting-started.md

---

path: "/javascript/1-getting-started"
title: "Getting Started with JavaScript"
hidden: false

---

<text-box variant='learningObjectives' name='Learning objectives'>
Your learning objectives...
</text-box>

Your JavaScript lesson content here...
```

#### Step 2: Auto-Update Course Manifests

Simply run the build script:

```bash
node build-manifest.js
```

The script automatically:

- Detects new course directories
- Scans each course for lesson files
- Updates all course-specific manifests (`course-content/courses/*/manifest.json`)
- Preserves existing course metadata and settings
- Provides detailed output of what was generated

#### Step 3: No Manual Configuration Needed

The course manager automatically reads from the generated course manifests - no additional configuration required!

### Manual Manifest Updates (If Needed)

1. Create a new `.md` file with proper frontmatter and custom tags
2. Add lesson filename to the course's manifest file
3. Ensure frontmatter includes unique `path`, `title`, and `hidden` status
4. Use custom tags: `<text-box>`, `<sample-output>`, `<in-browser-programming-exercise>`

### Best Practices

1. **Consistent Naming**: Use descriptive, kebab-case filenames with numerical prefixes
2. **Sequential Numbering**: Number lessons sequentially within each course directory
3. **Unique Paths**: Ensure each lesson has a unique `path` in frontmatter (relative to course)
4. **Exercise IDs**: Use unique `tmcname` values for each exercise across all courses
5. **Course Independence**: Each course should be self-contained and complete
6. **Regular Build**: Run `node build-manifest.js` after adding/changing lessons

### Styling

- Modify `styles.css` to change appearance
- CSS custom properties for easy theme customization
- Responsive design for mobile devices

### Language Support

- Extend `code-executor.js` to add new languages
- Update Monaco Editor configuration in `app.js`
- Add language detection in `markdown-parser.js`

## Browser Compatibility

- **Modern browsers** with ES6+ support
- **Chrome/Edge**: Full feature support
- **Firefox**: Full feature support
- **Safari**: Most features supported (may have Pyodide loading delays)

## Performance Notes

- **Pyodide**: ~10-15MB download, loaded on first Python use
- **Monaco Editor**: ~5MB download, loaded on application start
- **Offline support**: Limited (CDN dependencies)

## Troubleshooting

### Common Issues

1. **Pyodide loading slowly**: This is normal, especially on first load
2. **Monaco Editor CDN issues**: Use `simple-editor.html` as a fallback
3. **Editor not appearing**: Check browser console for JavaScript errors
4. **Code execution fails**: Ensure valid syntax for the selected language
5. **Expected output mismatch**: Check for exact whitespace and formatting

### Fallback Solution

If you encounter CDN loading issues with Monaco Editor or Pyodide:

1. Use `simple-editor.html` instead of `index.html`
2. This version works immediately without external dependencies
3. Supports basic Python exercises with a simple textarea editor
4. Includes the same exercise checking functionality

### Debug Mode

Open browser developer tools (F12) to see:

- Console logs for execution details
- Network requests for loading issues
- JavaScript errors and warnings

## Future Enhancements

- **Backend integration** for saving progress to server
- **More programming languages** (Java, C++, etc.)
- **Collaborative coding** features
- **Video lessons** and multimedia content
- **Advanced testing** frameworks for exercises
- **Leaderboards** and achievement systems

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to contribute by:

- Adding new language support
- Improving the UI/UX
- Adding more exercise types
- Enhancing the markdown parser
- Optimizing performance

## Support

For issues and questions:

1. Check the browser console for error messages
2. Verify your code syntax for the selected language
3. Ensure you have a modern browser with JavaScript enabled
4. Try refreshing the page if components don't load properly
