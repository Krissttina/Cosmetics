import { html } from "../../node_modules/lit-html/lit-html.js";
import { createProduct } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

// TODO replace with actual view
const createTemplate = (onCreate) => html`
  <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <div class="form">
      <h2>Add Product</h2>
      <form @submit=${onCreate} class="create-form">
        <input type="text" name="name" id="name" placeholder="Product Name" />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ name, imageUrl, category, description, price }) {
    if ([name, imageUrl, category, description, price].some((f) => f == "")) {
      return alert("All fields are required");
    }

    await createProduct({
      name,
      imageUrl,
      category,
      description,
      price,
    });

    ctx.page.redirect("/catalog");
  }
}
