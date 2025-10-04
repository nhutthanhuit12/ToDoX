import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import Homepage from './pages/Homepage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Homepage/>}
        />

        <Route
          path="*"
          element={<NotFound/>}
        />

      </Routes>
    </BrowserRouter>
  </>
}

export default App
