import React, { Component } from 'react'
import { Layout, Row, Col } from'antd';

const { Content } = Layout;

export class Success extends Component {
    render() {
        return (
            <Layout>
                <Content className="content">
                    <p>Components Success</p>
                </Content>
            </Layout>
        )
    }
}

export default Success
