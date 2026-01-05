const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

//to create connection between node and mysql
const connection  = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:''
});

let getRandomUser = () => {
  return [
     faker.datatype.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
  ];
};

//Inserting New Data
let q = "INSERT INTO user (id, username,email,password) VALUES ?";

let data = [];
for(let i = 1; i <= 100; i++){
    data.push(getRandomUser());
}
// let user = ["123","adam","adam@yahoo.com","adam@123"];
// let users = [["123b","adamb","adamb@yahoo.com","adamb@123"], ["123c","adamc","adamc@yahoo.com","adamc@123"]];


try{
    connection.query(q, [data],  (err, result)=>{
        if(err) throw err;
        console.log(result);
        // console.log(result.length);
        // console.log(result[0]);
        // console.log(result[1]);
    });
}catch(err){
    console.log(err);
}

connection.end();






// console.log(getRandomUser());
