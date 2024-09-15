const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

// // Hash the password before saving
// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) return next();

//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Method to validate the password
// userSchema.methods.validPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
