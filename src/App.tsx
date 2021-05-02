import React from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import QuizQuestions, { AnswerType } from './components/Api/QuizQuestions';
import Result from './components/Result/Result';

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

  const [question, setQuestion] = React.useState<string>('');
  const [counter, setCounter] = React.useState<number>(0);
  const [questionId, setQuestionId] = React.useState<number>(1);
  const [answer, setAnswer] = React.useState<string>('');
  const [answerOptions, setAnswerOptions] = React.useState<AnswerType[]>([]);
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
    setQuestion(QuizQuestions[0].question);
    setAnswerOptions(shuffledAnswerOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserAnswer = (answer: string): void => {
    // create function that updates the property of an object based on the previous value
    const updatedAnswersCount = updatePropery(answersCount, answer);

    // [TO DO] update answersCount correctly using the answer
    // display the Result component only when all questions are answered
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

  const getResults = (): string[] => {
    // we het the answers count {nintendo: ?,microsoft: ?, sony: ?,}
    const _answersCount = answersCount;
    // we extract the keys
    const answersCountKeys = Object.keys(_answersCount);
    // we return all the values inside of _answersCount based in the keys
    const answersCountValues = answersCountKeys.map(
      (key) => _answersCount[key as keyof IAnswersCount]
    );
    // we find the biggest number in the array
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    // we find the key with the value equal to maxAnswerCount
    return answersCountKeys.filter(
      (key) => _answersCount[key as keyof IAnswersCount] === maxAnswerCount
    );
  };

  const setResults = (results: string[]) => {
    if (results.length === 1) {
      setResult(results[0]);
    } else {
      setResult('Undetermined');
    }
  };

  const handleAnswerSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.currentTarget.value); // we set the answer to the state
    if (questionId < QuizQuestions.length) {
      // if questionId is smaller than 4
      setTimeout(() => setNextQuestion(), 300); // set next question
    } else {
      setTimeout(() => setResults(getResults()), 300); // if not prepare the results to be displayed on the page
    }
  };

  return (
    <div className='App'>
      <Quiz
        question={question}
        questionId={questionId}
        questionTotal={QuizQuestions.length}
        answer={answer}
        answerOptions={answerOptions}
        counter={counter}
        onAnswerSelected={handleAnswerSelected}
      />
      <Result result={result} />
    </div>
  );
};

export default App;
