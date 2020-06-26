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
                    key="1"
                    status="success"
                    title="¡Genial, hemos hecho todas las operaciones!"
                    extra={[
                        <Link to={{
                            pathname: '/'
                        }}>
                            <Button type="primary" key="console">
                                Volver al inicio
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
