const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('dist/index.html');
assert(html.indexOf('css/bootstrap.min.css') < html.indexOf('css/index.min.css'));
assert(html.indexOf('js/bootstrap.bundle.min.js') < html.indexOf('js/index.js'));
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|mailto:|tel:)/.test(match[1])) assert(fs.existsSync(path.join(root, 'dist', match[1])), match[1]);
}
const css = read('dist/css/index.min.css');
for (const selector of ['.profile', '.contact', '.languages', '.experience', '.sidebar', '.page-footer']) assert(css.includes(selector), selector);
assert(css.split('\n').length < 5, 'Project CSS must be compressed');
assert.equal(JSON.parse(read('package.json')).devDependencies.bootstrap, '5.3.8');
console.log('PASS: local assets, Bootstrap ordering, section styles, minification and devDependency.');
