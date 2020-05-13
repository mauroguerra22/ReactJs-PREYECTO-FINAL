import React, { Component, Fragment  } from 'react'
import { Card } from 'antd';

const { Meta } = Card;

export class ProductCard extends Component {
    render() {
        return (
            <Fragment>
                <Card 
                    hoverable
                    style={{ margin: 20, padding: 2, width: 260, height: 260, float: 'left', border: '1px solid #f0f0f0'}}
                    cover={<img style={{width: 255,height: 160, border: '1px solid #f0f0f0'}} src={this.props.product.image} />}
                >
                    <Meta 
                        title={this.props.product.name} 
                        description={'Marca: '+this.props.product.brand+' | '+'Precio: $'+this.props.product.price}
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