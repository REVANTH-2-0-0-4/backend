const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testapp');
const UserSchema = mongoose.Schema({
  Username: String,
  email: String,
  image_Url: String
})

const User = mongoose.model('user', UserSchema);

async function clearDatabase() {
  try {
    await User.deleteMany({});
    console.log("Database is cleared. You can start over now.");
  } catch (error) {
    console.error("Error clearing the database:", error);
  }
}

module.exports = [ User, clearDatabase ];
// console.log(module.exports);
