import { createContext, useContext } from 'react';

// interface BreadCrumbValue {
//   sidebarNav?: string;
//   updateSidebarNAV?: (value: string) => void;
// }

const BreadCrumbContext = createContext({});

export const BreadCrumbContextProvider = BreadCrumbContext.Provider;
export const useBreadCrumbContext = () => useContext(BreadCrumbContext);
