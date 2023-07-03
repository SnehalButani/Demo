const mongoose = require('mongoose');

main().catch(err => console.log(err));

 async function main() {
  await mongoose.connect('mongodb+srv://amitbutani988:SDtKXpZblrdsKRpe@demo.jgaikku.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>console.log("database connected..."));

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
