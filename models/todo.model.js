import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title : {type : String , required : true , minlength :3 , maxlength :100 , trim : true },
    description : {type : String , maxlength : 500 , trim : true },
    completed : {type : Boolean , default : false}
} , {timestamps : true});

const Todo = mongoose.model("Todo" , todoSchema);

export default Todo; 