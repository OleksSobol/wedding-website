#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sha = process.env.CF_PAGES_COMMIT_SHA || execSync('git rev-parse HEAD').toString().trim();
const version = sha.slice(0, 8);

const files = [
  path.join(__dirname, '../index.html'),
  path.join(__dirname, '../upload/index.html'),
];

files.forEach(function (file) {
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/\?v=[^"']+/g, '?v=' + version);
  fs.writeFileSync(file, src, 'utf8');
  console.log('Bumped ' + path.relative(process.cwd(), file) + ' → v=' + version);
});
