//imports...
import { BrowserRouter } from 'react-router';
import { Navigate } from 'react-router';
import { Route } from 'react-router';
import { Routes } from 'react-router';
//pages
import Home from './pages/home/Home';
import Rules from './pages/rules/Rules';
import Question from './pages/question/Question';
//styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<Question />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
