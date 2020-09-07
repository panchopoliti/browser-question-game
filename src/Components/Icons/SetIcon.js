import React from 'react';
import PropTypes from 'prop-types';

export default function SetIcon({
    className,
    width,
    height,
    color,
    title, 
    pathData, 
    description,
    viewBox,
}) {
    
    return (
        <figure style={{ margin: 0 }}>
            <svg
                className={className}
                width={width}
                height={height}
                title={title}
                focusable='false'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox={viewBox}
            >
                <path
                    fill={color}
                    d={pathData}
                />
                <desc> {description} </desc>
            </svg>
        </figure>
    )
}

SetIcon.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
    pathData: PropTypes.string,
    description: PropTypes.string,
    viewBox: PropTypes.string,
}