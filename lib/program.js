
// const inquirer = require('inquirer');
const commander = require('commander');
const nodepath = require('path');
const pkg = require('../package.json');
const processImage = require('./image');

// Constants
// ------------------------------------------------------------------
const DEFAULT_OUTPUT_DIR = './responsive-images-output';
const DEFAULT_IMAGE_WIDTHS = ['original', 1024, 640, 320];
const DEFAULT_IMAGE_FILE_TYPES = ['jpg', 'jp2', 'webp'];


const program = new commander.Command();

// helpers
// --------------------------------------------------------------
const splitStringIntoArray = (coerce) => (string) => {
  if (typeof coerce === 'function') {
    return string.split(',').map(coerce);
  }
  return String(string);
};
const coerceOutputDirectory = (dirString) => nodepath.resolve(process.cwd(), dirString);
const getDefaultOutputDirectory = () => nodepath.resolve(process.cwd(), DEFAULT_OUTPUT_DIR);


const widthCoerce = (x) => {
  if (x === 'original') {
    return 'original';
  }
  return Number(x);
};

// program
// ---------------------------------------------------------------------------
program
  .version(pkg.version)
  .option('-d, --debug', 'Enable debugging', false)
  .option('-o, --output-directory <directory>', 'The directory to output the images to', coerceOutputDirectory, getDefaultOutputDirectory())
  .option('-w, --widths [px]', 'The widths required, separated by commas, in pixels. E.g., 1024,640,320', splitStringIntoArray(widthCoerce), DEFAULT_IMAGE_WIDTHS)
  .option('-f, --formats [format]', 'The file formats to output, separated by commas. E.g., jpg,jp2,webp', splitStringIntoArray, DEFAULT_IMAGE_FILE_TYPES)
  // TODO: add glob support
  .arguments('<image>')
  .action((image, commandObj) => {
    const opts = commandObj.opts();

    if (opts.debug) {
      // TODO: add proper logger
      console.log('Inputs:', {
        ...opts,
        image,
      });
    }

    if (!image) {
      console.log('no image provided, exiting.');
      console.log(commandObj.opts());
      process.exit(1);
    }
    // TODO: ensure image is processable filetype

    // TODO: get image dimensions (https://www.npmjs.com/package/image-size)
    // TODO: use image dimensions to figure out correct sizes to create

    processImage({
      imagePath: image,
      widths: opts.widths,
      outputDir: opts.outputDirectory,
      formats: opts.formats,
    });
  });

// execute
// -------------------------------------------------------------------------
program.parse(process.argv);
