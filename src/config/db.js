const mongoose = require("mongoose")


const mongodbUrl = "mongodb+srv://hmmadakram786:YsYAVbJhCQrDe4Fv@cluster0.jlqtqbn.mongodb.net/?retryWrites=true&w=majority"

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
}

module.exports={connectDb} 