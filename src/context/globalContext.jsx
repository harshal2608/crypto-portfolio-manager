import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext({});

function GlobalProvider({ children }) {
  const [portfolioAssets, setPortfolioAssets] = useState([]);
  const [globalAssets, setGlobalAssets] = useState([]);
  const [total, setTotal] = useState(0);

  const addPortfolioAsset = (asset) => {
    const index = globalAssets.findIndex((e) => e.id === asset.id);
    const newQuantity =
      parseFloat(globalAssets[index].holdings) + parseFloat(asset.holdings);

    let newglobalAssets = [...globalAssets];
    newglobalAssets[index] = {
      ...newglobalAssets[index],
      holdings: newQuantity,
    };
    setGlobalAssets(newglobalAssets);
    localStorage.setItem("globalAssets", JSON.stringify(newglobalAssets));

    if (!portfolioAssets.includes(asset.id)) {
      setPortfolioAssets([...portfolioAssets, asset.id]);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        portfolioAssets,
        globalAssets,
        setGlobalAssets,
        addPortfolioAsset,
        total,
        setTotal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
