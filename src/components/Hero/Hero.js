import React from 'react';
import Contents from './Contents/Contents';
import FeatureForm from './FeatureForm/FeatureForm';


const Hero = ({features}) => {
    return (
        <div className='container my-5'>
            <div className="row">
                <FeatureForm/>
                <Contents features={features}/>
            </div>
        </div>
    );
};

export default Hero;