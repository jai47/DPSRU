const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.cmv7njg.mongodb.net/test');
}
