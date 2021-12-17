const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    price: { type: Number, required: true },
    time: {type: Number, required: true },
    //time calculate by sec but input by hour, time = hour * 3600
    //math.floor
    //timer: hour = time/3600; min = time - hour*3600; sec = time -hour*3600 - min*60; (no need, countdown deal with it)
    curWinner: {type: String, required: false, default: "test"},
    end: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
