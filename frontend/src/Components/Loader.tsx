import React from 'react';

interface LoaderProps {
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  color = '#3498db',
  className = '',
}) => {
  // Define size values for large loader
  const borderWidth = '4px';
  const size = '36px';

  // Define keyframes for the animation
  const spinKeyframes = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{spinKeyframes}</style>
      <div className={`inline-block ${className}`}>
        <div
          className="spinner"
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            border: `${borderWidth} solid rgba(0, 0, 0, 0.1)`,
            borderLeftColor: color,
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    </>
  );
};

export default Loader;