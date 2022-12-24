import { Component } from 'react';
import Button from './Button/Button'
import ImageGallery from './ImageGallery/ImageGallery'
import Searchbar from './Searchbar/Searchbar'



class App extends Component {
  render() {
    
    return (
      <>
        <Button />
        <Searchbar />
        <ImageGallery />
      </>
    );
  }
  
};

export default App;