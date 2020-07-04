import React, { Component } from 'react'
import Carousel from './Carousel'
import Header from '../components/header'
import Footer from '../components/footer'
export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Header />
                <Carousel />
                <Footer />
            </div>
        )
    }
}
