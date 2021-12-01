import React, { useEffect,  useState } from 'react';
import SingleContent from './SingleContent/SingleContent';

const Contents = ({features}) => {
   

    return (
        <div className='column column-50'>
            {
                features.length > 0 ?  ( features.map( feature => <SingleContent feature={feature} key={feature._id}/>) ) : <div>
                    <h4>No Published Content Found</h4>
                </div>
            }
        </div>
    );
};

export default Contents;