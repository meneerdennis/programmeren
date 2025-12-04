const MarkdownParser = require("./markdown-parser.js");

const parser = new MarkdownParser();
const testContent = `Here is some code:

\`\`\`python
print("Hallo daar!")
\`\`\`

End.`;

const result = parser.parse(testContent);
console.log(result);
