import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
  const { onLogout, setAuthenticated } = props;

  const [userInfo, setUserInfo] = useState(null);
  const navigate  = useNavigate ();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setAuthenticated(true);
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="header">
      <h1>Oma Service</h1>
      <div className="logout-container">
        <button type='button' className="logout-button" onClick={()=>{
          onLogout();
          navigate('/');
        }}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
