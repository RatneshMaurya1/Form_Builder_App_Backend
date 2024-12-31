const express = require("express")
require("dotenv").config()
const connectDb = require("./config/database")
const userRouter = require("./router/userRouter")
const cors = require("cors")
const folderRouter = require("./router/folderRouter")
const formRouter = require("./router/formRouter")
const workspaceRouter = require("./router/workspaceRouter")
const createFormRouter = require("./router/createFormRouter")
const filledFormRouter = require("./router/filledFormRouter")
const PORT = process.env.PORT || 9000
const app = express()

const corsOptions = {
    origin:[
        process.env.LOCAL_FRONTEND_URL,
        process.env.FRONTEND_URL
    ],
    method:["GET","POST","PUT","DELETE"]
}
app.use(cors(corsOptions))


app.use(express.json())

app.use("/api/",userRouter)
app.use("/api/",folderRouter)
app.use("/api/", formRouter)
app.use("/api/", workspaceRouter)
app.use("/api/",createFormRouter)
app.use("/api/",filledFormRouter)

connectDb()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.log("mongodb connection failed" + err)
})

