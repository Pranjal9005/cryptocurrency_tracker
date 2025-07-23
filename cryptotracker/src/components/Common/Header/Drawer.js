import {useState} from"react";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import { Link } from "react-router-dom";

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
            
            <Link to="/">
            <p className='link'>Home</p>
            </Link>
            <Link to="/compare">
            <p className='link'>Compare</p>
            </Link>
            <Link to="/dashboard">
            <p className='link'>Dashboard</p>
            </Link>
        </div>
          </Drawer>
        
      
    </div>
  );
}
