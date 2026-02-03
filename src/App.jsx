
import './App.css'
import Createpost from './component/Createformpost';
import { RouterProvider } from 'react-router-dom';
import { router } from './component/Route';

function App() {

 
  return (
    <>

    <RouterProvider router={router}/>

    
    </>
  )
}

export default App
