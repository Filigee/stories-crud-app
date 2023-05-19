const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const exphbs = require("express-handlebars")
const morgan = require("morgan")

// Load Config
dotenv.config({path: "./config/config.env"})

connectDB()

const app = express()

// Logging
if(process.env.NODE.ENV == "development"){
    app.use(morgan("dev"))
}

// Handlebars
app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))
app.set("view engine", ".hbs")

// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", require("./routes/index"))

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))