import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAds } from '../data/auth.js';

// TODO replace with actual view
const catalogTemplate = (products) => html`
<!-- Dashboard page -->
<h2>Products</h2>
<section id="dashboard">
    ${products.length == 0 ? html`
     <!-- Display an h2 if there are no posts -->
 <h2>No products yet.</h2>
    ` : products.map((product) => html`
     <!-- Display a div with information about every post (if any)-->
  <div class="product">
    <img src="${product.imageUrl}" alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
  </div>
    `)}
`;

export async function catalogPage(ctx){
    const products = await getAllAds();
    ctx.render(catalogTemplate(products));
}