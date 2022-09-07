import Event from "../Event/Event"

export default function Calendar({ events }) {
  const eventsASC = events.sort((a, b) => (b.start == a.start ? b.duration > a.duration : b.start < a.start) ? 1 : -1);
  console.log(events);
  const debut = 9;
  const fin = 21;
  const ecart = fin - debut;
  const cellHeight = 1 / ecart * 98;
  let position = 1;
  let tabPosition = [];
  return (
    <div style={{ background: "#dfdfdf", width: "100%", height: "100%", position: "fixed" }}>
      <div style={{ position: "absolute", overflow: "hidden", opacity: "0.5", width: "100%", height: "100%", background: "000", color: "black" }}>
        {(() => {
          let line = []
          for (let index = debut; index <= fin; index++) {
            line.push(<div key={index} style={{ height: cellHeight + "%" }}><div className="separator" >{index}:00</div></div>)
          }
          return line;
        })()}
      </div>
      <div>
        {eventsASC.map((event, index) => {
          console.log('----------------------------' + index + '---------------------------');
          let debutEventLies = 0;
          let finEventLies = 0;
          let eventLies = 0;
          position = 1;

          eventsASC.map((eventOther, index2) => {
            if (index !== index2) {
              const startEvent = (parseInt(eventsASC[index].start.split(":")[0]) + parseInt(eventsASC[index].start.split(":")[1]) / 60);
              const endEvent = (parseInt(eventsASC[index].start.split(":")[0]) + parseInt(eventsASC[index].start.split(":")[1]) / 60) + eventsASC[index].duration / 60;

              const startEvent2 = (parseInt(eventsASC[index2].start.split(":")[0]) + parseInt(eventsASC[index2].start.split(":")[1]) / 60);
              const endEvent2 = (parseInt(eventsASC[index2].start.split(":")[0]) + parseInt(eventsASC[index2].start.split(":")[1]) / 60) + eventsASC[index2].duration / 60;


              //Ceux avant collé = Si startevent2 est avant et endEvent2 est après startevent OU si startevent2 est egale à startEvent et endEvent2 est après endEvent. 
              if ((startEvent2 < startEvent && endEvent2 > startEvent) || (startEvent2 === startEvent && endEvent2 >= endEvent))
                debutEventLies++;

              //Ceux après collé = Si startevent2 est après startevent mais avant endEvent OU si startevent2 est egale a startEvent et endEvent2 est avant endEvent
              if ((startEvent2 > startEvent && startEvent2 < endEvent) || (startEvent2 === startEvent && endEvent2 <= endEvent))
                finEventLies++;
            }


          })
          console.log("avant" + debutEventLies + " apres" + finEventLies)
          eventLies = debutEventLies + finEventLies;
          position += debutEventLies;
          tabPosition[index] = position;
          if (tabPosition[index - 1] === position) {
            for (let i = 0; i < debutEventLies; i++) {
              if (tabPosition[index - i] === position) {
                position = debutEventLies - i;
              }
            }
          }
          console.log("position = " + position)
          return <Event order={index} key={index} position={position} cellHeight={cellHeight} id={event.id} duration={event.duration} start={event.start} largeur={eventLies} />
        }
        )}
      </div>
    </div>)
}