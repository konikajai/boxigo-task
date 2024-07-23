import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MyMove from './components/mymove/MyMove';
// import MyProfile from './components/MyProfile';
// import GetQuote from './components/GetQuote';
// import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <MyMove/>
      {/* <BrowserRouter>
      <Routes>
        <Route path='/mymove' element={<MyMove/>}/>
        <Route path='mymove' element={<MyProfile/>}/>
        <Route path='mymove' element={<GetQuote/>}/>
        <Route path='mymove' element={<Logout/>}/>
      </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
