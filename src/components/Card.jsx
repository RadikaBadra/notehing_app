export default function Card(props) {
  const { className = "bg-slate-100 rounded", children } = props;
  return (
    <div className={`${className} max-w-sm`}>
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

function title({ children }) {
  return (
    <div className="p-4 text-xl font-semibold">
      <h1>{children}</h1>
      <hr />
    </div>
  );
}

function body({ children }) {
  return <div className="p-4">{children}</div>;
}

function footer({ children }) {
  return (
    <div className="p-4 bg-slate-200 flex items-center gap-x-3 justify-end">
      {children}
    </div>
  );
}

Card.title = title;
Card.body = body;
Card.footer = footer;
