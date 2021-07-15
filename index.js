const PORT = 8080;
const app = require('express')();
const xl = require('excel4node');
const fetch = require('node-fetch');
const fs = require('fs');



var data; //storing data object after fetching url
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        data = myJson;
        //console.log(JSON.stringify(myJson));
    });


// this is heading of each columns 
const columnNames = [
        "UserID",
        "ID",
        "Title",
        "Body"
    ]

// funtion which is resposible for return json format...

app.get('/', (req, res)=>{
    res.json(data);
});

// function is resposible for download excel file of format....

app.get('/download', (req, res)=>{
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Worksheet Name'); 

     let index = 1;
     columnNames.forEach(columns =>{
         ws.cell(1, index++).string(columns);
     });

    
    let rowIndex = 2;
    data.forEach( record => {
    let columnIndex = 1;
    Object.keys(record ).forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string("" +record [columnName])
    });
    rowIndex++;
}); 

wb.write('ExcelFile.xlsx', function(err, stats) {
  if (err) {
    console.error(err);
  } else {
    console.log(stats); // Prints out an instance of a node.js fs.Stats object
  }
});
     wb.write('ExcelFile.xlsx', res);
});

// this is responsible for converting json file into csv file
app.get('/csv', (req, res)=>{
   let str ="";
    columnNames.forEach(columns =>{
        str = str + columns + ',';
    });
    str = str + '\n';
   
    data.forEach(record=>{
        
        Object.keys(record).forEach(value=>{
            let curStr = record[value].toString();
            curStr = curStr.replace(/\n/g, " ");
            str = str + curStr+",";
        });
        str = str + '\n';
    });

  res.attachment('filename.csv');
  res.type('csv');
  res.send(str);
    // res.send(str);
});    
app.listen(PORT);