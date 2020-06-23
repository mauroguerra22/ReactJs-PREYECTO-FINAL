import React, { Component } from 'react'
import { Layout, Result, Button } from 'antd';
import { Link } from 'react-router-dom'

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
                        <Link to={{
                            pathname: '/'
                        }}>
                            <Button type="primary" key="console">
                                Go Home
                            </Button>
                        </Link>
                    ]}
                />
                </Content>
            </Layout>
        )
    }
}

export default Success
