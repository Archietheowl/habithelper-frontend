import { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

//!---Styles
import styles from './App.module.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

//!--- Componants
import NavBar from './components/NavBar/NavBar';

//!--- Pages
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

import Landing from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
  
import Timer from './pages/Timer/Timer';
import HabitHelper from './pages/HabitHelper/HabitHelper';
import Journal from './pages/Journal/Journal';

//!--- Utils
import {getUser, removeToken } from './utils/auth'


const App = () => {
//!---Setting States
const [user, setUser] = useState(getUser())

//!---Location variables
const navigate = useNavigate()

//!---Handlers
const handleSignOut = () => {
  removeToken()
  setUser(null)
  navigate('/signin')
}
  
  return(
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <main>
        
        <Routes>
          { user 
            ?(
              <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/timers" element={<Timer user={user}/>} />
                <Route path="/habit-helpers" element={<HabitHelper user={user} />} />
                <Route path="/journals" element={<Journal />} />
              </>
            )
            : (
              <>
                <Route path="/" element={<Landing />} />
                <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
                <Route path="/sign-in" element={<SignIn setUser={setUser} />} />
              </>
            )
          }
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <div className='footnav'>

        </div>
      </main>
    </>
  )
};

export default App;
