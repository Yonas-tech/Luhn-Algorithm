import Form from './compnents/Form';

function App() {

  const header = () => {
    return ( 
      <div className="header">
        <h1>Luhn Algorithm Validator</h1>
      </div>
     );
  }
   
  
  return (
    <div className="App">
      {header()}
      <Form/>
    </div>
  );
}

export default App;
