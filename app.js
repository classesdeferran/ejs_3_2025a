const path = require('node:path')
const express = require('express')
const app = express()

process.loadEnvFile()
const PORT = process.env.PORT

// Ruta de los recursos estáticos
app.use(express.static(path.join(__dirname, "public")))

// Vistas
app.set("view engine", "ejs")
app.set("views", "./views")

// Importar los datos
const jsonData = require("./data/travels.json")

jsonData.forEach( travel => {
    app.get(`${travel.ruta}`, (req, res) => {
        res.render("travels", {
            "lugar" : `${travel.lugar}`, 
            "descripcion" : `${travel.descripcion}`,
            "precio" : `${travel.precio}`, 
            "nombre" : `${travel.nombre}`, 
            "img" : `${travel.img}`,
            "travels" : jsonData
        })
    })
})



app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})