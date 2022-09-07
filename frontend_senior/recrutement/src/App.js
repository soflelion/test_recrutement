import './App.css';
import Calendar from './components/Calendar/Calendar';

import data from './shared/input.json'


function App() {
  return (
    <div className="App">
      <div className="App-content">
        <Calendar events={data} />
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
