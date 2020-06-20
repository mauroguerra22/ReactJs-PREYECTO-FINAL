import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Layout } from 'antd';
import { Link } from 'react-router-dom'

const { Content, Header, Footer } = Layout;

export class Login extends Component {

    render() {
        return (
            <Layout>               
            <Header className='header'></Header>
                <Content className="content-login">
                    <p>E-Commerce</p>                 
                    <Card style={{ width: '50%' }}>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                ]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Link to= {{ pathname: '/home' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.props.setVisible}>
                                        Iniciar
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>               
                    </Card>
                </Content>
            <Footer className="footer"></Footer>
            </Layout>
        );
    }
}

export default Login
