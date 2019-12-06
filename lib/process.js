const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs-extra');

module.exports = function process(imagePath, { outputDir = false } = {}) {
  // TODO: verify that the image exists
  // fs.ensureFileSync(imagePath);
  shelljs.exec(`convert ${imagePath} -density 72 -units pixelsperinch -quality 50 -resize 500 output/neat.webp`);
  return true;
};
