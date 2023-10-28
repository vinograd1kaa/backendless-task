import React from 'react';

const DummyChart = ({ obj }) => {
  const formattedInfo = Object.keys(obj)
    .map(key => `${key}: ${obj[key]}`)
    .join('\n');

  return (
    <div>{formattedInfo}</div>
  );
};

export default DummyChart;
