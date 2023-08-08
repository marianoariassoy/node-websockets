import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import { products } from './src/public/data/products.js'

const PORT = 8080
const app = express()
const http = app.listen(PORT, () => console.log('Server is running on port', http.address().port))

const io = new Server(http)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/src/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/src/public'))

app.get('/', (req, res) => {
  res.render('home', { title: 'Listado estático de productos' })
})

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Listado en tiempo real de productos' })
})

io.on('connection', socket => {
  console.log('new connection', socket.id)

  socket.emit('sendProducts', products)

  socket.on('addProduct', product => {
    products.push(product)
    io.sockets.emit('sendProducts', products)
  })

  socket.on('deleteProduct', id => {
    const index = products.findIndex(product => product.id === +id)
    products.splice(index, 1)
    io.sockets.emit('sendProducts', products)
  })
})
