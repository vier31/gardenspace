import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

P5.propTypes = {};

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

let x = 50;
let y = 50;
function P5(props) {
  let glitch = 'blank';
  const setup = (p5, canvasParentRef) => {
    p5.loadImage('https://res.cloudinary.com/studiobanauso/image/upload/v1604441170/100daysofcode/100days_25.jpg', img => {
      glitch = img
    })
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(x/2, x > y ? x/2 : y/2, y/2);
    if (glitch !== 'blank') p5.image(glitch, x - 50, y - 50, x/3, y/4)
    // p5.ellipse(x, y, 70, 70);
    // p5.ellipse(x - 50, y - 50, x/3, y/4)
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;
    if (x % 2 === 0) y++
    if (x > 500) x = 0
    if (y > 500) y = 0
  };

  return (
    <div>
      Hello p5 - x: {x} - y: {y}
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
}

export default P5;
