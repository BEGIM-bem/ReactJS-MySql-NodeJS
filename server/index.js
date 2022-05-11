import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()
import mysql from 'mysql2';


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'cruddatabase',
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM new_table';
    db.query(sqlSelect, (err, result) => {
        console.log("ResultGet: ", result)
        console.log("ErrorGet: ", err)
        res.send(result)
    })
})



app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const date = req.body.date

    const sqlInsert = "INSERT INTO new_table (movieName,  movieReview, date) VALUES (?,?,?)";
    db.query(sqlInsert, [movieName, movieReview, date], (err, result) => {
        console.log("Reault: ", result)
        res.send(result)
    })
})

// app.post('/api/insert', (req, res) => {
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         console.log("hello: ", req.file.filename)
//         var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
//         const movieName = req.movieName
//         const movieReview = req.movieReview

//         const sqlInsert = "INSERT INTO movie_reviews (movieName,  movieReview, file_src) VALUES (?,?,?)";

//         var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
//         db.query(insertData, [movieName, movieReview, imgsrc], (err, result) => {
//             if (err) throw err
//             console.log("file uploaded")
//             res.send(result)
//         })
//     }
// const movieName = req.body.movieName
// const movieReview = req.body.movieReview

// const sqlInsert = "INSERT INTO movie_reviews (movieName,  movieReview) VALUES (?,?)";
// db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//     console.log("Reault: ", result)
//     res.send(result)
// })
// })
// 


app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName

    const sqlDelete = 'DELETE FROM new_table WHERE movieName = ?';
    db.query(sqlDelete, name, (err, result) => {
        res.send(result)
        if (err) console.log(err)
    })
})


app.put('/api/update', (req, res) => {
    const name = req.body.movieName
    const review = req.body.movieReview

    const sqlUpdate = 'UPDATE  new_table SET movieReview = ? WHERE movieName = ?';
    db.query(sqlUpdate, [review, name], (err, result) => {
        res.send(result)
        if (err) console.log(err)
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
}) 