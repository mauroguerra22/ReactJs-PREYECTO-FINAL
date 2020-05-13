import React, { Component } from 'react'
import logo from '../assets/img/rollingstore.png';
import ProductCard from './ProductCard';
import CommonFooter from '../common/Footer';
import CommonCarousel from '../common/Carousel';
import { Layout, Input, Row, Col, message } from'antd';
import { Redirect } from 'react-router-dom';

const { Header, Content } = Layout;
const { Search } = Input;

export class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateList = this.props.updateList.bind(this);

    }

    setRedirect = () =>{
        this.setState({ redirect: true})
    }

    renderRedirect = () =>{
        if(this.state.redirect){
            return <Redirect to='/results' />
        }
    }

    handleChange(e) {    
        let term = e.target.value;
        this.props.updateTerm(term)
    }

    handleSearch(term){
        const localTerm = term;
        let currentProducts =[];
        let newProducts = [];

        if (localTerm !== '') {
            currentProducts = this.props.products;
            newProducts = currentProducts.filter(item => {
                const lc = item.name.toLowerCase();
                const filter = localTerm.toLowerCase();
                return lc.includes(filter);
            });
            if(newProducts.length !== 0){
                message.success('Producto encontrado correctamente');                              
            }else{
                message.error('No se ha encontrado el producto'); 
            }
            this.props.updateList(newProducts, localTerm)           
        } else {
            newProducts = this.props.products;          
        }


        this.setRedirect();
    }

    render() {
        const { userName, products } = this.props;
        return (
            <Layout>
                <Header className="header">
                    <Row>
                        <Col xs={{span:5}} lg={{span:3}}><img src={logo} className="header-logo" alt="logo" /></Col>
                        <Col xs={{span:19}} lg={{span:16}}>
                            <div className="header-search">
                            {this.renderRedirect()}
                                <Search
                                        placeholder="¿Que queres comprar?"
                                        onSearch={ () => this.handleSearch(this.props.term) }
                                        onChange={ this.handleChange }
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
                
                <CommonCarousel/>
                <Content className="content">
                    <p>Relacionado con tus visitas</p>
                    <Row>
                    {products.map(prod =>(
                        <Col key={prod.id} xs={{span:2}} lg={{span:6}}>
                            <ProductCard product={prod}/>
                        </Col>
                    ))}                   
                    </Row>
                </Content>
                <CommonFooter/>
            </Layout>           
        );
    }
}

export default Main
