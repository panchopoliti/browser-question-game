import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Confetti.module.scss';

export default function Confetti({ startAnimation }) {
    
    const confettiRef = useRef(null);
    let container, confettiElements = [], clickPosition;

    const confettiParams = {
        // number of confetti per "explosion"
        number: 200,
        // min and max size for each rectangle
        size: { x: [5, 15], y: [8, 12] },
        // power of explosion
        initSpeed: 15,
        // defines how fast particles go down after blast-off
        gravity: 0.25,
        // how wide is explosion
        drag: 0.08,
        // how slow particles are falling
        terminalVelocity: 6,
        // how fast particles are rotating around themselves
        flipSpeed: 0.017,
        // set a limited number of "explosions"
        numOfExplosions: 3,
        // miliseconds per "explosion"
        msPerExplosion: 500,
    }
    const colors = [
        { front : '#3B870A', back: '#235106' },
        { front : '#B96300', back: '#6f3b00' },
        { front : '#E23D34', back: '#88251f' },
        { front : '#CD3168', back: '#7b1d3e' },
        { front : '#664E8B', back: '#3d2f53' },
        { front : '#394F78', back: '#222f48' },
        { front : '#008A8A', back: '#005353' },
    ];

    const startToAnimate = () => {
        const confettiContext = confettiRef.current.getContext('2d');

        setupCanvas();
        updateConfetti();
        setExplosions();

        function setupCanvas() {

            container = {
                w: confettiRef.current.clientWidth,
                h: confettiRef.current.clientHeight
            };
    
        }
    
        function Conf() {
            this.confettiRandomModifier = confettiRandom(-1, 1);
            this.colorPair = colors[Math.floor(confettiRandom(0, colors.length))];
            this.dimensions = {
                x: confettiRandom(confettiParams.size.x[0], confettiParams.size.x[1]),
                y: confettiRandom(confettiParams.size.y[0], confettiParams.size.y[1]),
            };
            this.position = {
                x: clickPosition[0],
                y: clickPosition[1]
            };
            this.rotation = confettiRandom(0, 2 * Math.PI);
            this.scale = { x: 1, y: 1 };
            this.velocity = {
                x: confettiRandom(-confettiParams.initSpeed, confettiParams.initSpeed) * 0.4,
                y: confettiRandom(-confettiParams.initSpeed, confettiParams.initSpeed)
            };
            this.flipSpeed = confettiRandom(0.2, 1.5) * confettiParams.flipSpeed;
        
            if (this.position.y <= container.h) {
                this.velocity.y = -Math.abs(this.velocity.y);
            }
        
            this.terminalVelocity = confettiRandom(1, 1.5) * confettiParams.terminalVelocity;
        
            this.update = function () {
                this.velocity.x *= 0.98;
                this.position.x += this.velocity.x;
        
                this.velocity.y += (this.confettiRandomModifier * confettiParams.drag);
                this.velocity.y += confettiParams.gravity;
                this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
                this.position.y += this.velocity.y;
        
                this.scale.y = Math.cos((this.position.y + this.confettiRandomModifier) * this.flipSpeed);
                this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
            }
        }
    
        function updateConfetti () {
            confettiContext.clearRect(0, 0, container.w, container.h);
    
            confettiElements.forEach((c) => {
                c.update();
                confettiContext.translate(c.position.x, c.position.y);
                confettiContext.rotate(c.rotation);
                const width = (c.dimensions.x * c.scale.x);
                const height = (c.dimensions.y * c.scale.y);
                confettiContext.fillStyle = c.color;
                confettiContext.fillRect(-0.5 * width, -0.5 * height, width, height);
                confettiContext.setTransform(1, 0, 0, 1, 0, 0)
            });
    
            confettiElements.forEach((c, idx) => {
                if (c.position.y > container.h ||
                    c.position.x < -0.5 * container.x ||
                    c.position.x > 1.5 * container.x) {
                    confettiElements.splice(idx, 1)
                }
            });
            window.requestAnimationFrame(updateConfetti);
        }
    
        function addConfetti() {
            const canvasBox = confettiRef.current.getBoundingClientRect();

            clickPosition = [
                canvasBox.width * Math.random(),
                canvasBox.height * Math.random()
            ];
            
            for (let i = 0; i < confettiParams.number; i++) {
                confettiElements.push(new Conf())
            }
        }

        function setExplosions() {

            for (let i = 0; i < confettiParams.numOfExplosions; i++) {
                setTimeout(addConfetti, confettiParams.msPerExplosion);
            }
        }
    }

    useEffect(() => {
        if (startAnimation) startToAnimate();
    });
    
    return (
        <div className={styles.container}>
            <canvas ref={confettiRef}/>
        </div>
    )
}

const confettiRandom = (min, max) => Math.random() * (max - min) + min;

Confetti.propTypes = {
    startAnimation: PropTypes.bool,
}