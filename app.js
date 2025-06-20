const path = require('node:path') // para las rutas de los recursos estáticos
const fs = require('node:fs') // para escribir en el fichero json
const crypto = require('node:crypto') // para generar un id único y aleatorio
const express = require('express') // para definir el servidor
const app = express()

process.loadEnvFile()
const PORT = process.env.PORT

// Middlewares
app.use(express.urlencoded( {extended : true }))
app.use(express.json())

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

app.get("/admin", (req, res) => {
    res.render("admin", {jsonData})
})

app.post('/insert', (req, res) => {
    // console.log("Estamos en POST/INSERT");
    // res.send("INSERT")
    // console.log(req.body);
    const newTravel = req.body
    newTravel.id = crypto.randomUUID()
    if (newTravel.ruta[0] != "/") newTravel.ruta = "/" + newTravel.ruta    
    // El precio viene del formulario como string, hay que pasarlo a número
    newTravel.precio = parseFloat(newTravel.precio)
    jsonData.push(newTravel)
    // console.log(jsonData)
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8")
    res.redirect("/admin")
})

app.delete("/delete/:id", (req, res) => {
    // id del elemento a eliminar
    const idDelete = req.params.id;
    const newData = jsonData.filter(travel => travel.id != idDelete)
    // console.log(newData);
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(newData, null, 2), "utf-8")
    res.redirect("/admin")
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})