import React, { Component } from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import FilterSideBar from './FilterSideBar';

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <Navbar />
                <div className='my-content-container'>
                    <FilterSideBar />
                    <MainContent />
                </div>
            </div>
        )
    }
}

export default Home;