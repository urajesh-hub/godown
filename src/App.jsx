import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditGodown from './component/EditGodown';
// import ReadGodown from './component/ReadGodown';
import Navbar from './component/Navbar';
import QrCode from './component/QrCode';



const App = () => {
  return (
    <Router>
      
      <Routes>
      
        <Route path="/" element={<QrCode />} />
        {/* <Route path="/" element={<ReadGodown />} /> */}
        <Route path="/edit" element={<Navbar />} />
        <Route path="/EditGodown" element={<EditGodown />} />
        <Route path="/QrCode" element={<QrCode />} />
      </Routes>
    </Router>
  );
};

export default App;
