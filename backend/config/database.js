const mongoose = require("mongoose");
const db_Url = "mongodb://127.0.0.1:27017/shop";
main()
  .then(() => {
    console.log("databse connected succssfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db_Url);
}
module.exports = mongoose.connection