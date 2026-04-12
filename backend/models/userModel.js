const mongoose= require("mongoose");
const {isEmail}= require('validator');
const bcrypt= require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2,
        maxLength:25,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate:[isEmail],
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:100,
    },  
},
{
    timestamps:true,
}
);


// MiddleWare Mongoose : Hachage du mot de passe avant la sauvegarde
userSchema.pre("save", async function() { // Retrait de "next" ici
    // On ne hache que si le mot de passe a été modifié ou est nouveau
    if (!this.isModified("password")) return; // Retrait de "return next()"

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Plus besoin d'appeler next() ici, la fin de la fonction async suffit
    } catch (err) {
        throw err; // On lance l'erreur pour que le bloc catch du contrôleur la récupère
    }
});


const User= mongoose.model("User",userSchema);

//export default User;

module.exports=User;

