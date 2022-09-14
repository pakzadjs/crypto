import React, { useState, useEffect } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

// API
import { getCoin } from '../services/api';

// Components
import Loader from './Loader';
import Coin from './Coin';

// Styles
import styles from './Landing.module.css';

const Landing = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCoin();
            setCoins(data);
        };

        fetchAPI();
    }, []);

    const searchHandler = (event) => {
        setSearch(event.target.value);
    };

    const searchedCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

    const darkModeHandler = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'landing dark' : 'landing'}>
            <div className={styles.top}>
                <button onClick={darkModeHandler}>{darkMode ? <HiMoon /> : <HiSun />}</button>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={searchHandler}
                />
            </div>

            {coins.length ? (
                <div className={styles.coinContainer}>
                    {searchedCoins.map((coin) => (
                        <Coin
                            key={coin.id}
                            name={coin.name}
                            image={coin.image}
                            symbol={coin.symbol}
                            price={coin.current_price}
                            marketCap={coin.market_cap}
                            priceChange={coin.price_change_percentage_24h}
                        />
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Landing;
