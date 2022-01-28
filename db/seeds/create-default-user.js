const bcrypt = require('bcrypt');



exports.seed = async function seed(knex) {
    const hashedPass = await bcrypt.hash('secret', 5);
    // Deletes ALL existing entries
    await knex('USER').insert({
        NOM_USER: 'Nobody',
        PRENOM_USER: 'Knows',
        PASSWORD: hashedPass,
        EMAIL: 'nemo@outis.com',
        CREATED_AT: new Date(Date.now()),
        UPDATE_AT: new Date(Date.now()),
        VERIFIED_AT: new Date(Date.now()),
        JOUR_ENREGISTREMENT: new Date(Date.now()),
    });

};