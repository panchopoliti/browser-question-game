import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TriumphAudio from '../../static/Jingles/triumph-trumpets.mp3';

export default function TriumphJingle({ play }) {

    const audioElement = useRef(null);

    const playAudio = () => {
        audioElement.current.play();
    }

    useEffect(() => {
        if (play) playAudio();
    }, [play])

    return (
        <audio src={TriumphAudio} ref={audioElement}>
                Your browser does not support the <code>audio</code> element.
        </audio>
    )
}

TriumphJingle.propTypes = {
    play: PropTypes.bool,
}