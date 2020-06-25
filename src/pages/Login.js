import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CommonDrawer from '../common/Drawer';
import { firebaseApp } from '../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const { Content, Header, Footer } = Layout;

export class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             google:{},
             facebook:{},
             show: false,
             user:'',
             password:'',
             name:'',
             email:'',
             domicilio:'',
             passworduser:'',
             disabled:true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
          firebaseApp.auth.FacebookAuthProvider.PROVIDER_ID,
          firebaseApp.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccess: () => false
        }
    }

    toShowDrawer(){
        this.setState({ show: !this.state.show })    
    }

    componentClicked = () => console.log("clicked");
   
    responseGoogle = (response) => {
        this.setState({
            google:{
                name: response.Rt.Bd,
                email: response.Rt.Bu,
                picture: response.Rt.dL 
            }
        })
        this.props.setUserGoogle(this.state.google);
    }

    validateButtonConfirm = () => {
        return this.state.name === '' || this.state.passworduser === '' || this.state.domicilio === '' || this.state.email === '';
    }

    validateButton = () => {
        return this.state.user === '' || this.state.password === ''
    }

    onWriteUser = e =>{
        this.setState({ user: e.target.value })
    }

    onWritePassword = e =>{
        this.setState({ password: e.target.value })
    }

    onWriteName = e =>{
        this.setState({ name: e.target.value })
    }

    onWritePasswordUser = e =>{
        this.setState({ passworduser: e.target.value })
    }

    onWriteDomicilio = e =>{
        this.setState({ domicilio: e.target.value })
    }

    onWriteEmail = e =>{
        this.setState({ email: e.target.value })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
        this.validateButtonConfirm();
    }

    render() {
        const { show, user, password, name, email, domicilio, passworduser } = this.state
        const toShowDrawer = this.toShowDrawer.bind(this);
        const validateButtonConfirm = this.validateButtonConfirm.bind(this);

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
                                <Input value={user} onChange={this.onWriteUser} allowClear/>
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
                                <Input.Password value={password} onChange={this.onWritePassword} allowClear/>
                            </Form.Item>
                            <Form.Item>
                                {/* <GoogleLogin
                                    clientId="354596986729-j2kjnq4ttrjh3fsffqi9lbar7ftt6r6o.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}/> */}
                                 <StyledFirebaseAuth
                                    uiConfig={this.uiConfig}
                                    firebaseAuth={firebaseApp.auth()}/>   
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={() => this.toShowDrawer()}>
                                    <PlusOutlined /> Nueva cuenta
                                </Button>
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Link to= {{ pathname: '/' }}>
                                    <Button type="primary" htmlType="submit" disabled={this.validateButton()}>
                                        Iniciar
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>               
                    </Card>
                    <CommonDrawer 
                                text='Crea una cuenta nueva' 
                                show={show} 
                                setShow={toShowDrawer}
                                name={name}
                                domicilio={domicilio}
                                email={email}
                                passworduser={passworduser}
                                validateButtonConfirm={validateButtonConfirm}
                                handleChange={this.handleChange}
                                onWriteName={this.onWriteName}
                                onWritePasswordUser={this.onWritePasswordUser}
                                onWriteDomicilio={this.onWriteDomicilio}
                                onWriteEmail={this.onWriteEmail}/>
                </Content>
            <Footer className="footer"></Footer>
            </Layout>
        );
    }
}

export default Login
