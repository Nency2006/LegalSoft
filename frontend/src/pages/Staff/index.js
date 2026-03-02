import { IoIosHome } from "react-icons/io";

const Staff = () => {
    return(
        <>
        <div className="right-content w-100">
        <div className="col-xl-12">
          <div className="mc-card">
            <div className="mc-breadcrumb">
              <h3 className="mc-breadcrumb-title">Staff mangement</h3>
              <ul className="mc-breadcrumb-list">
                <li className="mc-breadcrumb-item">
                  <a className="mc-breadcrumb-link" href="/"><IoIosHome/>Home</a>
                </li>
                <li className="mc-breadcrumb-item">Staff mangement</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        </>
    
    )
}

export default Staff;