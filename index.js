const path = require('path');
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 8000;

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Corrected syntax
        cb(null, "./uploads"); // Ensure the 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    return res.render("homepage");
});

app.post("/upload", upload.single('profileImage'), (req, res) => {
    console.log(req.body); // Logs form data
    console.log(req.file); // Logs uploaded file details

    return res.redirect('/');
});

// Start server
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
