import mongoose, { Schema } from "mongoose";
// ngày 5 tháng 8 năm 2022
// Tạo model Otp để gửi otp qua email 
const OptSchema = new mongoose.Schema({
    email:{ 
        type: String,
        required: true
    }, 
    code:{ 
        type: String
    }, 
    expireIn:{ 
        type: Number
    }

},{timestamps: true})

const Otp = mongoose.model("Otp", OptSchema);
export default Otp; 