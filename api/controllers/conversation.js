import Conversation from "../models/Conversation.js"

// create new conversation
export const CreateConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error)
    }
}


// get conversation  of user

export const GetConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {
                $in: [req.params.userId]
            },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}