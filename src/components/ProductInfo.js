import React, { Component } from 'react'
import { Layout, Row, Col,Descriptions } from'antd';

const { Content } = Layout;

export class ProductInfo extends Component {
    render() {
        console.log(this.props);
        const { name, brand, price, id } = this.props.product[0];
        return (
                    <Descriptions title="Informacion del producto">
                        <Descriptions.Item>{name}</Descriptions.Item>
                        <Descriptions.Item>{brand}</Descriptions.Item>
                        <Descriptions.Item>{price}</Descriptions.Item>
                        <Descriptions.Item>empty</Descriptions.Item>
                        <Descriptions.Item>
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
        )
    }
}

export default ProductInfo