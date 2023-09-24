import express from 'express'
import PostModel from '../models/postModel.js'
import UserModel from '../models/authModel.js'
import { verifyToken } from './authRoute.js'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})

const upload = multer({ storage: storage })



//get All user

router.get('/alluser/:userid', async (req, res) => {
    try {
        const allUser = await UserModel.find()
        const otherUser = allUser.filter((user) => {
            return user._id.toString() !== req.params.userid
        })
        res.status(200).json(otherUser)
    } catch (error) {
        res.status(501).json("Internal server error")
    }
})

//get single user
router.get('/singleuser/:id', async (req, res) => {
    try {
        const singleUser = await UserModel.findOne({ _id: req.params.id })
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(501).json("Internal server error")
    }
})

//update profile
router.post('/updateduser', upload.single("Pic"), async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate({ _id: req.body.userId }, { username: req.body.name, profilePic: req.file.originalname })
        res.status(200).json(user)

    } catch (error) {
        res.status(501).json("Internal server error")
    }


})


// create Post

router.post('/createpost', upload.single("image"), async (req, res) => {
    try {
        const newPost = new PostModel({
            title: req.body.title,
            desc: req.body.desc,
            image: req.file.originalname,
            postOwner: req.body.user
        })
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(501).json("Internal server error")
    }
})



//delete post
router.delete("/deletepost/:id", verifyToken, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        if (post.postOwner.toString() === req.user.id) {
            await PostModel.findByIdAndDelete(req.params.id);
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json("You can delete only your post!");
    }
});

//like dislike post

router.put("/like/:postid/:userid", async (req, res) => {
    try {
        const postlike = await PostModel.findByIdAndUpdate(req.params.postid, { $push: { likes: req.params.userid } }, { new: true })

        res.status(200).json(postlike);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});

router.put("/dislike/:postid/:userid", async (req, res) => {
    try {
        const postdislike = await PostModel.findByIdAndUpdate(req.params.postid, { $pull: { likes: req.params.userid } }, { new: true })

        res.status(200).json(postdislike);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});

router.put("/comment/:id", async (req, res) => {
    const comment = {
        text: req.body.text,
        commentedBy: req.body.userId,
        username: req.body.username
    }
    try {
        const comments = await PostModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true }).populate("comments.commentedBy", "_id")

        res.status(200).json(comments);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});


router.delete("/deletecomment/:postid/:username", async (req, res) => {
    try {
        const post = await PostModel.findOne({ _id: req.params.postid })

        if (post.comments.username === req.params.username)
            await post.comments.username.remove()


        res.status(200).json(post);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});




router.put('/follow/:userid', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.body.Id, { $push: { followers: req.params.userid } }, { new: true })
        const currentUser = await UserModel.findByIdAndUpdate(req.params.userid, { $push: { following: req.body.Id } }, { new: true })

        res.status(200).json({ user })
    } catch (error) {
        res.status(401).json("Internal server error")
    }
})

router.put('/unfollow/:userid', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.body.Id, { $pull: { followers: req.params.userid } }, { new: true })
        const currentUser = await UserModel.findByIdAndUpdate(req.params.userid, { $pull: { following: req.body.Id } }, { new: true })

        res.status(200).json({ user })
    } catch (error) {
        res.status(401).json("Internal server error")
    }
})









export default router







