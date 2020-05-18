import React, { Component, Fragment  } from 'react'
import { Card } from 'antd';

const { Meta } = Card;

export class ProductCard extends Component {
    render() {
        const { name, brand, price, id } = this.props.product;
        return (
            <Fragment>
                <Card 
                    hoverable
                    style={{ margin: 20, padding: 2, width: 260, height: 260, float: 'left', border: '1px solid #f0f0f0'}}
                    cover={<img style={{width: 255,height: 160, border: '1px solid #f0f0f0'}} src={`https://firebasestorage.googleapis.com/v0/b/rolling-store-cm.appspot.com/o/products%2F${id}.jpg?alt=media`} />}
                >
                    <Meta 
                        title={name} 
                        description={'Marca: '+brand+' | '+'Precio: $'+price}
                    />
                </Card>         
            </Fragment>
        )
    }
}

export default ProductCard


/* actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}*/