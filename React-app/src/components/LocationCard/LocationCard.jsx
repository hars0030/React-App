import "./LocationCard.css";
export default function LocationCard({ data, deleteBtn, detailsUpdate }) {
  const handleCard = (ev, m) => {
    if (ev.target.matches("button")) {
      deleteBtn(m);
      return;
    } else {
      detailsUpdate(m);
    }
  };

  return (
    <>
      <div
        style={{ border: "2px solid white", cursor: "pointer" }}
        className="card p-8 flex flex-col gap-4"
        onClick={(ev) => handleCard(ev, data.id)}
        data-id={data.id}
      >
        <h2>{data.name}</h2>
        <p>{data.country}</p>
        {/*onClick={(ev) => handleDelete(data.id)}*/}
        <button data-id={data.id}>Remove</button>
      </div>
    </>
  );
}
