import React from 'react';

const DummyList = ({ obj }) => {
  const formattedInfo = Object.keys(obj)
    .map(key => `${key}: ${obj[key]}`)
    .join('\n');

  return (
    <div>{formattedInfo}</div>
  );
};

export default DummyList;