import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';

function App() {
  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/auth' element={<Authentication/>} />
          </Routes>
        </Router>
    </div>
  )
}

export default App
