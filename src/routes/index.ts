import * as express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
});

module.exports = router;
