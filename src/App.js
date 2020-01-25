import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './containers/Navigation/Navigation';
import Logo from './containers/Logo/Logo';
import Rank from './containers/Rank/Rank';
import ImageLineForm from './containers/ImageLineForm/ImageLineForm';

import './App.css';

const ParticlesOptions = {
  
    particles: {
      number: {
        value: 150,
        density: {
          enable:true,
          value_area:800
        }
      }
    }
  
}
class App extends Component {
  render(){
    return (
      <div className="App">
        <Particles className='particles' 
                params={ParticlesOptions}
                
              />
        <Navigation />
         <Logo />
         <Rank />
        <ImageLineForm />
        
       {/* <FormRecognition /> */}
        
      </div>
    );

  }
}


export default App;
