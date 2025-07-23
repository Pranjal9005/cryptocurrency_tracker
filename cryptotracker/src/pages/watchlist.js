import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import axios from 'axios';

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    const ids = stored ? JSON.parse(stored) : [];
    setWatchlist(ids);
    if (ids.length === 0) {
      setCoins([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}`)
      .then((response) => {
        setCoins(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 800, margin: '32px auto', padding: '0 16px' }}>
        <h1 style={{ color: 'var(--blue)', marginBottom: 24 }}>Your Watchlist</h1>
        {loading ? (
          <Loader />
        ) : watchlist.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>
            Your watchlist is empty.<br />Go to the dashboard and add coins to your watchlist!
          </div>
        ) : coins.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 40 }}>
            No coins found for your watchlist.
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {coins.map((coin) => (
              <div key={coin.id} style={{ background: '#222', borderRadius: 12, padding: 24, minWidth: 220, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                <img src={coin.image} alt={coin.name} style={{ width: 60, height: 60, marginBottom: 12 }} />
                <h2 style={{ margin: '8px 0 0' }}>{coin.name}</h2>
                <p style={{ color: '#3a80e9', fontWeight: 600, fontSize: 18 }}>${coin.current_price.toLocaleString()}</p>
                <p style={{ color: coin.price_change_percentage_24h < 0 ? 'var(--red)' : 'var(--green)', fontWeight: 500 }}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
                <p style={{ color: '#aaa', fontSize: 14 }}>Market Cap: ${coin.market_cap.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
   