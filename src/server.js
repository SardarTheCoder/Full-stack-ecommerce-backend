const app = require(".");
const { connectDb } = require("./config/db");
const PORT = 5454;
app.listen(PORT, async()=>{
    await connectDb();
    console.log("Ecommerece api listing on PORT :", PORT)
})