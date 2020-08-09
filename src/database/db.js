const Database = require('sqlite-async')

function execute(db){
    // Criar as tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id_proffys INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id_classes INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffys_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule(
            id_class_schedule INTEGER PRIMARY KEY AUTOINCREMENT,
            classes_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)