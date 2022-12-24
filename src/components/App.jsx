import { Component } from 'react';
import Button from './Button/Button'
import ImageGallery from './ImageGallery/ImageGallery'
import Searchbar from './Searchbar/Searchbar'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'



class App extends Component {
  render() {
    
    return (
      <>
        <Button />
        <Searchbar />
        <ImageGallery />
        <ImageGalleryItem />
      </>
    );
  }
  
};

export default App;