import React from 'react';
import "./styles.css" 
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { useNavigate } from 'react-router-dom';
function List({ coin }) {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/coin/${coin.id}`);
	return (
	  <tr className='list-row' onClick={handleClick} style={{cursor:'pointer'}}>
       <td className='info-flex'>
            <img src={coin.image} className="coin-logo"/>
            </td>
            <td>
            <div className='name-col'>
                <p className='coin-symbol'>{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
            </div>
            
        </td>
        {coin.price_change_percentage_24h>0?(<td className='chip-flex'>
                <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip td-icon'> <TrendingUpRoundedIcon/> </div>
        </td>):(
            <td className='chip-flex'>
                <td className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                <td className='icon-chip chip-red td-icon'> <TrendingDownRoundedIcon/> </td>
                
        </td>)}
        <td >
        <h3 className='coin-price' style={{color:
            coin.price_change_percentage_24h < 0 ? "var(--red)":"var(--green)"}} >
                
                $ {coin.current_price.toLocaleString()}</h3></td>
        <td>
                <p className='total_volume'>Total Volume : 
                    {coin.total_volume.toLocaleString()}
                </p>
                <p className='total_volume'>
                    Market Cap : ${coin.market_cap.toLocaleString()} 
                </p>
        </td>
        
      </tr>
	);
  }
  
  export default List;
  