const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const LangNghe = require("./models/langNghe");
const ErrorHandle = require("./ErrorHandle");

//rút gọn đường dẫn đến thư mục
app.set("views", path.join(__dirname, "views"));
//lựa chọn cách kết xuất file (quên rồi, để search lại)
app.set("view engine", "ejs");
// lấy thông tin từ form (req.body)
app.use(express.urlencoded({ extended: true }));


//kết nối database
mongoose
  .connect("mongodb://localhost:27017/langNghe")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log("OH nooo, error");
    console.log(err);
  });

// hàm xử lý async
function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

//home page
app.get("/", (req, res) => {
  res.render("home");
});
//new page
app.get("/new", (req, res) => {
  res.render("new");
});
// tạo làng mới 
app.post(
  "/",
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const newVillage = new LangNghe(req.body);
    await newVillage.save();
    res.redirect(`/${newVillage._id}`);
  })
);
//show làng mới tạo
app.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const village = await LangNghe.findById(id);
    if (!village) {
      throw new ErrorHandle("Khong tim thay lang nghe, 404");
    }
    res.render("show", { village });
  })
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
