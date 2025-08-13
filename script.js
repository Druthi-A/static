const products = [
  { id: 1, name: "T-Shirt", price: 15, category: "clothing", image: "tshirt.png" },
  { id: 2, name: "Sneakers", price: 50, category: "shoes", image: "shoes.png" },
  { id: 3, name: "Watch", price: 80, category: "accessories", image: "watch.png" }
];

let cartCount = 0;
const cartCountEl = document.getElementById("cart-count");
const productListEl = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

function renderProducts(filterText = "", category = "all") {
  productListEl.innerHTML = "";

  const filteredProducts = products.filter(product => {
    const matchesText = product.name.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesText && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price.toFixed(2)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productListEl.appendChild(productCard);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cartCount++;
    cartCountEl.textContent = cartCount;
    alert(`${product.name} added to cart!`);
  }
}

productListEl.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});

searchInput.addEventListener("input", () => {
  renderProducts(searchInput.value, categorySelect.value);
});

categorySelect.addEventListener("change", () => {
  renderProducts(searchInput.value, categorySelect.value);
});

renderProducts();