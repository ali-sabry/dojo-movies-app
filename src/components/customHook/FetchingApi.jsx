import { useState, useEffect } from 'react';

const useFetchingApi = (API_URL) => {
    const [MoviesData, setMoviesData] = useState([]);
    const [MessageError, setMessageError] = useState('');
    const [IsLoading, setIsLoading] = useState(true);
    const [IsError, setIsError] = useState(false);

    const getData = async () => {
        try {
            const response = await fetch(`${API_URL}?api_key=${process.env.REACT_APP_Movies_Api_Key}`);
            const result = await response.json();
            setIsLoading(false);
            setMoviesData(result.results);
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            setMessageError(error);
        }
    };

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { IsLoading, IsError, MessageError, MoviesData };
};

export default useFetchingApi;