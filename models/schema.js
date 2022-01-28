const api = require('../db/index');

getFullSchema = async() => {

    const [schema] = await api('information_schema.tables')
        .select()
        .where({ 'table_schema': process.env.DATABASE_NAME });

    console.log(schema);
    if (!schema) {
        return null;
    }

    console.log("found schema");

    return {
        schema
        // id: user.ID_USER,
        // username: user.NOM_USER + " " + user.PRENOM_USER,
        // created_at: user.CREATED_AT,
    };
}

getSchemaDetails = async(tableName) => {

    const [table] = await api.raw("DESC " +
        tableName + ";");

    console.log(table);

    if (!table) {
        return null;
    }


    console.log("found schema details");


    // console.log(Object.values(JSON.parse(JSON.stringify(table))))

    var data = {}

    //casting it to k/v pairs
    for (var i = 0; i < table.length; i++) {
        if (table[i].Extra == "auto_increment")
            continue;
        console.log(table[i].Field)
        var { Field, ...obj } = table[i]
        data[table[i].Field] = obj
    }
    console.log("data")
    console.log(data)

    return {
        table: data
            // id: user.ID_USER,
            // username: user.NOM_USER + " " + user.PRENOM_USER,
            // created_at: user.CREATED_AT,
    };
}


getData = async(tableName, params) => {

    console.log("Getting data")
    const data = await api(tableName)
        .select()
        .where(params);

    console.log(data);
    if (!data) {
        return null;
    }

    console.log("found data");

    return {
        data: data
            // id: user.ID_USER,
            // username: user.NOM_USER + " " + user.PRENOM_USER,
            // created_at: user.CREATED_AT,
    };
}

var clearAutoIncrement = (obj) => {
    return !(obj['Extra'] == 'auto_increment')
}



module.exports = {

    getFullSchema,
    getSchemaDetails,
    getData,
    clearAutoIncrement,

}