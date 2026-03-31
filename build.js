const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

console.log("🚀 Building properties...");

// Get all property JSON files
const files = glob.sync('content/properties/*.json');

const properties = files.map(file => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
});

// Sort (optional)
properties.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

// Ensure public folder exists
fs.ensureDirSync('public');

// Write ONE clean file
fs.writeFileSync(
  'public/properties.json',
  JSON.stringify(properties, null, 2)
);

console.log(`✅ Aggregated ${properties.length} properties → public/properties.json`);