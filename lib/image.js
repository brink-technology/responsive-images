/* eslint-env node */

// TODO: bundle into es5-able dist

const shell = require('shelljs');
const nodepath = require('path');
const fs = require('fs-extra');
// TODO: install IM package and use to get image stats for widths

function ensureImageExists(path) {
  try {
    // TODO: convert to async
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}

function getImageOutputPath({
  imagePathParams,
  imageOutputPathParams,
  width,
  format,
}) {
  let filename;
  if (width === 'original') {
    filename = `${imagePathParams.name}--original.${format}`;
  } else {
    filename = `${imagePathParams.name}--${width}w.${format}`;
  }
  return nodepath.resolve(imageOutputPathParams.dir, imageOutputPathParams.base, filename);
}

const createCommand = ({
  imagePath,
  outputPath,
  width,
}) => {
  if (width === 'original') {
    return `
      convert ${imagePath}
        -strip
        -interlace Plane
        -define jp2:quality=100
        -quality 100
        ${outputPath}
    `.replace(/\s+/g, ' ');
  }
  return `
    convert ${imagePath}
      -strip
      -interlace Plane
      -define jp2:quality=75
      -quality 75
      -resize ${width}
      ${outputPath}
  `.replace(/\s+/g, ' ');
};

function processImage({
  imagePath,
  outputDir,
  width,
  format,
}) {
  if (!ensureImageExists(imagePath)) {
    return false;
  }

  const imagePathParams = nodepath.parse(imagePath);
  const imageOutputPathParams = nodepath.parse(outputDir);

  const outputPath = getImageOutputPath({
    imagePathParams,
    imageOutputPathParams,
    width,
    format,
  });

  // TODO: make async
  const command = shell.exec(createCommand({
    imagePath,
    outputPath,
    width,
  }));
  if (command.code !== 0) {
    // TODO: find out how to extract actual errors here
    shell.echo('Error: convert failed on image');
    return false;
  }
  return true;
}

function processImages({
  imagePath,
  outputDir,
  widths,
  formats,
}) {
  // TODO: turn in to data processing pipeline
  fs.ensureDirSync(outputDir);

  return widths.map((x) => formats.map((y) => processImage({
    imagePath,
    outputDir,
    width: x,
    format: y,
  })));
}

module.exports = processImages;
