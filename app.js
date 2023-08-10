import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import { readFile, writeFile } from './src/utils/fs.js'

const PORT = 8080
const app = express()
const http = app.listen(PORT, () => console.log('Server is running on port', http.address().port))
const io = new Server(http)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/src/public'))

const file = './src/public/data/products.json'
const products = await readFile(file)

app.get('/', (req, res) => {
  res.render('home', { title: 'Listado estático de productos' })
})

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Listado en tiempo real de productos' })
})

io.on('connection', socket => {
  console.log('new connection', socket.id)
  socket.emit('sendProducts', products)

  socket.on('addProduct', async product => {
    try {
      products.push(product)
      io.sockets.emit('sendProducts', products)
      await writeFile(products, file)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('deleteProduct', async id => {
    try {
      const index = products.findIndex(product => product.id === +id)
      products.splice(index, 1)
      io.sockets.emit('sendProducts', products)
      await writeFile(products, file)
    } catch (error) {
      console.log(error)
    }
  })
})
