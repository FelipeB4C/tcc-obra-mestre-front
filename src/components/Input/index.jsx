import './styles.css';

export const Input = ({
  label,
  type,
  name,
  value,
  id,
  placeholder,
  handleOnChange,
  required,
  disabled,
}) => {
  return (
    <div className="input-field">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
