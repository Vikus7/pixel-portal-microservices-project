import React from 'react';
import defaultAvatar from '../assets/default-avatar.png';

const UserAvatar = ({ src, alt, size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
      <img
        src={src || defaultAvatar}
        alt={alt || "User avatar"}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultAvatar;
        }}
      />
    </div>
  );
};

export default UserAvatar;