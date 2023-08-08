const socket = io()
const productsContainer = document.querySelector('#products-container')

socket.on('sendProducts', data => {
  productsContainer.innerHTML = ''
  data.forEach(product => {
    productsContainer.innerHTML += `
      <article>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <strong>$${product.price}</strong> <br/><br/>
          <button onclick='deleteProduct(${product.id})'>Eliminar</button>
         <hr/>
      </article>
    `
  })
})

function addProduct() {
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  const price = document.querySelector('#price').value

  const product = {
    title,
    description,
    price
  }

  socket.emit('addProduct', product)
}

function deleteProduct(id) {
  socket.emit('deleteProduct', id)
}
