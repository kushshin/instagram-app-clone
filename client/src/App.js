import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile';
import CreatePost from './Pages/CreatePost';
import Profile from './Pages/Profile';
import EditProfile from './Pages/Editprofile'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route exact path="/profile/editProfile/:userId" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
