module.exports = async function(db, {proffyValue, classesValue, classScheduleValues}){
    // Inserir dados na table de proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}", 
            "${proffyValue.avatar}", 
            "${proffyValue.whatsapp}", 
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela classes

    const insertedClasses = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffys_id
            ) VALUES (
                "${classesValue.subject}",
                "${classesValue.cost}",
                "${proffy_id}"
            );
    `)

    const classes_id = insertedClasses.lastID

    // Inserir dados na tabela classes_shedule

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                classes_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${classes_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // Executar todos os db.run() das class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}