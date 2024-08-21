import './styles.css';

export const Button = ({ srcIcon, alt, label, type }) => {
  return (
    <button type={type} className="ownbtn">
      <img className="icBtn" src={srcIcon} alt={alt} />
      {label}
    </button>
  );
};
