import { RouterProvider } from 'react-router-dom';
import router from '../router';
import { SeatAmountProvider } from '../context/SeatAmountContext';

export function App() {
  return (
    <SeatAmountProvider>
      <RouterProvider router={router} />
    </SeatAmountProvider>
  );
}

export default App;
