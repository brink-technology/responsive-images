/* eslint-env jest */

const path = require('path');
const { exec } = require('child_process');

function cli(args, cwd) {
  return new Promise((resolve) => {
    const command = `node ${path.resolve(process.cwd(), 'bin/responsive-images')} ${args.join(' ')}`;
    exec(command,
      { cwd },
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr,
        });
      });
  });
}

describe('program', () => {
  describe('usage: image only', () => {
    it('should finish with a code 0', async () => {
      const image = './images__input/ali-pazani-1646879-unsplash.jpg';
      const result = await cli([image], '.');
      expect(result.code).toBe(0);
    });
  });
});
