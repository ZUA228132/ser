import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface DownloadLinks {
  androidLegacy: string; // 8-14
  androidModern: string; // 15+
}

interface DownloadLinksContextType {
  links: DownloadLinks;
  setLinks: (links: DownloadLinks) => void;
  isLoaded: boolean;
}

const DownloadLinksContext = createContext<DownloadLinksContextType | undefined>(undefined);

const defaultLinks: DownloadLinks = {
    androidLegacy: '#',
    androidModern: '#',
};

export const DownloadLinksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [links, setLinksState] = useState<DownloadLinks>(defaultLinks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedLinks = localStorage.getItem('downloadLinks');
      if (storedLinks) {
        setLinksState(JSON.parse(storedLinks));
      }
    } catch (error) {
      console.error("Failed to parse download links from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const setLinks = (newLinks: DownloadLinks) => {
    try {
      localStorage.setItem('downloadLinks', JSON.stringify(newLinks));
      setLinksState(newLinks);
    } catch (error) {
      console.error("Failed to save download links to localStorage", error);
    }
  };

  // Using React.createElement to avoid JSX syntax in a .ts file
  return React.createElement(
    DownloadLinksContext.Provider,
    { value: { links, setLinks, isLoaded } },
    children
  );
};

export const useDownloadLinks = (): DownloadLinksContextType => {
  const context = useContext(DownloadLinksContext);
  if (context === undefined) {
    throw new Error('useDownloadLinks must be used within a DownloadLinksProvider');
  }
  return context;
};