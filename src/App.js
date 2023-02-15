import { useState} from 'react';


function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(null);
  
   const handleChanger = (e) =>{
      setCity(e.target.value)
    
   }

   const handleSearch= () => {
      fetch(`http://api.weatherapi.com/v1/current.json?key=7501cbdcfdea40d0928113950231402&q=${city}&lang=pt`)
      .then((response)=>{
          if(response.status === 200){
            return response.json();
          }
      })
      .then((data)=>{
         setWeatherForecast(data)
         console.log(data)
      })
   }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
         <a className="navbar-brand text-white" href="#top">
            Thiago Previsão de tempo
         </a>
      </nav>
      <main className="container">
         <div className="jumbotron">
          <h1>
            Verifique agora a previsão do tempo
          </h1>
           <p className="load">
             Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
           </p>
           <div className="row mb-4">
                <div className="col-md-6">
                  <input 
                    className="form-control" 
                    value={city}
                    onChange={handleChanger}
                  />
                </div>
           </div>
           <button
            className="ntn btn-primary btn-lg"
            onClick={()=>handleSearch()}>
              Pesquisar
           </button>
           {
              weatherForecast ? ( 
                <div className='mt-4 d-flex align-items-center'>
                  <div>
                    <img src= {weatherForecast.current.condition.icon}/>
                  </div>
                  <div>
                   <h3>hoje o dia está: {weatherForecast.current.condition.text}</h3>
                    <p>
                     Temp_C: {weatherForecast.current.temp_c}
                    </p>
                     <p>
                     Temp_F: {weatherForecast.current.temp_f}
                    </p>
                    <p>
                     Cidade: {weatherForecast.location.name}

                    </p>
                    <p>
                     Pais: {weatherForecast.location.country}

                    </p>
                  </div>
                </div>
             ) : null
           }
         </div>
       
      </main>
    </div>
  );
}

export default App;
