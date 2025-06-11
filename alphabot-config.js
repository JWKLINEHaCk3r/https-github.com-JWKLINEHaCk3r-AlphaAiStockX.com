// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;

// pages/404.tsx
export default function Custom404() {
  return <h1>404 – Page Not Found</h1>;
}

// pages/500.tsx
export default function Custom500() {
  return <h1>500 – Server-side error occurred</h1>;
}

// .eslintrc.js
module.exports = {
  plugins: ['shebang'],
  rules: {
    'shebang/shebang': ['error', '#!/usr/bin/env node'],
  },
};

// postbuild.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'dist', 'cli.js');
const code = fs.readFileSync(file, 'utf-8');
if (!code.startsWith('#!/usr/bin/env node\n')) {
  fs.writeFileSync(file, '#!/usr/bin/env node\n' + code);
  console.log('✨ Added missing shebang to CLI');
}

// package.json (script section only)
{
  "scripts": {
    "postbuild": "node postbuild.js"
  },
  "dependencies": {
    "critters": "^0.0.0"
  }
}
