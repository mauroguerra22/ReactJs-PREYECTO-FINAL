import React, { Component } from 'react'
import { Avatar, Card, Layout } from 'antd';
import { firebaseApp } from '../firebase';

const { Content } = Layout;

export class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {

        }

    }

    render() {
        return (
            <Layout>               
                <Content className="content-login">
                    <p>E-Commerce</p>                 
                    <Card style={{background: '#f0f5ff'}}>
                        <Avatar style={{width: '50%', height: '50%', marginBottom: '5%'}} src={firebaseApp.auth().currentUser.photoURL}/>
                        <p><strong>Nombre: </strong> {firebaseApp.auth().currentUser.displayName}</p>
                        <p><strong>Email: </strong> {firebaseApp.auth().currentUser.email}</p>              
                    </Card>
                </Content>
            </Layout>
        );
    }
}

export default Profile
