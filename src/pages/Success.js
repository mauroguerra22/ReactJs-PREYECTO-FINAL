import React, { Component } from 'react'
import { Layout, Result, Button } from 'antd';

const { Content } = Layout;

export class Success extends Component {
    render() {
        return (
            <Layout>
                <Content className="content">
                <Result
                    status="success"
                    title="Great, we have done all the operations!"
                    extra={[
                    <Button type="primary" key="console">
                        Go Home
                    </Button>
                    ]}
                />
                </Content>
            </Layout>
        )
    }
}

export default Success
