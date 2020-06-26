import React, { Component } from 'react'
import { Form, Card, Layout } from 'antd';
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
        return (
            <Layout>               
            <Header className='header'></Header>
                <Content className="content-login">
                    <p>E-Commerce</p>                 
                    <Card style={{background: '#f0f5ff'}}>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}>
                            <Form.Item>
                                 <StyledFirebaseAuth
                                    uiConfig={this.uiConfig}
                                    firebaseAuth={firebaseApp.auth()}/>   
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
