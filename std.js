var { Client } = require('pg');
var client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "yash3010",
    database: "yash"
});
/*client.connect();
client.query(`Select * from std_user`, (err, res) => {
    if (!err)
        console.log(res.rows);
    //response.end(res.rows);
    else
        console.log(err.message);
    client.end;
});

module.exports = client;*/


client.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
    console.log('http://localhost:3000/');
});
module.exports = client;