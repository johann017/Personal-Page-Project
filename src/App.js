import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import AboutMe from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Resume from './pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/about' element={<AboutMe/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/resume' element={<Resume/>}/>
          <Route index element={<Home/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
