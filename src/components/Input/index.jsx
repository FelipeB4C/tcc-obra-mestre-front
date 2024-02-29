import './styles.css';

export const Input = ({
  label,
  type,
  name,
  id,
  placeholder,
  handleOnChange,
  required,
}) => {
  return (
    <div className="input-field">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleOnChange}
        required={required}
      />
    </div>
  );
};
