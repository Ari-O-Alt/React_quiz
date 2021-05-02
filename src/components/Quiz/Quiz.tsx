import React from 'react';
import AnswerOption from '../AnswerOptions/AnswerOption';
import Question from '../Question/Question';
import QuestionCount from '../QuestionCount/QuestionCount';

type AnswerOptionType = {
  type: string;
  content: string;
};

interface IQuizProps {
  answer: string;
  answerOptions: AnswerOptionType[];
  counter: number;
  question: string;
  questionId: number;
  questionTotal: number;
  onAnswerSelected: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Quiz: React.FC<IQuizProps> = (props) => {
  const {
    answer,
    answerOptions,
    counter,
    question,
    questionId,
    questionTotal,
    onAnswerSelected,
  } = props;

  return (
    <React.Fragment>
      <QuestionCount counter={counter} total={questionTotal}></QuestionCount>
      <Question content={question} />
      <ul className='answerOptions'>
        {answerOptions.map((option, index) => {
          return (
            <AnswerOption
              key={index}
              answerType={option.type}
              answerContent={option.content}
              answer={answer}
              questionId={questionId}
              onAnswerSelected={onAnswerSelected}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Quiz;
