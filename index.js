const express = require("express");
const config = require('config');
const app = express();
const port = 8000;
const hostname = "127.0.0.1";
const database = require("./databases/database");
const userRouter = require("./routers/user");

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/users', userRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});