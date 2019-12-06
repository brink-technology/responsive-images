/* eslint-env jest */

const fs = require('fs-extra');
const path = require('path');
const process = require('../process');

describe('process', () => {
  const outputDir = path.resolve(__dirname, 'images__output');
  let imagePath;

  beforeAll(() => {
    fs.ensureDirSync(outputDir);
  });

  afterAll(() => {
    // fs.removeSync(outputDir);
  });

  beforeEach(() => {
    imagePath = 'lib/tests/images__input/ali-pazani-1646879-unsplash.jpg';
  });

  it('should work', () => {
    expect(process(imagePath)).toEqual(expect.anything());
  });
});
