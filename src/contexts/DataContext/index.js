import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);

  // Récupère la liste des événements depuis l'objet "data".
  const events = data?.events;

  // Trie les événements par dates décroissantes (plus récent en premier).
  const sortedEvents = events?.sort((evtA, evtB) => new Date(evtA.date) > new Date(evtB.date) ? -1 : 1);

  // Récupère le premier élément du tableau trié, à savoir l'événement le plus récent.
  const last = sortedEvents?.[0];


  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // ajout de la valeur last pour afficher le dernier projet 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
