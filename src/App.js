import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import './App.css';
function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
