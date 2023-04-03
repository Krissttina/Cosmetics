import { html } from "../../node_modules/lit-html/lit-html.js";
import { getProductById, editProductById } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (product, onEdit) => html`
  <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <div class="form">
      <h2>Edit Product</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="name"
          id="name"
          .value="${product.name}"
          placeholder="Product Name"
        />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          .value="${product.imageUrl}"
          placeholder="Product Image"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          .value="${product.category}"
          placeholder="Category"
        />
        <textarea
          id="product-description"
          .value="${product.description}"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          .value="${product.price}"
          placeholder="Price"
        />
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const productId = ctx.params.id;

  const product = await getProductById(productId);
  ctx.render(editTemplate(product, createSubmitHandler(onEdit)));
  
  async function onEdit({
    name, imageUrl, category, description, price
  }) {
    if ([name, imageUrl, category, description, price].some(
        (x) => x == "")
    ) {
      return alert("All fields are required");
    }

    await editProductById(id, {
      name,
      imageUrl,
      category,
      description,
      price,
    });

    ctx.page.redirect("/details/" + productId);
  }
}
