const Database = require('./db.js')
const createProffy = require('./createProffy')
Database.then(async (db) => {
    // Inserir dados

    proffyValue = {
        name: 'Elmo',
        avatar: 'https://img.ibxk.com.br/ns/rexposta/2018/08/27/27000010472692.jpg?watermark=neaki&w=600',
        whatsapp: '3194444-6666',
        bio: 'Instrutor de educação física na Vila Sesamo'
    }

    classesValue = {
        subject: 3,
        cost: '70'
        // O proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // O classes_id virá pelo banco de dados, após cadastrarmos a classes
        {
            weekday: 1,
            time_from: 950,
            time_to: 1500
        },
        {
            weekday: 2,
            time_from: 550,
            time_to: 1300
        },
        {
            weekday: 3,
            time_from: 1000,
            time_to: 1800
        }
    ]

    /*  createProffy(db, {proffyValue,classesValue,classScheduleValues}) */

    // Consultar dados inseridos

    // Todos os proffys

     const selectedProffys = await db.all("SELECT * FROM proffys") 

    // Consultar as classes de um determinado professor e trazer junto os dados do professor

    const selectedClassesAndProffys = await db.all(`
        SELECT proffys.*, classes.* 
        FROM proffys
        JOIN classes ON (classes.proffys_id = proffys.id_proffys)
        WHERE classes.proffys_id = 1;
    `)

    // O horário que a pessoa trabalha, por exemplo é das 08:00 até as 18:00
    // O horário do time_from (08:00) precisa ser menor ou igual ao horário solicitado 
    // O time_to precisa ser obrigatoriamente acima

    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.classes_id = 1
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "1500"
        AND class_schedule.time_to > "1500"
    `)
})