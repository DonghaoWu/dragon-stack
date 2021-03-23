import React, { Component } from 'react';
import Navbar from '../Navbar/index';
import MainContent from '../MainContent/index';
import FilterSideBar from '../FilterSideBar/index';
import './styles.css';

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <Navbar />
                <div className='my-content'>
                    <FilterSideBar />
                    <MainContent />
                </div>
            </div>
        )
    }
}

export default Home;