import express from 'express'
import PostModel from '../models/postModel.js'
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

//get All post

router.get('/allpost', async (req, res) => {
    try {
        const AllPost = await PostModel.find()

        res.status(200).json(AllPost)
    } catch (error) {
        res.status(501).json("Internal server error")
    }
})


// create Post

router.post('/createpost', upload.single("image"), async (req, res) => {
    // console.log(req.body)
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

//mypost
router.get("/mypost/:id", async (req, res) => {
    try {
        const mypost = await PostModel.find({ postOwner: req.params.id })
        res.status(200).json(mypost)
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
    // console.log(req.params)
    console.log(req.body)
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
        postedBy: req.body.userId,
        username: req.body.username
    }
    try {
        const comments = await PostModel.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, { new: true })

        res.status(200).json(comments);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});


router.delete("/deletecomment/:postid/:commentid", async (req, res) => {
    console.log(req.params)
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.postid, { $pull: { comments: { _id: req.params.commentid } } }, { new: true })

        res.status(200).json(post);
    } catch (err) {
        res.status(401).json("Internal server error")
    }
});








export default router







