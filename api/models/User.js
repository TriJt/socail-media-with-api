import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please enter your full Name!!"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username!!"],
        min: 8,
        max: 50,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!!"],
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!!"],
        min: 8
    },
    profilePicture: {
        type: [String],
        default: "https://docsach24.co/no-avatar.png"
    },
    coverPicture: {
        type: [String],
        default: "https://docsach24.co/no-avatar.png"
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 100
    },
    sex: {
        type: String
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: String,

    }

}, {
    timestamps: true
})
const User = mongoose.model('User', UserSchema);
export default User;