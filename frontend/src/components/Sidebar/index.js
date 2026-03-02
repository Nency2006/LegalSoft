import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { IoIosHome } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaFolderClosed } from "react-icons/fa6";
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App';

const Sidebar = () => {
    const [activetab, setActiveTab] = useState(0);
    const context =  useContext(MyContext);
    return (
        <>
            <div className="sidebar">
                 
                <ul>
                    <h5 className="menu-title">Home</h5>
                    <li>
                        <Link to="/dashboard">
                        <Button className={`w-100 ${activetab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
                            <span className='icon'><IoIosHome/></span>
                            Dashboard
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/staff">
                        <Button className={`w-100 ${activetab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                            <span className='icon'><IoPeopleSharp/></span>
                            Staff mangement
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>

                    <Divider/>
                    <h5 className="menu-title">Business Management</h5>
                    <li>
                        <Link to="/client">
                        <Button className={`w-100 ${activetab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>
                            <span className='icon'><IoPerson/></span>
                            Client
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/advocate">
                        <Button className={`w-100 ${activetab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)}>
                            <span className='icon'><FaUserTie/></span>
                            Advocate
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/case">
                        <Button className={`w-100 ${activetab === 4 ? 'active' : ''}`} onClick={() => setActiveTab(4)}>
                            <span className='icon'><FaFileAlt/></span>
                            Case
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/hearing">
                        <Button className={`w-100 ${activetab === 5 ? 'active' : ''}`} onClick={() => setActiveTab(5)}>
                            <span className='icon'><AiOutlineFileSearch/></span>
                            Hearing
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/document">
                        <Button className={`w-100 ${activetab === 6 ? 'active' : ''}`} onClick={() => setActiveTab(6)}>
                            <span className='icon'><FaFolderClosed/></span>
                            Document
                            <span className='arrow'><IoIosArrowForward/></span>
                        </Button>
                        </Link>
                    </li>

                    
                </ul>
            </div>
        </>
    );
}

export default Sidebar;