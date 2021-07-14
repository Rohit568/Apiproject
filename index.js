const PORT = 8080;
const app = require('express')();
const xl = require('excel4node');
const fetch = require('node-fetch');

//const url = "https://jsonplaceholder.typicode.com/posts";


//const fetch = require('node-fetch');
var data;
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        data = myJson;
        //console.log(JSON.stringify(myJson));
    });

var obj = [{
    id : "1",
    title: "covid-3 wave",
    author: "experts",
    publishDate : Date.now + "rohit",
    description : "Experts says herd immunity is working on some exstinct",
   
    
},
{
    id : "2",
    title : "job opportunity in IT field",
    author : "john",
    publishDate : Date.now,
    description: "Due to corona mahamari IT field jobs increases by 70 percent",
    
}
];

const columnNames = [
        "UserID",
        "ID",
        "Title",
        "Body"
    ]


app.get('/', (req, res)=>{
    res.json(data);
});

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

app.get('')
     
app.listen(PORT);