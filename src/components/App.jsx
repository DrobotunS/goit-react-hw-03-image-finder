import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import fetchImages from './ServicesAPI/Pixabay';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    loading: false,
    page: 1,
    images: null,
    imagesOnPage: 0,
    totalImages: 0,
    showModal: false,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.setState(({ loading }) => ({ loading: !loading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState({
            page: 1,
            images: imagesArray,
            imagesOnPage: imagesArray.length,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState(({ loading }) => ({ loading: !loading })));
    }
    if (prevState.page !== page && page !== 1) {
      this.setState(({ loading }) => ({ loading: !loading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));
          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState(({ loading }) => ({ loading: !loading })));
    }
  }

  getSearchSubmit = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = evt => {
    const currentImageUrl = evt.target.dataset.large;
    const currentImageDescription = evt.target.alt;

    if (evt.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      loading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    const getSearchSubmit = this.getSearchSubmit;
    const onNextFetch = this.onNextFetch;
    const openModal = this.openModal;
    const toggleModal = this.toggleModal;

    return (
      <>
        <Searchbar onSubmit={getSearchSubmit} />
        {images && <ImageGallery images={images} openModal={openModal} />}

        {loading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}
        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
