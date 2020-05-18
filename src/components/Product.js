import React, { Component } from 'react'
import { Layout, Row, Col } from'antd';

const { Content } = Layout;

export class Product extends Component {
    render() {
        return (
            <Layout>
                <Content className="content">
                    <p>Components Product</p>
                </Content>                
            </Layout>
        )
    }
}

export default Product
