const json2csv = require('json2csv').parse;
const fs = require('fs');

// Sample JSON data
const jsonData = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'San Francisco' },
  // Add more data as needed
];

// Specify the fields you want to include in the CSV
const fields = ['name', 'age', 'city'];

// Convert JSON to CSV
const csv = json2csv(jsonData, { fields });

// Write the CSV to a file
fs.writeFileSync('output.csv', csv, 'utf-8');

console.log('CSV file has been created successfully');
