let mysql = require('mysql');
const bscrypt = require('bcryptjs');

// SELECT ALL
exports.index = async (req, res) => {
    try{
        queryAll( result => {
            res.status(200).json({
                data: result
            });
        });
    }catch(err){
        res.status(400).json({
            messange: err.messange
        });
    }
}

// SELECT by id
exports.getUserById = async (req, res) => {

    let {id} = req.params;
    console.log('id '+ id )
    
    try{
        queryById(id, result => {
            console.log(result);
            res.status(200).json({
                data: result
            });
        });
    }catch(err){
        res.status(400).json({
            messange: err.messange
        });
    }
    
}

// INSERT
exports.insertUser = async (req, res) => {

    const {name, email, password}  = req.body;

    //hash password
    const salt = await bscrypt.genSalt(8);
    const passwordHash = await bscrypt.hash(password, salt);

    const data = {name, email, passwordHash};

    try{
        insert(data, result => {
            res.status(200).json({
                message: 'add data complete',
                data: result
            });
        });
    }catch(err){
        res.status(400).json({
            messange: err.messange
        });
    }
}

//DELETE
exports.deleteUser = async (req, res) => {

    const {id}  = req.params;

    try{
        deleteById(id, result => {
            res.status(200).json({
                message: 'delete data complete',
                data: result
            });
        });
    }catch(err){
        res.status(400).json({
            messange: err.messange
        });
    }
}

/** Internel Function **/

function queryAll(callback){

    let db = openDB();
    let sqlStatement = "SELECT * FROM users";
    db.query(sqlStatement, (err, result) => {
        if (err) throw err;
        closeDB(db);
        callback(result);
    });
        
}

function queryById(id, callback){
    let db = openDB();
    let sqlStatement = `SELECT * FROM users WHERE id=${id}`;
    db.query(sqlStatement, (err, result) => {
        if (err) throw err;
        closeDB(db);
        callback(result);
    });
}

function insert(data ,callback){

    let {name, email, passwordHash} = data
    let db = openDB();

    let sqlStatement = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${passwordHash}')`;
    db.query(sqlStatement, (err, result) => {
        if (err) throw err;
        closeDB(db);
        callback(result);
    });

}

function deleteById(id, callback){

    let db = openDB();
    let sqlStatement = `DELETE FROM users WHERE id = '${id}'`;
    db.query(sqlStatement, (err, result) => {
        if (err) throw err;
        closeDB(db);
        callback(result);
    });

}

function openDB(){

    const con = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "expressdb"
    });
      
    con.connect((err) => {
        if (err) throw err;
        console.log("DB Connected!");
    });

    return con;
}

function closeDB(db){
    db.end(err => {
        if(err) throw(err);
    });
    console.log('db closed');
}