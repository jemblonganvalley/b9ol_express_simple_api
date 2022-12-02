import express from "express"
import db from "../../prisma/connection"

const note_routes = express.Router()

// create
note_routes.post("/note/create", async (req, res) => {
    const { title, content, author } = req.body
    const createNote = await db.notes.create({
        data: {
            title: title,
            content: content,
            author: author
        }
    })
    res.status(200).json({
        success: true,
        data: createNote
    })
})

// read
note_routes.get("/note/read", async (req, res) => {
    const readNotes = await db.notes.findMany()
    res.status(200).json({
        success: true,
        data: readNotes
    })
})

// delete 
note_routes.delete('/note/delete/:id', async (req, res) => {
    try {
        // tangkap value params id
        const { id } = req.params // string

        const deleteNote = await db.notes.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(201).json({
            success: true,
            message: "Berhasil delete data"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

})

// update note
note_routes.put("/note/update/:id", async (req, res) => {
    try {
        // tangkap params id dari data yang ingin di ubah
        const { id } = req.params
        const { title, content, author } = await req.body // data terupdate
        const updateNote = await db.notes.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title: title,
                content: content,
                author: author
            }
        })

        return res.status(201).json({
            success: true,
            update: updateNote
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
})




export default note_routes