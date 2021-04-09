const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

mongoose
    .connect(
        "mongodb+srv://remyang2:v4ZeiEwsWwMFr7xU@cluster0.anvuw.mongodb.net/Database?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use("/api", routes);

        app.listen(5000, () => {
            console.log("Server running...")
        });
    })
    .catch(err => console.log(err));
