import React, { Component } from 'react'
import ProductCard from '../components/ProductCard';
import { Layout, Row, Col } from'antd';

const { Content } = Layout;

export class Results extends Component {

    getSpanWidth(quantity) {
        return quantity === 1 ? 24 : quantity === 2 ? 12 : 8
    }

    setMessage = () =>{
        if(this.props.results.length !== 0){
            return <p> Resultados de tu búsqueda:  </p>
        }else{
            return <p> No se encontraron resultados </p>
        }
    }
    
    render() {
        const { results } = this.props;
        return (
            <Layout>
                <Content className="content">
                    {this.setMessage()}                   
                    <Row>
                    {results.map(resul  =>(
                        <Col xs={{ span: 24 }} lg={{ span: this.getSpanWidth(results.length) }}>
                            <ProductCard key={resul.id} product={resul} />
                        </Col>
                    ))}                   
                    </Row>
                </Content>
            </Layout>           
        );
    }
}

export default Results
