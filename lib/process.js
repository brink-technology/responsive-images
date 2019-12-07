/* eslint-env node */

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
}) {
  let filename;
  if (width === 'original') {
    filename = `${imagePathParams.name}--original${imagePathParams.ext}`;
  } else {
    filename = `${imagePathParams.name}--${width}w${imagePathParams.ext}`;
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
        -quality 100
        ${outputPath}
    `.replace(/\s+/g, ' ');
  }
  return `
    convert ${imagePath}
      -quality 100
      -resize ${width}
      ${outputPath}
  `.replace(/\s+/g, ' ');
}

function processImage({
  imagePath,
  outputDir,
  width,
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
}) {
  // TODO: turn in to data processing pipeline
  return widths.map(x => processImage({
    imagePath,
    outputDir,
    width: x,
  }));
}

module.exports = processImages;
