export const Logo = ({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' }) => {
  const dimensions = {
    small: { width: 120, height: 30, fontSize: 14 },
    normal: { width: 180, height: 45, fontSize: 20 },
    large: { width: 240, height: 60, fontSize: 26 }
  };

  const { width, height, fontSize } = dimensions[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Mountain/Law Icon */}
      <svg width={height} height={height} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" fill="#516b78" />
        <path d="M30 15 L20 35 L40 35 Z" fill="#2c3e50" />
        <path d="M30 20 L22 35 L38 35 Z" fill="#34495e" />
        <circle cx="30" cy="28" r="4" fill="#3498db" />
      </svg>
      
      {/* Text */}
      <span style={{
        fontSize: `${fontSize}px`,
        fontWeight: '600',
        color: '#2c3e50',
        letterSpacing: '-0.5px'
      }}>
        AvukatAjanda
      </span>
    </div>
  );
};
