import React,{ useState, useRef  } from 'react';
import '../css/ImageCircle.css'; // Import CSS file for styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


function ImageCircle({ imageUrl, setPhotoUrl }) {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Implement logic to trigger image update action
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPhotoUrl(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-circle"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleButtonClick}
      >
      <img src={imageUrl} alt="Profile" />
      <div className={`update-icon ${hovered ? 'visible' : ''}`}>
        <FontAwesomeIcon icon={faCamera}  />
      </div>
      <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
    </div>
  );
}

export default ImageCircle;
