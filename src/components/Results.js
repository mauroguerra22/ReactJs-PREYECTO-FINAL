import React, { Component } from 'react'
import ProductCard from './ProductCard';
import { Layout, Row, Col } from'antd';

const { Content } = Layout;

export class Results extends Component {

    setMessage = () =>{
        if(this.props.results.length !== 0){
            return <p> Resultados de tu búsqueda:  </p>
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
                        <Col key={resul.id}>
                            <ProductCard product={resul}/>
                        </Col>
                    ))}                   
                    </Row>
                </Content>
            </Layout>           
        );
    }
}

export default Results
