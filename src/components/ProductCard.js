import React, { Component, Fragment  } from 'react'

export class ProductCard extends Component {
    render() {
        return (
            <Fragment>
            <div key={this.props.product.key} className="product-card">
                <div>Producto: {this.props.product.name}</div>
                <div>Marca: {this.props.product.brand}</div>
                <div>Precio: {this.props.product.price}</div>
            </div>
            </Fragment>
        )
    }
}

export default ProductCard
