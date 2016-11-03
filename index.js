#!/usr/bin/env node
'use strict'

const fs = require('fs')
const compress = require('brotli/compress')

if (process.argv.length === 2) {
  console.log(process.argv[1] + ' <file1> [file2] [file3]')
  process.exit(1)
}

function run(fileName) {
  let stat = fs.statSync(fileName)
  const origSize = stat.size
  let data = compress(fs.readFileSync(fileName))
  let savedSize = origSize - data.length
  let percent = (savedSize / (origSize/100))
  console.log(fileName + ': ' + origSize + ' -> ' + data.length + ' # ' + percent + '%')
}

// fs.realpathSync
for (let i=2; i<process.argv.length; i++) {
  let fileName = process.argv[i]
  if (fs.existsSync(fileName)) {
    run(fileName)
  }
}
