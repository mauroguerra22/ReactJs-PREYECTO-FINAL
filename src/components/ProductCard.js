import React, { Component, Fragment  } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';

const { Meta } = Card;

export class ProductCard extends Component {
    getPhoto(id){
        let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
        return photo;
    }

    render() {
        const { name, brand, price, id } = this.props.product;

        return ( 
            <Link to={{
                pathname: '/product/' + id,
                state:{
                    product: this.props.product,
                }
                }}>           
            <Fragment>
                <Card 
                    hoverable
                    style={{ margin: 20, padding: 2, width: 260, height: 260, float: 'left', border: '1px solid #f0f0f0'}}
                    cover={<img style={{width: 255,height: 160, border: '1px solid #f0f0f0'}} src={this.getPhoto(id)} />}
                >
                    <Meta 
                        title={name} 
                        description={`Marca: ${brand} | Precio: $${price}`}
                    />
                </Card>         
            </Fragment>
            </Link>
        )
    }
}

export default ProductCard