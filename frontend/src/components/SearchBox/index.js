import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="searchbox position-relative d-flex align-items-center">
        <FaSearch className="mr-2"/> 
        <input type="text" placeholder='Quick Search'/>
    </div>
  );
}

export default SearchBox;