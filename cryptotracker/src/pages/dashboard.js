import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs'
import axios from "axios";
import Loader from '../components/Common/Loader';
  
function Dashboard ()  {
  const [coins,setCoins] = useState([])
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      setLoading(true);
      axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((response)=>{
              setCoins(response.data)
              setLoading(false);
      }).catch((error)=>{
          setLoading(false);
          console.log("ERROR>>>",error);
      })
  },[])

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header/>
      <div style={{maxWidth:600,margin:'32px auto 0',padding:'0 16px'}}>
        <input
          type="text"
          placeholder="Search coins by name or symbol..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{width:'100%',padding:'12px 16px',borderRadius:8,border:'1px solid #3a80e9',fontSize:16,marginBottom:24}}
        />
      </div>
      {loading ? <Loader /> : <TabsComponent coins={filteredCoins}/>} 
    </div>
  );
}
  
export default Dashboard;