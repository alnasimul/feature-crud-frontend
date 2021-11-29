import React from 'react';
import FeatureForm from './FeatureForm/FeatureForm';
import FeatureTable from './FeatureTable/FeatureTable';

const Hero = () => {
    return (
        <div className='container my-5'>
            <div className="row">
                <FeatureForm/>
                <FeatureTable/>
            </div>
        </div>
    );
};

export default Hero;