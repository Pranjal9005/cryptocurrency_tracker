
import "./styles.css"
import gradient from "../../../assets/gradient.png";
import iPhone from "../../../assets/iPhone.png";
import Button from "../../Common/Button";
import { motion } from "framer-motion" ; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
function MainComponent(){
    const navigate = useNavigate();
    const [showShareModal, setShowShareModal] = useState(false);
    const handleDashboardClick = () => {
        navigate("/dashboard");
    };
    const handleShareClick = () => {
        setShowShareModal(true);
    };
    const handleCloseModal = () => {
        setShowShareModal(false);
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent("Check out this awesome crypto tracker!");
    return(<div className='flex-info'>
        <div className='left-component'>
            <motion.h1 className='track-crypto-heading' 
            initial={{ opacity: 0, y:50}} 
            animate={{ opacity: 1, y:0}}
            transition={{duration: .5}}>
                Track Crypto
            </motion.h1>
            <motion.h1 className='real-time-heading'
            initial={{ opacity: 0, y:50}} 
            animate={{ opacity: 1, y:0}}
            transition={{duration: 1,delay: 0.2}}
            >
            Real Time
            </motion.h1>
            <motion.p className='info-text'
            initial={{ opacity: 0, y:50}} 
            animate={{ opacity: 1, y:0}}
            transition={{duration: 1,delay: 0.4}}>
                Track crypto through a public api in real time. Visit the dashboard to do so!
            </motion.p>
            <motion.div className='btn-flex'
            initial={{ opacity: 0, x:50}} 
            animate={{ opacity: 1, x:0}}
            transition={{duration: 1,delay: 0.6}}>
                <Button text={"Dashboard"} onClick={handleDashboardClick}/>
                <Button text={"Share"} outlined={true} onClick={handleShareClick}/>
            </motion.div>
            {showShareModal && (
                <div 
                  style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}
                  onClick={handleCloseModal}
                >
                  <div 
                    style={{background:'#f7f7f7',padding:24,borderRadius:8,minWidth:320,boxShadow:'0 2px 8px rgba(0,0,0,0.2)',textAlign:'center',position:'relative',border:'1px solid #ddd'}}
                    onClick={e => e.stopPropagation()}
                  >
                    <h3 style={{color:'#222'}}>Share CryptoTracker</h3>
                    <div style={{display:'flex',justifyContent:'space-around',margin:'20px 0'}}>
                      <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" style={{textDecoration:'none'}}>
                        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:'50%',background:'#128C7E',transition:'transform 0.2s'}} onMouseOver={e=>e.currentTarget.style.transform='scale(1.15)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                          <FaWhatsapp size={32} color="#fff" />
                        </span>
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook" style={{textDecoration:'none'}}>
                        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:'50%',background:'#1877F3',transition:'transform 0.2s'}} onMouseOver={e=>e.currentTarget.style.transform='scale(1.15)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                          <FaFacebook size={32} color="#fff" />
                        </span>
                      </a>
                      <a href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Share on Twitter" style={{textDecoration:'none'}}>
                        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:'50%',background:'#1DA1F2',transition:'transform 0.2s'}} onMouseOver={e=>e.currentTarget.style.transform='scale(1.15)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                          <FaTwitter size={32} color="#fff" />
                        </span>
                      </a>
                      <button onClick={handleCopyLink} title="Copy link" style={{background:'none',border:'none',padding:0,cursor:'pointer'}}>
                        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:'50%',background:'#222',transition:'transform 0.2s'}} onMouseOver={e=>e.currentTarget.style.transform='scale(1.15)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                          <FaLink size={32} color="#fff" />
                        </span>
                      </button>
                    </div>
                    <button onClick={handleCloseModal} style={{marginTop:10,padding:'6px 18px',borderRadius:4,border:'none',background:'#222',color:'#fff',cursor:'pointer'}}>Close</button>
                  </div>
                </div>
            )}
        </div>
        <div className='Phone-container'>
        <motion.img src={iPhone} className='iPhone'
        initial={{ y:-10}} 
        animate={{ y:10}}
        transition={{
            type:"smooth",
            repeatType:"mirror",
            duration:2,
            repeat:Infinity       
        }}>

        </motion.img>
        <img src={gradient} className='gradient'></img>
        </div>
    </div>)
}
export default MainComponent