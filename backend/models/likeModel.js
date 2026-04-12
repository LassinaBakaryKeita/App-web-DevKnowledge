const mongoose= require("mongoose");

const likeModel= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    articleId:{
        type:String,
        required:true
    },
   
},

{
    timestamps:true
}
);

const Like = mongoose.model("Like",likeModel);

module.exports=Like;