const file = '/data/products.json'
const productsContainer = document.querySelector('#products-container')

fetch(file)
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      productsContainer.innerHTML += `
      <article>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <strong>$${product.price}</strong> <br/>
          <hr />
      </article>
    `
    })
  })
