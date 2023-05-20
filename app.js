// order of middleware is important

const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const exphbs = require("express-handlebars")
const passport = require("passport")
const morgan = require("morgan")
const session = require("express-session")

// Load Config
dotenv.config({path: "./config/config.env"})

// Passport Config
require("./config/passport")(passport)

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

// Sessions 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))

const PORT = process.env.port || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))