import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Common/Loader';
import { Line } from 'react-chartjs-2';
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

function Coin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCoin(data[0]);
        } else {
          setError('Coin not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch coin data');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setHistoryLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
      .then(res => res.json())
      .then(data => {
        setHistory(data.prices || []);
        setHistoryLoading(false);
      })
      .catch(() => setHistoryLoading(false));
  }, [id, days]);

  if (loading) return <Loader />;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:40}}>{error}</div>;
  if (!coin) return null;

  // Prepare chart data
  const chartData = {
    labels: history.map(([timestamp]) => {
      const d = new Date(timestamp);
      return `${d.getMonth()+1}/${d.getDate()}`;
    }),
    datasets: [
      {
        label: `${coin.name} Price (USD)` ,
        data: history.map(([, price]) => price),
        fill: false,
        borderColor: '#3a80e9',
        backgroundColor: '#3a80e9',
        tension: 0.2,
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { display: true, title: { display: false } },
      y: { display: true, title: { display: false } }
    }
  };

  return (
    <div style={{margin:'40px 0',padding:32,fontFamily:'Inter, sans-serif'}}>
      <button onClick={() => navigate('/dashboard')} style={{marginBottom:24,padding:'8px 20px',borderRadius:6,border:'none',background:'#3a80e9',color:'#fff',fontWeight:600,cursor:'pointer'}}>← Back to Dashboard</button>
      <div style={{display:'flex',gap:40,alignItems:'center',flexWrap:'wrap'}}>
        <div style={{flex:'0 0 200px',textAlign:'center'}}>
          <img src={coin.image} alt={coin.name} style={{width:100, height:100, marginBottom:16}} />
          <h2 style={{margin:'8px 0 0'}}>{coin.name}</h2>
          <p style={{fontSize:20, color:'#888', margin:'4px 0 0'}}>{coin.symbol.toUpperCase()}</p>
        </div>
        <div style={{flex:1}}>
          <h3 style={{marginBottom:16, color:'#3a80e9'}}>Market Data</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div><strong>Current Price:</strong><br/><span style={{fontSize:22,color:''}}>${coin.current_price.toLocaleString()}</span></div>
            <div><strong>Market Cap:</strong><br/><span style={{fontSize:22,color:''}}>${coin.market_cap.toLocaleString()}</span></div>
            <div><strong>24h High:</strong><br/>${coin.high_24h.toLocaleString()}</div>
            <div><strong>24h Low:</strong><br/>${coin.low_24h.toLocaleString()}</div>
            <div><strong>All Time High:</strong><br/>${coin.ath.toLocaleString()}</div>
            <div><strong>All Time Low:</strong><br/>${coin.atl.toLocaleString()}</div>
            <div><strong>Circulating Supply:</strong><br/>{coin.circulating_supply ? coin.circulating_supply.toLocaleString() : 'N/A'}</div>
            <div><strong>Max Supply:</strong><br/>{coin.max_supply ? coin.max_supply.toLocaleString() : 'N/A'}</div>
            <div><strong>Market Cap Rank:</strong><br/>{coin.market_cap_rank}</div>
            <div><strong>Total Volume:</strong><br/>{coin.total_volume ? coin.total_volume.toLocaleString() : 'N/A'}</div>
            <div><strong>Price Change 24h:</strong><br/>{coin.price_change_24h ? coin.price_change_24h.toLocaleString() : 'N/A'}</div>
            <div><strong>Price Change % 24h:</strong><br/>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) + '%' : 'N/A'}</div>
          </div>
        </div>
      </div>
      <div style={{marginTop:48}}>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
          <h3 style={{color:'#3a80e9',margin:0}}>Price History</h3>
          <select value={days} onChange={e => setDays(e.target.value)} style={{padding:'4px 12px',borderRadius:4,border:'1px solid #3a80e9',fontWeight:600}}>
            <option value={1}>1 Day</option>
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>90 Days</option>
            <option value={180}>180 Days</option>
            <option value={365}>1 Year</option>
            <option value={'max'}>Max</option>
          </select>
        </div>
        {historyLoading ? (
          <div>Loading chart...</div>
        ) : (
          <Line data={chartData} options={chartOptions} height={300} />
        )}
      </div>
    </div>
  );
}

export default Coin; 
   