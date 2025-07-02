const { execSync } = require('child_process');
const path = require('path');

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

console.log(`${colors.bright}${colors.blue}Starting project cleanup...${colors.reset}\n`);

try {
  // Install dependencies if needed
  console.log(`${colors.yellow}Installing ESLint and Prettier dependencies...${colors.reset}`);
  execSync('npm install', { stdio: 'inherit' });

  // Run ESLint fix
  console.log(`\n${colors.yellow}Running ESLint to fix code issues...${colors.reset}`);
  execSync('npm run lint', { stdio: 'inherit' });

  // Run Prettier
  console.log(`\n${colors.yellow}Running Prettier to format code...${colors.reset}`);
  execSync('npm run format', { stdio: 'inherit' });

  // Check for remaining issues
  console.log(`\n${colors.yellow}Checking for any remaining issues...${colors.reset}`);
  try {
    execSync('npm run check-all', { stdio: 'inherit' });
    console.log(
      `\n${colors.bright}${colors.green}Project cleanup completed successfully!${colors.reset}`
    );
  } catch (error) {
    console.log(
      `\n${colors.magenta}Some issues could not be automatically fixed. Please review the errors above.${colors.reset}`
    );
    process.exit(1);
  }
} catch (error) {
  console.error(`\nAn error occurred during project cleanup: ${error.message}`);
  process.exit(1);
}
