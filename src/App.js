import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './containers/Navigation/Navigation';
import Signin from './containers/Signin/Signin';
import Register from './containers/Register/Register';
import Logo from './containers/Logo/Logo';
import Rank from './containers/Rank/Rank';
import ImageLineForm from './containers/ImageLineForm/ImageLineForm';
import FaceRecognition from './containers/FaceRecognition/FaceRecognition';

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
      imageUrl: '',
      box: {},
      route : 'signin',
      isSignin : false
      
    }
  }
   calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


displayFaceBox = (box) => {
  console.log(box);
  this.setState({box : box});
}


  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  
   
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignin : false});
    }else if(route === 'home'){
      this.setState({isSignin : true});
    }
    this.setState({route : route});
  }
  
  render(){
   const  {imageUrl ,isSignin , route , box} = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
                params={ParticlesOptions}
                
              />
        <Navigation isSignin ={isSignin} onRouteChange ={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
         <Logo />
         <Rank />
        <ImageLineForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
        
        <FaceRecognition box={box} imageUrl={imageUrl} /> 
        </div>
        : (
          route === 'signin'
          ?<Signin onRouteChange={this.onRouteChange} />
          :<Register onRouteChange={this.onRouteChange} />
          

        )
          
          
        }
        
        
      </div>
    );

  }
}


export default App;
