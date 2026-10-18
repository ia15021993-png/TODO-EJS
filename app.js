import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import methodOverride from "method-override";


import {getTodos , showCreateForm , createTodo , getTodo , showEditForm , updateTodo ,deleteTodo } from
 "./controllers/todo.controller.js";

 import { errorMiddleware } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// ejs
app.set("view engine" , "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));



// test route

app.get("/" , getTodos);

// show create

app.get("/new" , showCreateForm);

// create todo
app.post("/" , createTodo);



// show edit form
app.get("/:id/edit", showEditForm);

//update 
app.patch("/:id", updateTodo);

//delete todo
app.delete("/:id", deleteTodo);

// show one

app.get("/:id", getTodo);

// Handle unmatched URLs
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.statusCode = 404;
    next(err);
});
app.use(errorMiddleware);




// mongoDB conection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongoDB Connection");

    app.listen(process.env.PORT , () => {
        console.log(`server is running on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("MongoDB connection failed")
    console.log(err);
});