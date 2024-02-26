import React from 'react';

const Loading = ({ size, color }) => {
  let bgColorClass = '';
  switch (color) {
    case 'lightBlue':
      bgColorClass = 'bg-blue-100';
      break;
    case 'mediumBlue':
      bgColorClass = 'bg-blue-200';
      break;
    case 'darkBlue':
      bgColorClass = 'bg-blue-300';
      break;
    default:
      bgColorClass = 'bg-blue-400';
  }

  let sizeClass = '';
  switch (size) {
    case 'xs':
      sizeClass = 'loading-xs';
      break;
    case 'sm':
      sizeClass = 'loading-sm';
      break;
    case 'md':
      sizeClass = 'loading-md';
      break;
    case 'lg':
      sizeClass = 'loading-lg';
      break;
    default:
      sizeClass = 'loading-md';
  }

  return <span className={`loading loading-bars ${sizeClass} ${bgColorClass}`}></span>;
};

export default Loading;