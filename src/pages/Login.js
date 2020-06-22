import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const { Content, Header, Footer } = Layout;

export class Login extends Component {

    componentClicked = () => console.log("clicked");
    render() {
        const responseGoogle = (response) => {
            console.log(response);
        }
        const responseFacebook = (response) => {
            console.log(response);
        }
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
                            <GoogleLogin
                                clientId="354596986729-j2kjnq4ttrjh3fsffqi9lbar7ftt6r6o.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}/>
                            <FacebookLogin
                                appId="288263259033402"
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={responseFacebook} 
                                />
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
