import { createContext, useContext, useReducer } from "react";

const FighterContext = createContext();

const BASE_URL = "localhost:8000";

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

const initialState = {
  figher1: testFighter1,
  figher2: testFighter2,
  isLoading: false,
  winner: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "getFighters/start":
      return {
        ...state,
        fighter1: action.payload.fighter1,
        fighter2: action.payload.fighter2,
        isLoading: true,
      };
    case "getFighters/finish":
      return {
        ...state,
        winner: action.payload,
        isLoading: true,
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
  const [{ fighter1, fighter2, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getFighterStats() {
    dispatch({ type: "getFighters/start" });

    try {
      const res = await fetch(`${BASE_URL}/fighters`, {
        method: "GET",
      });
      const data = await res.json();

      dispatch({ type: "getFighters/finish", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error calling API...",
      });
    }
  }

  async function getFightPrediction() {
    dispatch({ type: "predict/start" });
    const fighters = { fighter1, fighter2 };

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
        fighter1,
        fighter2,
        isLoading,
        getFightPrediction,
        getFighterStats,
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
