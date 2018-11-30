const express = require('express')
const port = process.env.PORT || 8000
const app = express()


app.use(express.static(__dirname + "/dist/"))

app.get(/.*/, (req, res) => {
    res.sendfile(__dirname + "/dist/index.html")
})

// app.post('/*/test', (req, res) => {
//     console.log('yello')
//     res.send('test')
// })

app.listen(port)

console.log("server started....")