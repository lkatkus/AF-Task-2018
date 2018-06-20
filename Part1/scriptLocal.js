// NOTE
// Please copy citylots.json file to ./json folder before starting

// Dependency imports
const fs = require('fs');

// Variables
let arr = []; /* Placeholder for street names */
let regex = /(?:"STREET": ")(\w*)"/g; /* Regular expression template */

// Start file reading stream
let stream = fs.createReadStream('./json/citylots.json');

console.log('Trying to fetch data. Please wait.');

// Stream event listener for receiving data chunk
stream.on('data', (chunk) => {
    // Convert buffer to string
    chunk = chunk.toString();
    // Pass loaded data chunk to parsing function
    parseData(chunk, regex);
});

// Stream end event listener
stream.on('end', () => {
    console.log(`Total number of street names: ${arr.length}`);
    // Display all street names
    console.log(arr.sort().join(', '));
});

// Stream error handler
stream.on('error', (err) => {
    console.log('Unable to fetch data. Please check if citylots.json is present', err);
})

// Parse stream data chunk
const parseData = (string, regex) => {
    let match;
    while ((match = regex.exec(string)) !== null) {
        // Check if street name exists
        if(arr.includes(match[1])){
            // Skip if name already exists
            continue;
        }else{
            // Push to array if new name
            arr.push(match[1]);
        }
    }
  }
  
