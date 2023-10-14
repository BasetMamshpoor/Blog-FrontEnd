import './App.css';
import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main/Main';
import NotFound from './Pages/NotFound/NotFound';
import Navbar from './Components/Navbar/Navbar';
import SignUp from './Auth/SignUp';
import LogIn from './Auth/LogIn';
import Details from './Pages/Details/Details';
import Follow from './Pages/Follow/Follow';
import UserProfile from './Pages/Profile/UserProfile';
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile';
import NewBlog from './Pages/NewBlog/NewBlog';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/edit-profile' element={<UpdateProfile />} />
        <Route path='/blog-option' element={<NewBlog />} />
        <Route path='/posts/:location/:id/' element={<Details />} />
        <Route path='/user/:user/:follow' element={<Follow />} />
        <Route path='/user/:user' element={<UserProfile />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/explore' element={<Main type='explore' />} />
        <Route path='/' element={<Main type='post' />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
