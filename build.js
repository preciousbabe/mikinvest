const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');

// Find all JSON files in /content/ (except properties.json to avoid loops)
const contentFiles = glob.sync('content/*.json', { 
  ignore: 'content/properties.json' 
});

// Read and parse all property files
const allProperties = contentFiles.map(file => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
});

// Optional: Sort by date (latest first)
allProperties.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write aggregated data to /public/properties.json
fs.writeFileSync(
  'public/properties.json',
  JSON.stringify(allProperties, null, 2)
);

console.log(`Aggregated ${allProperties.length} properties into public/properties.json`);