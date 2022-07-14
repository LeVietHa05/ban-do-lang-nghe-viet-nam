const mongoose = require("mongoose");

/**
 * @typedef {Object} langNghe Làng nghề
 * @property {String} name tên làng nghề
 * @property {String} history lịch sử làng nghề
 * @property {Date} founded_date thời gian hình thành
 * @property {String} origin nguồn gốc, tổ nghề
 * @property {String} golden_era giai đoạn nổi bật
 * @property {String} product sản phẩm
 */
langNgheSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  history: String,
  founded_date: { type: Date, default: Date.now },
  origin: { type: String, required: true },
  golden_era: String,
  product: { type: String, required: true },
  num_working_people: {type: Number, required: true},
});
const LangNghe = mongoose.model("LangNghe", langNgheSchema);

module.exports = LangNghe;