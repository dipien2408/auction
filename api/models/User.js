const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/ec-pj-f6c33.appspot.com/o/no-user.png?alt=media&token=de3b88f5-8083-49cf-bcee-4bb88847782e" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
