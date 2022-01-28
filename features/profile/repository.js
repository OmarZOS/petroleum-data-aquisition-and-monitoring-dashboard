const knex = require('../../db');

async function getUser(id) {

    console.log(id)
    const [user] = await knex('USER')
        .where('ID_USER', id)
        .select('EMAIL', 'NOM_USER');
    return user;
}

async function updateUserInfo({ NOM_USER, EMAIL, ID_USER }) {
    const [user] = await knex('USER')
        .where({ ID_USER })
        .update({
            NOM_USER,
            EMAIL,
            UPDATE_AT: new Date(),
        })
        .returning(['EMAIL', 'NOM_USER']);
    return user;
}

module.exports = {
    getUser,
    updateUserInfo,
};