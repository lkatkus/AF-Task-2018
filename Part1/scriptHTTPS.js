// Dependency imports
const https = require('https');

// Variables
let arr = []; /* Placeholder for street names */
let regex = /(?:"STREET": ")(\w*)"/g; /* Regular expression template */

let myRequest = https.get('https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json', (response) => {
    // Data event listener
    response.on('data', (chunk) => {
        // Convert buffer to string
        chunk = chunk.toString();
        // Pass loaded data chunk to parsing function
        parseData(chunk, regex);
    });

    response.on('end', () => {
        console.log(`Total number of street names: ${arr.length}`);
        // Display all street names
        console.log(arr.sort().join(', '));
    });
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
  
