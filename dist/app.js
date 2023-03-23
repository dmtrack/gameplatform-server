const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
import * as http from 'http';
app.use(cors());
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
//# sourceMappingURL=app.js.map