import React, { Component } from 'react'
import { Layout, Row, Col } from'antd';
const { Content } = Layout;

export class Cart extends Component {

    render() {
        return (
            <Layout>
                <Content className="content">
                    <p>Components Cart</p>
                </Content>
            </Layout>
        )
    }
}

export default Cart
