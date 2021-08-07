import Header from './components/Header'
import Footer from './components/Footer'
/* Import Bootswatch */
import './bootstrap.min.css' 
/* Import React-Bootstrap*/
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
/* Import Screens */
import HomeScreen from './screens/HomeScreen'


function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className='pt-1'>
          <HomeScreen/>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
