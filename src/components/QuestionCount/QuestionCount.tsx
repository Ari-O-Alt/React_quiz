import React from 'react';

interface IQuestionCountProps {
  counter: number;
  total: number;
}

const QuestionCount: React.FC<IQuestionCountProps> = (props) => {
  const { counter, total } = props;
  return (
    <div>
      <span>
        Question {counter} of {total}
      </span>
    </div>
  );
};

export default QuestionCount;
