import './Styles/global.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import {Context} from './Context';
import axios from 'axios';
import {useState,useEffect} from 'react';


function App() {
  const [user, setUser] = useState([]);
  const[token]=useState(localStorage.getItem('token'))
  useEffect(() => {
    axios
      .get("https://socialmediabackend1.herokuapp.com/users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setUser(res.data))
      .catch((e) => console.log(e));
  }, []);



  return (
 <>
 <Context.Provider value={{user}}>
   <Routes>
   <Route  path='/' element={<Login/>}/>
   <Route  path='/home' element={token?<Home/> : <Navigate replace to='/'/>}/>
   <Route  path='/profile' element={token?<Profile/> : <Navigate replace to='/'/>}/>

   </Routes>
 </Context.Provider>
 </>
  );
}

export default App;
