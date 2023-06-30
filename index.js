const express = require("express");
const app = express();
const port = 8000;
const hostname = "127.0.0.1";
const database = require("./databases/database");
const userRouter = require("./routers/user");


app.use(express.json());
app.use(express.urlencoded());
app.use(userRouter);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});