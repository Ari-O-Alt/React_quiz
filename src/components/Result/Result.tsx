import React from 'react';

interface IResultProps {
  result: string;
}

const Result: React.FC<IResultProps> = (props) => {
  const { result } = props;
  return (
    <div>
      <p>You prefer {result}!</p>
    </div>
  );
};

export default Result;
