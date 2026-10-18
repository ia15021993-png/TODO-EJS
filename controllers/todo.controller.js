import Todo from "../models/todo.model.js";


// ========================
// READ ALL
// ========================

export const getTodos = async (req, res, next) => {

    try {

        const todos = await Todo.find();

        res.render("todos/index", {
            todos
        });

    } catch (err) {

        next(err);

    }
};


// ========================
// SHOW CREATE FORM
// ========================

export const showCreateForm = (req, res) => {

    res.render("todos/new");

};


// ========================
// CREATE
// ========================

export const createTodo = async (req, res, next) => {

    try {

        await Todo.create(req.body);

        res.redirect("/");

    } catch (err) {

        next(err);

    }
};

// ========================
// READ ONE
// ========================

export const getTodo = async (req, res, next) => {

    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {

            return res.status(404).send("Todo not found");

        }

        res.render("todos/show", {
            todo
        });

    } catch (err) {

        next(err);

    }
};

// ========================
// SHOW EDIT FORM
// ========================

export const showEditForm = async (req, res, next) => {

    try {

        const todo = await Todo.findById(req.params.id);

        if (!todo) {

            return res.status(404).send("Todo not found");

        }

        res.render("todos/edit", {
            todo
        });

    } catch (err) {

        next(err);

    }
};

// ========================
// UPDATE
// ========================

export const updateTodo = async (req, res, next) => {

    try {

        const {
            title,
            description,
            completed
        } = req.body;


        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                completed: completed === "true"
            },
            {
                new: true,
                runValidators: true
            }
        );


        if (!todo) {

            return res.status(404).send("Todo not found");

        }


        res.redirect(`/${todo._id}`);

    } catch (err) {

        next(err);

    }
};

// ========================
// DELETE
// ========================

export const deleteTodo = async (req, res, next) => {

    try {

        const todo = await Todo.findByIdAndDelete(
            req.params.id
        );

        if (!todo) {

            return res.status(404).send("Todo not found");

        }

        res.redirect("/");

    } catch (err) {

        next(err);

    }
};