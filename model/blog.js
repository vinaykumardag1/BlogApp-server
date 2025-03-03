const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
          data: Buffer,
          contentType: String,
          name:String,
          path:String,
    },
    content: {
        type: String,
        required: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required:true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;