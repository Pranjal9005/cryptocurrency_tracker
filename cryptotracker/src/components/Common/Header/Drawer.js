import {useState} from"react";

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      
          <Button onClick={()=>setOpen(true)}><DragHandleRoundedIcon className="link"/></Button>
          <Drawer
            anchor={"right"}
            open={open}
            onClose={()=>setOpen(false)}
          >
             <div className='drawer-div'>
            
            <a href='\'>
            <p className='link'>Home</p>
            </a>
            <a href='\'>
            <p className='link'>Compare</p>
            </a>
            <a href='\'>
            <p className='link'>Watchlist</p>
            </a>
            <a href='\'>
            <p className='link'>Dashboard</p>
            </a>
        </div>
          </Drawer>
        
      
    </div>
  );
}