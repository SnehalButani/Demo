const express = require("express");
const config = require('config');
const app = express();
const port = 8000;
const hostname = "127.0.0.1";
const database = require("./databases/database");
const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const bodyParser = require("body-parser");
const formidable = require('express-formidable');

if (!config.get('PrivateKey')) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(formidable());
// app.use(
//     formidable({
//         uploadDir: 'uploads/',
//         keepExtensions: true,
//     })
// );
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});