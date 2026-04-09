const fs = require('fs');
let data = fs.readFileSync('src/data.js', 'utf8');

// The duplicates are Vercel, Netlify, Render, Heroku, AWS Amplify (ids 455-459 appearing twice)
// They are contiguous duplicate blocks - we need to remove the second occurrence of each

// Strategy: find each product block by id, track seen ids, remove duplicate blocks
const lines = data.split(/\r?\n/);
const result = [];

let currentId = null;
let seenIds = new Set();
let blockLines = [];
let inBlock = false;
let blockDepth = 0;
let skipBlock = false;

let i = 0;
while (i < lines.length) {
  const line = lines[i];
  
  // Detect start of a product object: a line that is just "  {" (two spaces + brace)
  if (!inBlock && line.match(/^\s*\{\s*$/) && i + 2 < lines.length && lines[i+1].includes('"id":')) {
    inBlock = true;
    blockLines = [line];
    blockDepth = 1;
    i++;
    continue;
  }
  
  if (inBlock) {
    blockLines.push(line);
    
    // Check id when we see it
    if (line.includes('"id":') && currentId === null) {
      const match = line.match(/"id":\s*(\d+)/);
      if (match) {
        currentId = parseInt(match[1]);
        skipBlock = seenIds.has(currentId);
        if (!skipBlock) seenIds.add(currentId);
      }
    }
    
    // Count braces to detect end of block
    // Actually track based on "  }," pattern (end of top-level object)
    if (line.match(/^\s{2}\},?\s*$/) && blockDepth === 1) {
      // End of block
      if (!skipBlock) {
        result.push(...blockLines);
      } else {
        console.log(`Removed duplicate block: id=${currentId}`);
      }
      blockLines = [];
      inBlock = false;
      currentId = null;
      skipBlock = false;
      blockDepth = 0;
      i++;
      continue;
    }
    
    // Track brace depth for nested objects
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    blockDepth += opens - closes;
    
    i++;
    continue;
  }
  
  result.push(line);
  i++;
}

fs.writeFileSync('src/data.js', result.join('\n'));
console.log('Done! Removed duplicate product blocks.');

// Verify
const newData = fs.readFileSync('src/data.js', 'utf8');
const vercelCount = (newData.match(/"title": "Vercel"/g) || []).length;
console.log('Vercel count after fix:', vercelCount, '(should be 1)');
