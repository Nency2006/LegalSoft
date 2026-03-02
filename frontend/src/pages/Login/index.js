import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/image/logo.png';
import LogoName from '../../assets/image/logoName.png'
import pattern from '../../assets/image/OIP.jpg'
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '@mui/material/Button';


const Login = () =>{

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
        <img src={pattern} className='loginPattern'/>
        <section className="loginSection">
            <div className="loginBox">
                <div className='logo text-center'>
                    <img src={Logo} width="90px"/>
                    <h5 className='font-weight-bold'>Log in to <img src={LogoName} width="120px"/> </h5>
                </div>

                <div className='wrapper mt-3 card border'>
                    <form>
                        <div className={`form-group mb-3 position-relative ${inputIndex === 0 && 'focus'}`} autoFocus>
                            <span className='icon'><MdEmail/></span>
                            <input type='text' className='form-control' placeholder='Enter Your Email' onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} autoFocus/>
                        </div>

                        <div className={`form-group mb-3 position-relative ${inputIndex === 1 && 'focus'}`}>
                            <span className='icon'><RiLockPasswordFill/></span>
                            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Enter Your Password' onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)}/>
                            {/* <span className='toggleShowPassword' onClick={()=>{setIsShowPassword(!isShowPassword)}} >
                                {
                                    isShowPassword === true ? <IoEyeOff/> : <IoEye/>
                                }
                                
                            </span> */}
                        </div>

                        <div className='form-group text-end pb-3'>
                            <Link to={'/forgot-passwrod'} className="link">FOGROT PASSWORD</Link>
                        </div>


                        <div className='form-group mb-0'>
                            <Button className="btn-blue btn-big w-100">  <Link to="/" onClick={()=>{context.setIsHideSidebarAndHeader(false)}} className='link forword ml-2'>Sign In</Link></Button>
                        </div>
                    </form>
                </div>

                 <div className='wrapper mt-2 card border footer p-3'>
                   <span className='text-center'>Don't have an account? 
                    <Link to={'/register'} className='link color ml-2'> Register</Link></span>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login;