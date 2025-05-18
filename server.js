import express, { Router, urlencoded } from 'express'
import cors from 'cors'
import client from './src/common/db.js'
import peliculaRoutes from './src/pelicula/peliculaRoutes.js'
import actorRoutes from './src/actor/actorRoutes.js'

const PORTS = 3000 || 4000;
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req, res) => {return res.status(200).send('Bienvenido al cine Iplacex')})


app.use('/api', peliculaRoutes, actorRoutes)


await client.connect()
.then(() => {

    console.log('Conectado al cluster')
    app.listen(PORTS, () => { console.log(`servidor corriendo en http://localhost:${PORTS}`) })

})
.catch(() => {

    console.log('Error al conectar al cluster de Atlas')

})