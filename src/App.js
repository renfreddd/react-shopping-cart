// Feature 1
import React from "react";
import "./index.css";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };

    // this.sortProducts = this.sortProducts.bind(this);
    // this.filterProducts = this.filterProducts.bind(this);
    // this.addToCart = this.addToCart.bind(this);
    // this.removeFromCart = this.removeFromCart.bind(this);
  }

  sortProducts(event) {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  }

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  addToCart = (product) => {
    let inCart = false;
    const cartItems = this.state.cartItems.slice();

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        console.log(item.count);
        inCart = true;
      }
    });

    if (!inCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((item) => item._id !== product._id),
    });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  createOrder(order) {
    alert("Need to save order for " + order.name);
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;
