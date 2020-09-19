const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bloggingapp', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connection successful');
}).catch((error) => {
    console.log('something wrong', error);
})