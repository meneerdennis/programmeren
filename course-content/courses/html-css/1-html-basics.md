---
path: "/html-css/1-html-basics"
title: "HTML Basics"
hidden: false
---

<text-box variant='learningObjectives' name='Learning objectives'>

After this section:

- You will understand what HTML is and why it's used
- You will know the basic structure of an HTML document
- You will be able to create simple HTML elements
- You will understand the difference between block and inline elements

</text-box>

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup tags.

Think of HTML as the skeleton of a website - it provides the basic structure thatCSS (for styling) and JavaScript (for interactivity) can build upon.

## Basic HTML Document Structure

Every HTML document follows a basic structure. Here's a simple example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

Let's break down what each part does:

- `<!DOCTYPE html>` - Declares this as an HTML5 document
- `<html>` - The root element that contains all other elements
- `<head>` - Contains metadata about the document
- `<title>` - Specifies the title shown in the browser tab
- `<body>` - Contains all visible content

## HTML Elements

HTML elements are defined by tags. Most elements have an opening tag and a closing tag:

```html
<tagname>Content goes here</tagname>
```

Some elements are self-closing (they don't need closing tags):

```html
<img src="image.jpg" alt="Description" />
<br />
<hr />
```

## Common HTML Elements

### Headings

HTML provides six levels of headings, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>This is a main heading</h1>
<h2>This is a subheading</h2>
<h3>This is a smaller subheading</h3>
```

### Paragraphs

Use `<p>` tags to create paragraphs of text:

```html
<p>
  This is a paragraph of text. It can contain multiple sentences and will wrap
  to fit the width of its container.
</p>
```

### Links

Create hyperlinks using the `<a>` (anchor) tag:

```html
<a href="https://www.example.com">Click here to visit Example.com</a>
```

### Images

Add images using the `<img>` tag:

```html
<img src="path/to/image.jpg" alt="Description of the image" />
```

### Lists

**Unordered lists** (bullet points):

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

**Ordered lists** (numbered):

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

<in-browser-programming-exercise name="Create your first heading" tmcname="html-01-first-heading">

Create an HTML document with an `<h1>` element that says "Hello, World!".

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page</title>
  </head>
  <body>
    <!-- Your h1 element should go here -->
  </body>
</html>
```

</in-browser-programming-exercise>

<in-browser-programming-exercise name="Create a simple webpage" tmcname="html-02-simple-webpage">

Create a simple webpage with the following elements:

- An `<h1>` heading with the text "My Favorite Hobbies"
- A `<p>` paragraph describing your favorite hobby
- An unordered list with at least 3 hobbies

</in-browser-programming-exercise>

## Block vs Inline Elements

### Block Elements

Block elements always start on a new line and take up the full width available:

```html
<h1>This is a block element</h1>
<p>This is also a block element</p>
<div>This is a block element too</div>
```

### Inline Elements

Inline elements do not start on a new line and only take up as much width as necessary:

```html
<a href="#">This is an inline element</a>
<strong>This is also inline</strong>
<em>This is inline as well</em>
```

<in-browser-programming-exercise name="Block vs Inline" tmcname="html-03-block-inline">

Create a paragraph that contains both block and inline elements. The paragraph should contain:

- A `<strong>` element to emphasize important text
- An `<em>` element for italicized text
- An `<a>` link element
- A `<br>` line break

</in-browser-programming-exercise>

## Attributes

HTML elements can have attributes that provide additional information about the element:

```html
<img src="photo.jpg" alt="A beautiful sunset" width="300" height="200" />
<a href="mailto:someone@example.com">Email me</a>
<p class="intro">This paragraph has a class</p>
```

Common attributes include:

- `src` - Source of an image or other resource
- `href` - URL for links
- `alt` - Alternative text for images
- `class` - CSS class name
- `id` - Unique identifier
- `style` - Inline CSS styling

<in-browser-programming-exercise name="Adding attributes" tmcname="html-04-attributes">

Create a link that:

- Points to "https://www.w3schools.com"
- Opens in a new tab (use `target="_blank"`)
- Has the text "Learn HTML at W3Schools"

</in-browser-programming-exercise>
