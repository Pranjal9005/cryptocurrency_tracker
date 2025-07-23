import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const COIN_CACHE_KEY = 'compare_coins_cache';
const HISTORY_CACHE_KEY = 'compare_history_cache';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCache(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

function getHistoryCache() {
  const item = localStorage.getItem(HISTORY_CACHE_KEY);
  if (!item) return {};
  try {
    const parsed = JSON.parse(item);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return parsed.data;
    }
    return {};
  } catch {
    return {};
  }
}

function setHistoryCache(data) {
  localStorage.setItem(HISTORY_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

function Compare() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitTimeout, setRateLimitTimeout] = useState(null);
  const navigate = useNavigate();

  // Load coins with cache
  useEffect(() => {
    setLoading(true);
    const cached = getCache(COIN_CACHE_KEY);
    if (cached) {
      setCoins(cached);
      setLoading(false);
    } else {
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
        .then((response) => {
          setCoins(response.data);
          setCache(COIN_CACHE_KEY, response.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{margin:'40px 0',padding:32,fontFamily:'Inter, sans-serif'}}>
      <button onClick={() => navigate('/dashboard')} style={{marginBottom:24,padding:'8px 20px',borderRadius:6,border:'none',background:'#3a80e9',color:'#fff',fontWeight:600,cursor:'pointer'}}>← Back to Dashboard</button>
      {rateLimited && (
        <div style={{background:'#f94141',color:'#fff',padding:'12px 0',textAlign:'center',borderRadius:6,marginBottom:24,fontWeight:600}}>
          Too many requests to CoinGecko API. Please wait 30 seconds and try again.
        </div>
      )}
      <h1 style={{color:'#3a80e9',marginBottom:24}}>Compare Top Cryptocurrencies</h1>
      <div style={{maxWidth:600,margin:'0 auto 32px',padding:'0 16px'}}>
        <input
          type="text"
          placeholder="Search coins by name or symbol..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:'100%',padding:'12px 16px',borderRadius:8,border:'1px solid #3a80e9',fontSize:16,marginBottom:24}}
        />
      </div>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',background:'#181818',color:'#fff'}}>
          <thead>
            <tr style={{background:'#222'}}>
              <th style={{padding:'12px 8px'}}>#</th>
              <th style={{padding:'12px 8px'}}>Name</th>
              <th style={{padding:'12px 8px'}}>Symbol</th>
              <th style={{padding:'12px 8px'}}>Price</th>
              <th style={{padding:'12px 8px'}}>Market Cap</th>
              <th style={{padding:'12px 8px'}}>24h Change</th>
              <th style={{padding:'12px 8px'}}>Volume</th>
              <th style={{padding:'12px 8px'}}>Rank</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} style={{textAlign:'center',padding:24}}><Loader /></td></tr>
            ) : filteredCoins.length === 0 ? (
              <tr><td colSpan={8} style={{textAlign:'center',padding:24}}>No coins found.</td></tr>
            ) : (
              filteredCoins.map((coin, i) => (
                <tr key={coin.id} style={{borderBottom:'1px solid #333'}}>
                  <td style={{padding:'8px 8px'}}>{i+1}</td>
                  <td style={{padding:'8px 8px',display:'flex',alignItems:'center',gap:8}}><img src={coin.image} alt={coin.name} style={{width:24,height:24,marginRight:8}} />{coin.name}</td>
                  <td style={{padding:'8px 8px'}}>{coin.symbol.toUpperCase()}</td>
                  <td style={{padding:'8px 8px'}}>${coin.current_price.toLocaleString()}</td>
                  <td style={{padding:'8px 8px'}}>${coin.market_cap.toLocaleString()}</td>
                  <td style={{padding:'8px 8px',color:coin.price_change_percentage_24h>=0?'#61c96f':'#f94141'}}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                  <td style={{padding:'8px 8px'}}>${coin.total_volume.toLocaleString()}</td>
                  <td style={{padding:'8px 8px'}}>{coin.market_cap_rank}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compare; 
   