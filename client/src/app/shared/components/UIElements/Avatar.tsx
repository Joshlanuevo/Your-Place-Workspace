import React from 'react';

const Avatar = (props: any) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${props.className}`}
      style={props.style}
    >
      <img
        src={props.image}
        alt={props.alt}
        className="block rounded-full w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
