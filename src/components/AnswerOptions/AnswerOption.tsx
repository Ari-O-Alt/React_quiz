import React from 'react';

interface IAnswerOptionsProps {
  answerType: string;
  answerContent: string;
  answer: string;
  questionId: number;
  onAnswerSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const AnswerOption: React.FC<IAnswerOptionsProps> = (props) => {
  const { answerType, answerContent, answer, onAnswerSelected } = props;
  return (
    <div>
      <li className='answerOption'>
        <input
          type='radio'
          className='radioCustomButton'
          name='radioGroup'
          checked={answerType === answer}
          id={answerType}
          value={answerType}
          disabled={answer ? true : false}
          onChange={onAnswerSelected}
        />
        <label className='radioCustomLabel' htmlFor={answerType}>
          {answerContent}
        </label>
      </li>
    </div>
  );
};
export default AnswerOption;
