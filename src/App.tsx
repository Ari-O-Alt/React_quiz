import React from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import QuizQuestions, { AnswerType } from './components/Api/QuizQuestions';
import Result from './components/Result/Result';
import { IAnswersCount } from './BusinessLogic/Interfaces';
import Functions from './BusinessLogic/Functions';

const shuffleArray = (array: AnswerType[]): AnswerType[] => {
  let currentIndex: number = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    // While there remain elements to shuffle...
    randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element...
    currentIndex -= 1;
    temporaryValue = array[currentIndex]; // And swap it with the current element.
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const App: React.FC = () => {
  /**
   * All states the App component holds
   */
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

  /**
   * Sets the state once using the data source in the API folder
   */
  React.useEffect(() => {
    const shuffledAnswerOptions: AnswerType[][] = QuizQuestions.map(
      (question) => shuffleArray(question.answers)
    );
    setQuestion(QuizQuestions[0].question);
    setAnswerOptions(shuffledAnswerOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUserAnswer = (answer: string): void => {
    const updatedAnswersCount = Functions.updatePropery(answersCount, answer);

    // [TO DO] update answersCount correctly using the answer
    // display the Result component only when all questions are answered
    setAnswer(answer);
    setAnswersCount(updatedAnswersCount);
  };

  /**
   * Sets the next question after the user has selected an answer fot the current question
   */
  const setNextQuestion = (): void => {
    const newCounter = counter + 1;
    const newQuestionId = questionId + 1;
    setCounter(newCounter);
    setQuestionId(newQuestionId);
    setQuestion(QuizQuestions[newCounter].question);
    setAnswerOptions(QuizQuestions[newCounter].answers);
    setAnswer('');
  };

  /**
   * Gets the result based on the answer count with the biggest value
   */
  const getResults = (): string[] => {
    const _answersCount = answersCount; // we get the answers count {nintendo: ?,microsoft: ?, sony: ?,}
    const answersCountKeys = Object.keys(_answersCount); // we extract the keys of the object
    const answersCountValues = answersCountKeys.map(
      // we return all the values inside of _answersCount based on the keys; returns an array of numbers
      (key) => _answersCount[key as keyof IAnswersCount]
    );
    const maxAnswerCount = Math.max.apply(null, answersCountValues); // we find the biggest number in the array
    return answersCountKeys.filter(
      // we find the key with the value equal to maxAnswerCount and return the value (it will be an array with 1 item)
      (key) => _answersCount[key as keyof IAnswersCount] === maxAnswerCount
    );
  };

  /**
   * Sets the result to the state
   */
  const setResults = (results: string[]) => {
    if (results.length === 1) {
      // if the array has one item, set it to the state
      setResult(results[0]);
    } else {
      setResult('Undetermined'); // else, set 'Undetermined' to the state
    }
  };

  /**
   * Handles answer selection
   */
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
