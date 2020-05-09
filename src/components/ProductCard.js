import React, { Component } from 'react'

export class ProductCard extends Component {
    render() {
        const { name, brand, price } = this.props.product

        return (
            <div className="product-card">
                <div>Producto: {name}</div>
                <div>Marca: {brand}</div>
                <div>Precio: {price}</div>
            </div>
        )
    }
}

export default ProductCard
