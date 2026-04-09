const fs = require('fs');
let data = fs.readFileSync('src/data.js', 'utf8');

// Parse to find all products and their categories
const lines = data.split(/\r?\n/);

let currentId = null;
let currentTitle = null;
let currentCategory = null;
let products = [];
let productStart = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.match(/^\s*\{\s*$/)) {
    productStart = i;
  }
  
  if (line.includes('"id":')) {
    const match = line.match(/"id":\s*(\d+)/);
    if (match) currentId = parseInt(match[1]);
  }
  
  if (line.includes('"title":') && !line.includes('"subtitle":') && !line.includes('"Type":') && !line.includes('"comment":')) {
    const match = line.match(/"title":\s*"([^"]+)"/);
    if (match) currentTitle = match[1];
  }
  
  if (line.includes('"category":')) {
    const match = line.match(/"category":\s*"([^"]+)"/);
    if (match) currentCategory = match[1].trim();
  }
  
  if (line.trim() === '},') {
    if (currentId && currentTitle && currentCategory) {
      products.push({ id: currentId, title: currentTitle, category: currentCategory });
    }
    currentId = null;
    currentTitle = null;
    currentCategory = null;
  }
}

console.log('\n=== ALL PRODUCTS BY CATEGORY ===');
const cats = {};
products.forEach(p => {
  if (!cats[p.category]) cats[p.category] = [];
  cats[p.category].push(p.title);
});

Object.entries(cats).forEach(([cat, titles]) => {
  console.log(`\n${cat} (${titles.length}):`, titles.join(', '));
});

console.log('\n=== PLATFORM TOOLS IN WRONG CATEGORIES ===');
const platformTools = ['Vercel', 'Netlify', 'Render', 'Heroku', 'AWS Amplify'];
products.forEach(p => {
  if (platformTools.includes(p.title) && p.category !== 'TOOLS') {
    console.log(`WRONG: "${p.title}" is in "${p.category}" (id: ${p.id})`);
  }
});

console.log('\n=== DUPLICATES ===');
const seen = {};
products.forEach(p => {
  const key = p.title;
  if (!seen[key]) seen[key] = [];
  seen[key].push({ id: p.id, category: p.category });
});
Object.entries(seen).forEach(([title, occurrences]) => {
  if (occurrences.length > 1) {
    console.log(`DUPLICATE: "${title}" found ${occurrences.length} times:`, JSON.stringify(occurrences));
  }
});
