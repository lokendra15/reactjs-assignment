import './index.scss';
const Button = ({ type = '', text = '', onClick = () => {}, className = '' }) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
