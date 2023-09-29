export default function Input(props) {
  const { className = "w-80 m-2 rounded mb-5", LabelClass = "m-2", label, id, chidlren } = props;

  return (
    <div className="input-container">
      {label ? (
        <label className={`${LabelClass}`} htmlFor={id}>
          {props.label} <br />
        </label>
      ) : null}
      {chidlren || null}

      <input {...props} id={id} className={`${className} input p-2`} />
    </div>
  );
}
