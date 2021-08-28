import Header from './components/Header'
import Footer from './components/Footer'
/* Import Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
/* Import Screens */
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <Router>
      <Header></Header>
      <Route path = '/' component = {HomeScreen} exact></Route>
      <Route path = '/product/:id' component = {ProductDetails} ></Route>
      <Footer></Footer>
    </Router>
  );
}

export default App;
