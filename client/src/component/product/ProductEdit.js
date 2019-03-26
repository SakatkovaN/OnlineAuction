import React from 'react'
import axios from '../axios/config'
import ProductForm from './ProductForm';

class ProductEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            product: {},
            isLoaded: false
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log('response edit', response.data)
                this.setState(() => ({ product: response.data, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit = (data) => {
        const id = this.state.product._id

        axios.put(`/products/${id}`, data, { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        const { name, category, minPrice, description } = this.state.product
        console.log('state', this.state.product)
        return (
            <div>
                {this.state.isLoaded &&
                    <ProductForm
                        name={name}
                        category={category}
                        description={description}
                        minPrice={minPrice}
                        handleSubmit={this.handleSubmit} />
                }
            </div >
        )
    }
}

export default ProductEdit