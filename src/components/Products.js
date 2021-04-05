import React, { Component } from "react";
import { formatCurrency } from "../util";

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img src={product.image} alt={product.title}></img>
                  <p>{product.title}</p>
                </a>
              </div>
              <div className="product-price">
                <div>{formatCurrency(product.price)}</div>
                <button onClick={(e) => {this.props.addToCart(product)}} className="button primary">Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
