import React from 'react';
import './App.css';
/* import Quiz from './components/Quiz/Quiz'; */
import QuizQuestions, { AnswerType } from './components/Api/QuizQuestions';

interface IState {
  counter: number;
  questionId: number;
  question: string;
  answerOptions: AnswerType[];
  answer: string;
  answersCount: {
    nintendo: number;
    microsoft: number;
    sony: number;
  };
  result: string;
}

const shuffleArray = (array: AnswerType[]): AnswerType[] => {
  let currentIndex: number = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const App: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    counter: 0,
    questionId: 1,
    question: '',
    answerOptions: [],
    answer: '',
    answersCount: {
      nintendo: 0,
      microsoft: 0,
      sony: 0,
    },
    result: '',
  });

  React.useEffect(() => {
    const shuffledAnswerOptions: AnswerType[][] = QuizQuestions.map(
      (question) => shuffleArray(question.answers)
    );
    setState({
      ...state,
      question: QuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(state);

  return <div className='App'>{/*  <Quiz /> */}</div>;
};

export default App;
