import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();
function useLoading() {
  return useContext(LoadingContext);
}

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider, useLoading };
