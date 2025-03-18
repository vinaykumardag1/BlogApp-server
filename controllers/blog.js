const path = require("path");

const Blog = require("../model/blog");
const multer = require("multer");

// Configure multer to store files in the uploads folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const createBlog = async (req, res) => {
    try {
        const { title, content,userId } = req.body;
        if (!req.file) return res.status(400).json({ message: "Image is required" });

        const newBlog = new Blog({
            title,
            content,
            image: {
                buffer: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.originalname,
                path:`/uploads/${req.file.filename}`,
            },
            userId,

        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserBlogs = async (req, res) => {
    try {
        // Extract user ID from URL parameters
        const userBlogs = await Blog.find({ userId }); // Fetch blogs by user ID

        if (!userBlogs.length) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }

        res.status(200).json(userBlogs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        let updateData = { title, content };

        if (req.file) {
            updateData.image = {
                buffer: req.file.buffer,
                contentType: req.file.mimetype,
                name: req.file.originalname,
                path: `/uploads/${req.file.filename}`,
            };
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOneBlog = async (req, res) => {
    try {
        const { id } = req.params; // Get blog ID from URL parameters
        const blog = await Blog.findById(id); // Fetch blog by ID

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createBlog,
    upload,
    getBlogs,
    getUserBlogs,
    updateBlog,
    deleteBlog,
    getOneBlog, 
};


