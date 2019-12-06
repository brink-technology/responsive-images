

// const inquirer = require('inquirer');
const program = require('commander');

const pkg = require('../package.json');

program
  .version(pkg.version)
  .option('-d, --debug', 'Enable debugging')
  .option('-o, --output-directory', 'The directory to output to')
  .arguments('<image>');

program.parse(process.argv);
