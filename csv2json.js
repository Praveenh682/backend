const csv = require('csvtojson');
const fs = require('fs');

// Sample CSV data
const csvFilePath = 'input.csv';

// Convert CSV to JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonData) => {
    // Display the JSON data
    console.log(jsonData);

    // Write the JSON data to a file
    fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log('JSON file has been created successfully');
  })
  .catch((error) => console.log(error));
