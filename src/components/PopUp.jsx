export default function PopUp(props) {
  const { children } = props;

  return (
    <>
      <div
        className={`fixed w-full min-h-full overflow-hidden bg-gray-300/40 flex justify-center items-center top-0 left-0 z-10`}
      >
        {children}
      </div>
    </>
  );
}
