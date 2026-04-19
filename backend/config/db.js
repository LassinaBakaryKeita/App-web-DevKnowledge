const mongoose= require("mongoose");
//require('dotenv').config({path:'./config/.env'});

const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log("Connexion à  MongoDB Atlas reussie !!!");    
    }catch(error){
        console.log("Connexion à MongoDB Atlas echouée "+error);
    }
};

//export default connectDB;

module.exports= connectDB;