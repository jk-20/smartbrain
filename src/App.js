import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './containers/Navigation/Navigation';
import Logo from './containers/Logo/Logo';
import Rank from './containers/Rank/Rank';
import ImageLineForm from './containers/ImageLineForm/ImageLineForm';
import FormRecognition from './containers/FormRecognition/FormRecognition';

import './App.css';
const app = new Clarifai.App({
  apiKey: '8b6bcf95aa2c40818be5bca1f6d56b04'
 });
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

  constructor() {
    super();
    this.state ={
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  
  render(){
    return (
      <div className="App">
        <Particles className='particles' 
                params={ParticlesOptions}
                
              />
        <Navigation />
         <Logo />
         <Rank />
        <ImageLineForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
        
        <FormRecognition imageUrl={this.state.imageUrl} /> 
        
      </div>
    );

  }
}


export default App;
