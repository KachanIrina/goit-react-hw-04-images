import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { fetchImages } from 'servise/fetchImages';

export default function App() {
  // state = {
  //   query: '',
  //   images: [],
  //   page: 1,
  //   total: 0,
  //   isLoading: false,
  // };

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //const componentDidUpdate = (prevProps, prevState) => {
  //const { query, page } = this.state;
  // if (prevState.query !== query || prevState.page !== page)
  //   fetchImages(query, page)
  //     .then(resp => {
  //       if (resp.hits.lenght === 0) {
  //         return alert("oops, there's nothing here");
  //       }
  //       this.setState(prevState => ({
  //         images:
  //           page === 1 ? [...resp.hits] : [...prevState.images, ...resp.hits],
  //         total: resp.totalHits,
  //       }));
  //     })
  //     .finally(() => {
  //       this.setState({ isLoading: false });
  //     })
  //};
  useEffect(() => {
    fetchImages(query, page)
      .then(resp => {
        if (resp.hits.lenght === 0) {
          return alert('oops');
        }
        setImages(prevState =>
          page === 1 ? [...resp.hits] : [...prevState, ...resp.hits]
        );
        setTotal(resp.totalHits);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  // const handleLoadMore = () => {
  //   this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
  // };
  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  // const handleSubmit = query => {
  //   this.setState({ query, page: 1, images: [], isLoading: true });
  // };
  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setIsLoading(true);
  };

  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < total && (
        <Button onClick={handleLoadMore} />
      )
    );
  };

  return (
    <div
      style={{
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        backgroundColor: '#22232B',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOrLoader()}
    </div>
  );
}
