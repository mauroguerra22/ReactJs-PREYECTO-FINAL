import React, { Component } from 'react'
import { Layout } from'antd';
import ProductInfo from '../components/ProductInfo';

const { Content } = Layout;

export class Product extends Component {
    render() {
      console.log(this.props);
        const { id } = this.props.match.params
        const { product } = this.props.location.state
    
        return(
          <Layout>
            <Content className="content">
              <ProductInfo product={product} />
            </Content>
          </Layout>
        )
      }
}

export default Product
