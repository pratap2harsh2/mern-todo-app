
import mongoose from "mongoose";

const todoschema = new mongoose.Schema(
    {
        text:{
            type:String,
            required: true,
        },
        completed:{
            type:Boolean,
            required:false,
        },

    },
    {timestamps:true}
)
const Todo =mongoose.model("Todo",todoschema)
export default Todo