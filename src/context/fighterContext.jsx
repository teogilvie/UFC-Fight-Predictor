import { createContext, useContext, useEffect, useReducer } from "react";

const FighterContext = createContext();

const BASE_URL = "http://127.0.0.1:3000";
/*
const testFighter1 = {
  age: 21,
  height: 180,
  weight: 75,
  armReach: 195,
  legReach: 195,
  strikingAccuracy: 0.58,
  takedownAccuracy: 0.56,
  takedownDefense: 0.62,
  strikesPerMinute: 4.0,
  takedownsPerMinute: 6.0,
};
const testFighter2 = {
  age: 24,
  height: 190,
  weight: 75,
  armReach: 210,
  legReach: 180,
  strikingAccuracy: 0.42,
  takedownAccuracy: 0.75,
  takedownDefense: 0.9,
  strikesPerMinute: 2.0,
  takedownsPerMinute: 8.0,
};
*/

const initialState = {
  objFighters: {},
  isLoading: false,
  winner: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "getFighters/start":
      return {
        ...state,
        isLoading: true,
      };
    case "getFighters/finish":
      return {
        ...state,
        objFighters: action.payload,
        isLoading: false,
      };
    case "predict/start":
      return {
        ...state,
        isLoading: true,
      };
    case "predict/finish":
      return {
        ...state,
        isLoading: false,
        winner: action.payload,
      };
    case "reset":
      return initialState;
    case "rejected":
      throw new Error(action.payload);
    default:
      throw new Error("Unknown Action");
  }
}

function FighterProvider({ children }) {
  const [{ objFighters, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function getFighterStats() {
      dispatch({ type: "getFighters/start" });

      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const res = await fetch(`${BASE_URL}/app/v1/fighters/`, requestOptions);
        const data = await res.json();

        dispatch({ type: "getFighters/finish", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error calling API...",
        });
      }
    }
    getFighterStats();
  }, []);

  async function getFightPrediction() {
    dispatch({ type: "predict/start" });
    const fighters = objFighters;

    try {
      const res = await fetch(`${BASE_URL}/prediction`, {
        method: "POST",
        body: JSON.stringify(fighters),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      dispatch({ type: "predict/finish", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error calling API...",
      });
    }
  }

  return (
    <FighterContext.Provider
      value={{
        objFighters,
        isLoading,
        getFightPrediction,
      }}
    >
      {children}
    </FighterContext.Provider>
  );
}

function useFighterContext() {
  const context = useContext(FighterContext);
  if (context === undefined)
    throw new Error("FighterContext used outside of FighterProvider");
  return context;
}

export { FighterProvider, useFighterContext };
