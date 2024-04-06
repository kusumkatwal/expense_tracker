import React, { useState, useMemo } from 'react'
import styled from "styled-components";
// import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Login from './Components/Login/login'
import Registration from './Components/Registration/Registration';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
// import { ToastContainer } from 'react-toastify';

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      case 5:
        return <Registration />
      case 6:
        return <Login />
      default:
        return <Dashboard />
    }
  }

  // const orbMemo = useMemo(() => {
  //   return <Orb />
  // }, [])

  return (
    <AppStyled className="App">
      {/* {orbMemo} */}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            {displayData()}
          </main>
        </MainLayout>
     

    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color : rgba(252, 246, 249, 0.78);
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    overflow-x: hidden;
       &::-webkit-scrollbar{
         width: 0;
       }
   
   
  }
`;

export default App;
