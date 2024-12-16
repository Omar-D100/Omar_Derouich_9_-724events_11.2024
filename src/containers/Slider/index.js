import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
     // Correction pour afficher du plus ancien au plus récent
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );
  
  // Correction pour que le slider affiche la première image une fois arrivé à la dernière sans afficher de page blanche entre les 2
  const dataLength = data?.focus.length
  const nextCard = () => {
    setTimeout(
      // Ajout de -1 après "length"
      () => setIndex(index < dataLength - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((event, radioIdx) => (
              // {byDateDesc.map((_, radioIdx)
            <input
              key={event.title}
              // key={`${event.id}`} correction event n'a pas d'id
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // checked={idx === radioIdx} correction idx => index 
              readOnly
              // Erreur de console : Avertissement : vous avez fourni un accessoire « checked » à un champ de formulaire sans gestionnaire « onChange ».
              // Cela rendra un champ en lecture seule. Si le champ doit être mutable, utilisez « defaultChecked ». Sinon, définissez « onChange » ou « readOnly »
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
