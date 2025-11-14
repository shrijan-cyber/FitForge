const Card = ({ children, className = '', hover = true, border = false }) => {
  return (
    <div
      className={`card ${border ? 'card-border' : ''} ${
        hover ? 'hover:scale-105' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
