import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import logo from '../../assets/image/logo.png';
import logoName from '../../assets/image/logoName.png';
import Button from '@mui/material/Button';
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import SearchBox from '../SearchBox';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { MyContext } from '../../App';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const context = useContext(MyContext)

    return (
        <>
            <header className='d-flex align-items-center'>
                <div className="container-fluid">
                    <div className="row d-flex align-items-center w-100">
                        <div className="col-sm-2 part1">
                            <Link to="/">
                                <img className='logo' src={logo} alt='logo' />
                                <img className='logo-name' src={logoName} alt='logo-name' />
                            </Link>
                        </div>

                        <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                            <Button className='rounded-circle ml-3' onClick={() => context.setisToggleSidebar(!context.isToggleSidebar)}>
                                {
                                    context.isToggleSidebar === false ? <MdOutlineMenuOpen /> : <IoMenu />
                                }</Button>
                            <SearchBox />
                        </div>

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3 pl-4">

                            {
                                context.isLogin !== true ? 
                                
                                <Link to="/login"><Button className='btn-blue btn-lg btn-round'>Sign In</Button></Link>

                                    :

                                    <div className="myAccWrapper">
                                        <Button className='myAcc d-flex align-items-center' onClick={handleClick}>

                                            <div className='userImg'>
                                                <span className='rounded-circle'>
                                                    <img src="https://tse1.explicit.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"></img>
                                                </span>
                                            </div>

                                            <div className='userInfo'>
                                                <h4>John Doe</h4>
                                                <p className='mb-0'>@johndoe</p>
                                            </div>
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&::before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Avatar /> Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <Avatar /> My account
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <PersonAdd fontSize="small" />
                                                </ListItemIcon>
                                                Add another account
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Settings fontSize="small" />
                                                </ListItemIcon>
                                                Settings
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;