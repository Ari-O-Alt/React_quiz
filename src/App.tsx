import './App.css';
import Question from './components/Question/Question';
import QuestionCount from './components/QuestionCount/QuestionCount';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Question content={'What day is today?'} />
      <QuestionCount counter={1} total={5} />
    </div>
  );
};

export default App;
