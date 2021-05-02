import React from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import QuizQuestions, { AnswerType } from './components/Api/QuizQuestions';

interface IAnswersCount {
  nintendo: number;
  microsoft: number;
  sony: number;
}

/* interface IState {
  counter: number;
  questionId: number;
  question: string;
  answerOptions: AnswerType[];
  answer: string;
  answersCount: IAnswersCount;
  result: string;
} */

const updatePropery = (
  object: IAnswersCount,
  property: string
): IAnswersCount => {
  const valueToUpdate = object[property as keyof IAnswersCount];
  const newValue = valueToUpdate + 1;
  const newObject = { ...object, [valueToUpdate]: newValue };

  return newObject;
};

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

// [TO DO] break state
const App: React.FC = () => {
  /* const [state, setState] = React.useState<IState>({
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
  }); */

  const [counter, setCounter] = React.useState<number>(0);
  const [questionId, setQuestionId] = React.useState<number>(1);
  const [question, setQuestion] = React.useState<string>('');
  const [answerOptions, setAnswerOptions] = React.useState<AnswerType[]>([]);
  const [answer, setAnswer] = React.useState<string>('');
  const [answersCount, setAnswersCount] = React.useState<IAnswersCount>({
    nintendo: 0,
    microsoft: 0,
    sony: 0,
  });
  const [result, setResult] = React.useState<string>('');

  React.useEffect(() => {
    const shuffledAnswerOptions: AnswerType[][] = QuizQuestions.map(
      (question) => shuffleArray(question.answers)
    );
    /* setState({
      ...state,
      question: QuizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
    }); */
    setQuestion(QuizQuestions[0].question);
    setAnswerOptions(shuffledAnswerOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*  console.log(state); */

  const setUserAnswer = (answer: string): void => {
    // create function that updates the property of an object based on the previous value
    const updatedAnswersCount = updatePropery(answersCount, answer);
    /*  setState({ ...state, answersCount: updatedAnswersCount, answer: answer }); */
    setAnswer(answer);
    setAnswersCount(updatedAnswersCount);
  };

  const setNextQuestion = () => {
    const newCounter = counter + 1;
    const newQuestionId = questionId + 1;
    setCounter(newCounter);
    setQuestionId(newQuestionId);
    setQuestion(QuizQuestions[newCounter].question);
    setAnswerOptions(QuizQuestions[newCounter].answers);
    setAnswer('');
    /*  this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    }); */
  };

  const handleAnswerSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.currentTarget.value);
    if (questionId < QuizQuestions.length) {
      setTimeout(() => setNextQuestion(), 300);
    } else {
      // do nothing for now
    }
  };

  return (
    <div className='App'>
      <Quiz
        answerOptions={answerOptions}
        answer={answer}
        counter={counter}
        question={question}
        questionId={questionId}
        questionTotal={QuizQuestions.length}
        onAnswerSelected={handleAnswerSelected}
      />
    </div>
  );
};

export default App;
