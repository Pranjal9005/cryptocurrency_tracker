import React from 'react'
import "./styles.css"
import gradient from "../../../assets/gradient.png";
import iPhone from "../../../assets/iPhone.png";
import Button from "../../Common/Button";
import { motion } from "framer-motion" ; 
function MainComponent(){
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
                <Button text={"Dashboard"}/>
                <Button text={"Share"} outlined={true}/>

            </motion.div>
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