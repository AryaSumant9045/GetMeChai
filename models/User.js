import mongoose, { mongo } from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema( {
    email : {type: String, required:true},
    name : {type: String},
    username : {type: String},
    profilepic: {type: String},
    coverpic: {type: String},
    createdAc: {type: Date, default: Date.now},
    updatedAc: {type: Date, default : Date.now}
})

export default mongoose.models.User || mongoose.model("User", UserSchema);
// const User = model("User", UserSchema)
// export default mongoose.model.User || User; 