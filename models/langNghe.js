const mongoose = require('mongoose');

langNgheSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

const LangNghe = mongoose.model("LangNghe", langNgheSchema);

module.exports = LangNghe;