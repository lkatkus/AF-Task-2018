// Dependency imports
const https = require('https');

// Variables
let arr = []; /* Placeholder for street names */
let regex = /(?:"STREET": ")(\w*)"/g; /* Regular expression template */

https.get('https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json', (response) => {
    console.log('Trying to fetch data. Please wait.');
    
    if(response.statusCode === 200){
        // Data received event listener
        response.on('data', (chunk) => {
            // Convert buffer to string
            chunk = chunk.toString();
            // Pass loaded data chunk to parsing function
            parseData(chunk, regex);
        });

        // Response end event listener
        response.on('end', () => {
            console.log(`Total number of street names: ${arr.length}`);
            // Display all street names
            console.log(arr.sort().join(', '));
        });

        response.on('error', (err) => {
            console.log('Error', err);
        })
    }else{
        console.log(`Unable to fetch data. Error code: ${response.statusCode}`);
    }

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
  
