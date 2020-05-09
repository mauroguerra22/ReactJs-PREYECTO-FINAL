import React, { Component } from 'react'
import logo from '../assets/img/rollingstore.png';
import ProductCard from './ProductCard';
import { Layout, Input, Row, Col } from'antd';
import { Redirect } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

export class Results extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            redirect:false
        }
        this.setRedirect = this.setRedirect.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    setRedirect = () =>{
        this.setState({ redirect:true})
    }

    renderRedirect = () =>{
        if(this.state.redirect){
            return <Redirect to='/' />
        }
    }

    render() {
        const { userName, products } = this.props;
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
                                        placeholder="¿Que queres comprar?"
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
                    <p> Resultados:  </p>
                    <Row>
                    {products.map(p =>(
                        <Col xs={{span:24}} lg={{span:8}}>
                            <ProductCard product={p}/>
                        </Col>
                    ))}                   
                    </Row>
                </Content>
                <Footer className="footer">
                    Footer
                </Footer>
            </Layout>           
        );
    }
}

export default Results
