"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('this is my world');
});
module.exports = router;
//# sourceMappingURL=routes.js.map