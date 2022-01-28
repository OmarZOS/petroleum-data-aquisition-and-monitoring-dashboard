const express = require('express');

const router = express.Router();

const mountRegisterRoutes = require('../features/register/routes');
const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
const mountResetPasswordRoutes = require('../features/reset-password/routes');
const mountProfileRoutes = require('../features/profile/routes');

// const mapMaker = require('../controllers/dashboard')
const mainTable = require('../models/mainTable')
const dailyTable = require('../models/insertables')
    // const learningModel = require('')
    // const predictionModel = require('')

function isAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, async(req, res) => {
    // var builder = mapMaker.mapBuilder;

    const model = await mainTable.getModel()
    console.log("Model locked and loaded")
    const currentData = await mainTable.currentData(mainTable.tableName, {});

    res.render('pages/dashboard', {
            scopes: model,
            dateien: currentData,
        }

    );
});

router.get('/icons', isAuthenticated, (req, res) => {
    res.render('pages/icons');
});

router.get('/maps', isAuthenticated, (req, res) => {
    res.render('pages/maps');
});

router.get('/tables', isAuthenticated, async(req, res) => {
    const model = await mainTable.getModel()
    console.log("Model locked and loaded")
    const currentData = await mainTable.currentData(mainTable.tableName, {});

    res.render('pages/tables', {
        name: mainTable.tableName,
        scopes: model,
        dateien: currentData,
    })
});

router.get('/JaugageData', isAuthenticated, async(req, res) => {

    const model = await dailyTable.getModel()
    console.log(model)
    res.render('pages/JaugageData', {
        scopes: model
    });
});


router.get('/learning', isAuthenticated, (req, res) => {
    res.render('pages/learning');
});

router.get('/prediction', isAuthenticated, (req, res) => {
    res.render('pages/prediction');
});



mountRegisterRoutes(router);
mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
mountResetPasswordRoutes(router);
mountProfileRoutes(router, [isAuthenticated]);

module.exports = router;