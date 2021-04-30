import React from 'react';

interface IQuestionProps {
  content: string;
}

const Question: React.FC<IQuestionProps> = (props) => {
  const { content } = props;
  return <h2>{content}</h2>;
};

export default Question;
