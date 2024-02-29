import './styles.css';

export const Button = ({ srcIcon, alt, label }) => {
  return (
    <button className="ownbtn">
      <img className="icBtn" src={srcIcon} alt={alt} />
      {label}
    </button>
  );
};
