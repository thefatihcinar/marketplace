import Header from './components/Header'
import Footer from './components/Footer'
/* Import Bootswatch */
import './bootstrap.min.css' 
/* Import Screens */
import HomeScreen from './screens/HomeScreen'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <HomeScreen/>
      <Footer></Footer>
    </div>
  );
}

export default App;
