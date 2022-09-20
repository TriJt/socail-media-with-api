import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"

// create new conversation
export const CreateMessage = async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error)
    }
}


// get conversation 

export const GetMessage = async (req, res) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
}