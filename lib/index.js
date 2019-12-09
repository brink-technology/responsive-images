

// const inquirer = require('inquirer');
const commander = require('commander');
const nodepath = require('path');
const pkg = require('../package.json');

const program = new commander.Command();

const splitStringIntoArray = coerce => string => string.split(',').map(coerce);

const widthCoerce = (x) => {
  if (x === 'original') {
    return 'original';
  }
  return Number(x);
};

program
  .version(pkg.version)
  .option('-d, --debug', 'Enable debugging', false)
  .option('-o, --output-directory <directory>', 'The directory to output to', x => nodepath.resolve(process.cwd(), x), './images__output')
  .option('-w, --widths [px]', 'The widths required, separated by commas, in pixels. E.g., 1024,640,320', splitStringIntoArray(widthCoerce), ['original', 1024, 640, 320])
  .option('-f, --formats [format]', 'The file formats to output, separated by commas. E.g., jpg,jp2,webp', splitStringIntoArray(x => String(x)), ['jpg', 'jp2', 'webp'])
  .arguments('<image>')
  .action((image, commandObj) => {
    if (!image) {
      console.log('no image provided, exiting.');
      console.log(commandObj.opts());
      process.exit(1);
    }
    debugger
  });

program.parse(process.argv);
