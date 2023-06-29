import React from 'react';
import classNames from 'classnames';

function Skeleton({ howMany, className }) {
  // className prop used so width/height can be set.

  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200',
    className,
  );
  // inset 0 to make it expand to fill the outer div.
  // -translate-x-full to move it exactly to the left of the outer div.
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
  );

  // create a new array with the length of howMany.
  // the array is only used to map over it.
  // this is ok for a small array (like skeletons).
  // use a for loop for large array to save space in memory.
  const boxes = Array(howMany)
    .fill(0)
    .map((_, idx) => {
      return (
        <div key={idx} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return boxes;
}
// outer div stays in place.
// inner div is the one with the gradient that moves from left to right infinitely.
// see tailwind.config.js for the animation.

export default Skeleton;
