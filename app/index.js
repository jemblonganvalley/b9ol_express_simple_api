// import package yang dibutuhkan
import express from "express"
import note_routes from "./routes/note_routes"

const app = express()

// middleware
app.use(express.json())

// router
app.use(note_routes)


// listener
app.listen(9000, () => {
    console.log("server backend berjalan...")
})