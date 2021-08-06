import Header from './components/Header'
import Footer from './components/Footer'
/* Import Bootswatch */
import './bootstrap.min.css' 
/* Import React-Bootstrap*/
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'



function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className='pt-1'>
          <h1>WELCOME TO OUR WEBSITE</h1>
      </main>
      <Footer></Footer>
      <Button variant="primary">Deneme Buton</Button>
    </div>
  );
}

export default App;
