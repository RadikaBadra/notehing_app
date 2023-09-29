export default function Button(props) {
  const {
    className = "bg-blue-800 text-white px-4 py-2 rounded",
    text,
    children,
  } = props;

  return (
    <button {...props} className={`${className}  flex items-center gap-x-3`}>
      {text || children}
    </button>
  );
}
