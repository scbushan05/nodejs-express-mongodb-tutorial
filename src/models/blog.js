const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    description: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;