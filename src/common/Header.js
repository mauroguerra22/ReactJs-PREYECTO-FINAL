import React, { Component } from 'react'
import logo from '../assets/img/rollingstore.png';
import { Layout, Row, Col, Input, message, Menu, Dropdown, Button, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined, HeartOutlined, LoginOutlined } from '@ant-design/icons';
import { Redirect, Link } from 'react-router-dom'
import { getInfoCustomer } from '../reducers';
import { connect } from "react-redux";
import { firebaseApp } from '../firebase';

const { Header } = Layout;
const { Search } = Input;

class commonHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToResults: false,
            redirectToMain: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateList = this.props.updateList.bind(this);
    }

    setRedirectToMain = () => {
        this.handleClearTerm()
        this.props.updateList([], '')
        this.setState({
          redirectToMain: true,
          redirectToResults: false,
        })
      }

    renderRedirectToMain = () => {
        if (this.state.redirectToMain) {
           return <Redirect to='/' />
        }
    }

    setRedirectToResults = () => {
        this.setState({
            redirectToResults: true,
            redirectToMain: false,
        })
    }

    renderRedirectToResults = () => {
        if (this.state.redirectToResults) {
           return <Redirect to='/results' />
        }
    }

    handleChange(e) {
        let term = e.target.value;
        this.props.updateTerm(term)
    }

    handleClearTerm() {
        this.props.updateTerm('')
    }

    handleSearch(term) {
        const localTerm = term;
        let currentProducts = [];
        let newProducts = [];

        if (localTerm !== '' && localTerm.length > 1) {
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
            this.props.updateList(this.props.products, localTerm)
            message.error('Debe ingresar al menos 2 caracteres');
            return true
        }

        this.setRedirectToResults();
    }

    render() {

        const menu = (
            <Menu>
                <Menu.Item key="1" style={{textAlign: 'center', color: 'black', fontSize: 15 }}>
                    <Avatar src={firebaseApp.auth().currentUser.photoURL}/>
                    <p>{firebaseApp.auth().currentUser.displayName}</p>
                    <Link to={{ pathname: '/profile' }}>
                        <Button type="link">Ver Perfil</Button>  
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShoppingCartOutlined />}>                
                        Mis Compras                  
                </Menu.Item>
                <Menu.Item key="3" icon={<HeartOutlined />}>
                    <Link to={{ pathname: '/favorite' }}>
                        Mis Favoritos
                    </Link>      
                </Menu.Item>
                <Menu.Item key="4" onClick={() => firebaseApp.auth().signOut()} icon={<LoginOutlined />}>
                    Cerrar sesión
                </Menu.Item>
            </Menu>
          );

        return(
            <Header className='header'>
                <Row>
                    <Col xs={{ span: 5 }} lg={{ span: 3 }}>
                        {this.renderRedirectToMain()}
                        <Link to={{ pathname: '/' }}>
                            <img src={logo} className='header-logo' alt='logo' onClick={this.setRedirectToMain} />
                        </Link>                       
                    </Col>
                    <Col xs={{ span: 19 }} lg={{ span: 16 }}>
                        <div className='header-search'>
                            {this.renderRedirectToResults()}
                            <Search
                                placeholder='¿Que queres comprar?'
                                onSearch={() => this.handleSearch(this.props.term)}
                                onChange={this.handleChange}
                                value={this.props.term}
                                enterButton
                            />
                            {
                                this.props.term !== '' ?
                                <div className={'clear-icon'} onClick={() => this.handleClearTerm()}>x</div>
                                :
                                <div />
                            }
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 5 }}>
                        <Dropdown.Button className='header-greetings' overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                            Bienvenido {firebaseApp.auth().currentUser.displayName}
                        </Dropdown.Button>
                    </Col>
                </Row>
            </Header>
        );
    }
}

const mapStateToProps = state => ({
    customer: getInfoCustomer(state)
  })
  
  export default connect(
    mapStateToProps
  )(commonHeader)
