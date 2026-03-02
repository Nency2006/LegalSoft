import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const DashboardAdds = ({ icon, title, to, onClick }) => {
  return (
    <Button className="dashboardAdds" component={Link} to={to} onClick={(e) => {
        if (onClick) {
          e.preventDefault(); // prevent navigation if onClick exists
          onClick();
        }
      }} >
      <div className="iconboxAdds">{icon}</div>
      <h6>{title}</h6>
    </Button>
  );
};

export default DashboardAdds;

