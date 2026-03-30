const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

console.log("Building properties...");

// Find all JSON files in content/properties/
const propertyFiles = glob.sync('content/properties/*.json');

const properties = propertyFiles.map(file => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
});

// Optional: Sort by newest first (if you add a date field later)
properties.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

const outputDir = 'public/content/properties';
fs.ensureDirSync(outputDir);

// Write the aggregated array
fs.writeFileSync(
  path.join(outputDir, 'index.json'), 
  JSON.stringify(properties, null, 2)
);

console.log(`✅ Aggregated ${properties.length} properties into public/content/properties/index.json`);