/* eslint-env jest */

const fs = require('fs-extra');
const path = require('path');
const processImage = require('../process');

const resetDir = (dir) => {
  fs.removeSync(dir);
  fs.ensureDirSync(dir);
};

describe('processImage', () => {
  const outputDir = path.resolve(__dirname, 'images__output');
  let imagePath;
  let args;

  beforeAll(() => {
    resetDir(outputDir);
  });

  afterAll(() => {
    // fs.removeSync(outputDir);
  });

  beforeEach(() => {
    imagePath = path.resolve(__dirname, 'images__input/ali-pazani-1646879-unsplash.jpg');
    args = {
      imagePath,
      outputDir,
      formats: [
        'jpg',
        'webp',
        'jp2',
      ],
      widths: [
        'original',
        '1024',
        '640',
        '320',
      ],
    };
  });

  it('should work', () => {
    expect(() => processImage(args)).not.toThrow();
  });

  describe('output files', () => {
    beforeAll(() => {
      resetDir(outputDir);
      processImage(args);
    });

    it('should create an original copy in the output folder named <image-name>--original.{jpg,jp2,webp}', () => {
      // TODO: make async
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--original.jpg`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--original.jp2`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--original.webp`)).not.toThrow();
    });

    it('should create a 1024w version in the output folder named <image-name>--1024w.{jpg,jp2,webp}', () => {
      // TODO: make async
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--1024w.jpg`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--1024w.jp2`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--1024w.webp`)).not.toThrow();
    });

    it('should create a 640w version in the output folder named <image-name>--640w.{jpg,jp2,webp}', () => {
      // TODO: make async
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--640w.jpg`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--640w.jp2`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--640w.webp`)).not.toThrow();
    });

    it('should create a 320w version in the output folder named <image-name>--320w.{jpg,jp2,webp}', () => {
      // TODO: make async
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--320w.jpg`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--320w.jp2`)).not.toThrow();
      expect(() => fs.accessSync(`${outputDir}/ali-pazani-1646879-unsplash--320w.webp`)).not.toThrow();
    });
  });
});
