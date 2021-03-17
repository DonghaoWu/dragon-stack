import React, { Component } from 'react';
import Navbar from './Navbar';
import MainContent from './MainContent';
import FilterSideBar from './FilterSideBar';

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='my-container'>
                    <FilterSideBar />
                    <MainContent />
                </div>
            </div>
        )
    }
}

export default Home;