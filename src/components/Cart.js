import React, { Component } from 'react'
import logo from '../assets/img/rollingstore.png';
import CommonFooter from '../common/Footer';
import { Layout, Input, Row, Col } from'antd';
import { Redirect } from 'react-router-dom';

const { Header, Content } = Layout;
const { Search } = Input;

export class Cart extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    setRedirect = () =>{
        this.setState({ redirect: true})
    }

    renderRedirect = () =>{
        if(this.state.redirect){
            return <Redirect to='/' />
        }
    }

    render() {
        const { userName, results, term } = this.props;
        return (
            <Layout>
                <Header className="header">
                    <Row>
                        <Col xs={{span:5}} lg={{span:3}}>
                            {this.renderRedirect()}
                            <img src={logo} className="header-logo" alt="logo" onClick={this.setRedirect}/></Col>
                        <Col xs={{span:19}} lg={{span:16}}>
                            <div className="header-search">
                                <Search
                                        placeholder={term}
                                        onSearch={ value => console.log(value) }
                                        enterButton
                                />
                            </div>
                        </Col>
                        <Col xs={{span:0}} lg={{span:5}}>
                            <div className="header-greetings">
                                Bienvenido {userName}
                            </div>
                        </Col>
                    </Row>                    
                </Header>
 
                <Content className="content">
                    <p>Components Cart</p>
                </Content>
                
                <CommonFooter/>
            </Layout>
        )
    }
}

export default Cart
