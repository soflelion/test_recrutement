export default function Event({ id = 5, order = 0, start = "17:00", duration = 60, top = 10, cellHeight = 10, position = 1, largeur = 1 }) {
  const durationVH = ((duration / 60)) * cellHeight * 0.65;
  const leftVH = (100 / (largeur + 1)) * (position - 1) + "%";
  const topVH = ((parseInt(start.split(":")[0]) + parseInt(start.split(":")[1]) / 60) - 9) * cellHeight + 0.5;
  return (
    <div style={{ fontSize: "14px", background: "dodgerblue", color: "white", padding: "20px", margin: "2px 10px", border: "2px solid #ccc", height: durationVH + "%", position: "absolute", left: leftVH, width: 90 / (largeur + 1) + '%', top: topVH + "%" }}>
      {order} - {id} - {start} - {duration} - {largeur} - {position}
    </div>
  )
}
