

import Reg from './Regx';
import Log from './Logx';
import Home from './Home';
import Form from './comp/Form';
import Display from './comp/display';



import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useEffect } from 'react';




function App() {

  let d;
useEffect(() => { d =  localStorage.getItem("inn");

console.log("d is",d);

 
}, [])
  
  return (
    <div className="App">
      

        <BrowserRouter>
          <Routes>
            <Route  exact path='/reg' element={<Reg/>}/>
            <Route  exact path='/' element={<Log />}/>
            <Route  exact path='/home' element={<Home/>}/>
            <Route  exact path='/form' element={<Form/>}/>
            <Route  exact path='/display' element={<Display/>}/>
            

            
          </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
