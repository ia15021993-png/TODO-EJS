import mongoose from "mongoose";

export const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // 1. Mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    // 2. Invalid MongoDB ObjectId
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = "Invalid Todo ID";
    }

    // 3. Duplicate key error
    else if (err.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists";
    }

    // 4. Render a friendly error page
    res.status(statusCode).render("error", {
        statusCode,
        message
    });
};