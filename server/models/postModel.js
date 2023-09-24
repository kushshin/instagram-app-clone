import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    postOwner: {
        type: mongoose.Schema.Types.ObjectId, ref: "user",
        required: true
    },
    comments: [
        {
            text: { type: String },
            username: { type: String },
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
        }
    ],

})

const PostModel = mongoose.model("post", postSchema)

export default PostModel