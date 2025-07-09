const fs = require("fs");
const path = require("path");

const createFile = (filePath, content) => {
  const fullPath = path.join(__dirname, "..", filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Created: ${filePath}`);
};

// 1. Create Tailwind config
createFile("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`);

// 2. Create PostCSS config
createFile("postcss.config.js", `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);

// 3. Create index.css with Tailwind directives
createFile("src/index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;
`);
