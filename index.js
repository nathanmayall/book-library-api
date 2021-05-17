const app = require("./src/app");

const APP_PORT = process.env.APP_PORT;

app.listen(APP_PORT, console.log("App listening on port 5000"));
