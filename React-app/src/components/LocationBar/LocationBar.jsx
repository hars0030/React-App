import "./LocationBar.css";

export default function LocationBar({ children }) {
  return (
    <>
      <div className=" text-center flex flex-wrap mx-auto justify-center gap-4 py-12">
        {children}
      </div>
    </>
  );
}
