import './styles.css';

export const TextArea = ({
  label,
  name,
  id,
  placeholder,
  handleOnChange,
  required,
}) => {
  return (
    <div className="textarea-field">
      <label htmlFor="">{label}</label>
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleOnChange}
        required={required}
      ></textarea>
    </div>
  );
};
