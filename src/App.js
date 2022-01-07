
import './App.css';
import SummaryForm from './pages/summary/SummaryForm';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/** Summary page and entry page need provider */}
        <OrderEntry></OrderEntry>
        {/** Confirmation doesn't need it */}
      </OrderDetailsProvider>
    </Container>  
  );
}

export default App;
