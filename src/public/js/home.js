import { products } from '../data/products.js'
const productsContainer = document.querySelector('#products-container')

products.forEach(product => {
  productsContainer.innerHTML += `
        <article>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <strong>$${product.price}</strong> <br/>
            <hr />
        </article>
      `
})
