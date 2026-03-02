import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/image/logo.png';
import pattern from '../../assets/image/OIP.jpg'
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '@mui/material/Button';
import { IoPersonCircle } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import GppGoodIcon from '@mui/icons-material/GppGood';

const Register = () =>{

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword ] = useState(false);
    const context = useContext(MyContext);
    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true);
    },[]);

    const focusInput = (index) =>{
     setInputIndex(index)   ;
    }
    return(
        <>
        <img src={pattern} className='signUpPattern'/>
        <section className="signupSection">
            <div className="signupBox">
                <div className='logo text-center'>
                    <img src={Logo} width="80px"/>
                    <h5 className='font-weight-bold'>Register a new account</h5>
                </div>

                <div className='wrapper mt-3 card border'>
                    <form>
                        <div className={`form-group mb-3 position-relative ${inputIndex === 0 && 'focus'}`} autoFocus>
                            <span className='icon'><IoPersonCircle/></span>
                            <input type='text' className='form-control' placeholder='Enter Your Name' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} autoFocus/>
                        </div>

                        <div className={`form-group mb-3 position-relative ${inputIndex === 1 && 'focus'}`}>
                            <span className='icon'><MdEmail/></span>
                            <input type='email' className='form-control' placeholder='Enter Your Email' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)}/>
                        </div>

                        <div className={`form-group mb-3 position-relative ${inputIndex === 2 && 'focus'}`}>
                            <span className='icon'><FaPhoneAlt/></span>
                            <input type='text' className='form-control' placeholder='Enter Your Mobile Number' onFocus={()=>focusInput(2)} onBlur={()=>setInputIndex(null)}/>
                        </div>

                        <div className={`form-group mb-3 position-relative ${inputIndex === 3 && 'focus'}`}>
                            <span className='icon'><RiLockPasswordFill/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Enter Your Password' onFocus={()=>focusInput(3)} onBlur={()=>setInputIndex(null)}/>
                        </div>

                        <div className={`form-group mb-3 position-relative ${inputIndex === 4 && 'focus'}`}>
                            <span className='icon'><GppGoodIcon/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Enter Confirm Password' onFocus={()=>focusInput(4)} onBlur={()=>setInputIndex(null)}/>
                        </div>

                        <div className='form-group text-start pb-3'>
                            <input type='checkbox' className='check' required/> 
                            <span className='check'> I agree to the all terms and conditions</span>
                        </div>

                        <div className='form-group mb-0'>
                            <Button className="btn-blue btn-big w-100"> <Link to="/login" className='link forword ml-2'>Sign up </Link></Button>
                        </div>
                    </form>
                </div>

                 <div className='wrapper mt-2 card border footer p-3'>
                   <span className='text-center'>Already have an account? 
                    <Link to={'/login'} className='link color ml-2'> Log in</Link></span>
                </div>
            </div>
        </section>
        </>
    )
}

export default Register;