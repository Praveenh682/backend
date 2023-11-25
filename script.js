// opening a file

var fs = require("fs");
console.log("opening file!");
fs.open('input.txt', 'r+', function(err, fd) {
if (err) {
	return console.error(err);
}
console.log("File open successfully");	 
});


// reading a file

var fs = require("fs");
var buf = new Buffer(1024);

console.log("opening an existing file");
fs.open('input.txt', 'r+', function(err, fd) {
if (err) {
	return console.error(err);
}
console.log("File opened successfully!");
console.log("reading the file");
	
fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
	if (err){
		console.log(err);
	}
	console.log(bytes + " bytes read");
	
	// Print only read bytes to avoid junk.
	if(bytes > 0){
		console.log(buf.slice(0, bytes).toString());
	}
});
});


// writing to a file

var fs = require("fs");

console.log("writing into existing file");
fs.writeFile('input.txt', 'Praveen', function(err) {
if (err) {
	return console.error(err);
}
	
console.log("Data written successfully!");
console.log("Let's read newly written data");
	
fs.readFile('input.txt', function (err, data) {
	if (err) {
		return console.error(err);
	}
	console.log(" read: " + data.toString());
});
});
