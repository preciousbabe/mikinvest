const fs = require('fs-extra');
const glob = require('glob');

// ✅ Correct folder
const contentFiles = glob.sync('content/properties/*.json');

// Read and parse
const allProperties = contentFiles.map(file => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
});

// Optional sort
allProperties.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

// Write output
fs.writeFileSync(
  'public/properties.json',
  JSON.stringify(allProperties, null, 2)
);

console.log(`Aggregated ${allProperties.length} properties`);