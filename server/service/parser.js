const fs = require('fs');
const pdf = require('pdf-parse');
 
function parser(file_path){
    let dataBuffer = fs.readFileSync(file_path);
 
    pdf(dataBuffer).then(function(data) {
        console.log(data.numpages);
        console.log(data.numrender);
        console.log(data.info);
        console.log(data.metadata); 
        console.log(data.version);
        console.log(data.text);             
    });
    
}