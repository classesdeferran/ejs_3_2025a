const path = require('node:path')
const express = require('express')
const app = express()

process.loadEnvFile()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send('OK')
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})