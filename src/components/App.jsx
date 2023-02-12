import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { fetchImages } from 'servise/fetchImages';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const resp = await fetchImages(query, page);
        if (resp) {
          if (resp.hits.lenght === 0) {
            throw new Error('oops');
          }
          setImages(prevState => [...prevState, ...resp.hits]);
          setTotal(resp.totalHits);
        }
      } catch (error) {
        throw Error('Error');
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchData();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
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
