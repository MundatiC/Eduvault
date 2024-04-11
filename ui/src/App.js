import Display from './components/Display';
import Navbar from './components/Navbar';
import Import from './components/Import';
import SingleStudent from './components/SingleStudent';

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path="/" element={<><Navbar />
        <Display />
      </>

      } />
      <Route path="/import" element={<>
        <Navbar /><Import />
      </>} />
      <Route path="/students/:id" element={<>
        <Navbar />
        <SingleStudent />
      </>} />
    </Route>

  )
);

function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
