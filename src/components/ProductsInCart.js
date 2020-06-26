import React, { Component } from 'react'
import { List, Avatar } from 'antd';

class ProductsInCart extends Component {
  getPhoto(id){
    let photo =`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`;
    return photo;
  }

  render() {
    const { products } = this.props;
    
    return(
      <div>
        <h3 style={{textAlign: 'center'}}>Lista de Productos</h3>
          <List
              size="large"
              itemLayout="horizontal"
              dataSource={products}
              renderItem={item => (
                <List.Item key={item.id} style={{marginLeft: '25%', background: '#d6e4ff', marginRight: '25%'}}>
                  <List.Item.Meta
                    avatar={<Avatar src={this.getPhoto(item.id)} />}
                    title={` ${item.name} | ${item.brand}`}
                    description={`subtotal: ${item.quantity} x $${item.price} = $${item.quantity*item.price}`}
                  />
                </List.Item>
              )}
            />
      </div>
    )
  }
}

export default ProductsInCart