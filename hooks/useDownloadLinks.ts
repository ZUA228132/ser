import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { JSON_BIN_API_URL } from '../config';

interface DownloadLinks {
  androidLegacy: string; // 8-14
  androidModern: string; // 15+
}

interface DownloadLinksContextType {
  links: DownloadLinks;
  setLinks: (links: DownloadLinks) => Promise<void>;
  isLoaded: boolean;
  error: string | null;
}

const DownloadLinksContext = createContext<DownloadLinksContextType | undefined>(undefined);

// Set the initial default links provided by the user
const defaultLinks: DownloadLinks = {
    androidLegacy: 'https://gofile.io/d/HQB1dM',
    androidModern: 'https://gofile.io/d/KOmSAe',
};

export const DownloadLinksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [links, setLinksState] = useState<DownloadLinks>(defaultLinks);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setError(null);
        const response = await fetch(JSON_BIN_API_URL);
        if (!response.ok) {
          throw new Error(`Помилка запиту: ${response.statusText}`);
        }
        const data: DownloadLinks = await response.json();
        
        if (data && typeof data.androidLegacy === 'string' && typeof data.androidModern === 'string') {
          setLinksState(data);
        } else {
            throw new Error('Отримано невірний формат даних.');
        }
      } catch (err) {
        console.error("Failed to fetch download links from cloud", err);
        setError(err instanceof Error ? err.message : 'Сталася невідома помилка.');
      } finally {
        setIsLoaded(true);
      }
    };

    fetchLinks();
  }, []);

  const setLinks = async (newLinks: DownloadLinks) => {
    try {
      const response = await fetch(JSON_BIN_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(newLinks),
      });

      if (!response.ok) {
        throw new Error(`Помилка збереження: ${response.statusText}`);
      }

      const updatedLinks = await response.json();
      setLinksState(updatedLinks);
    } catch (err) {
      console.error("Failed to save download links to cloud", err);
      throw err;
    }
  };

  return React.createElement(
    DownloadLinksContext.Provider,
    { value: { links, setLinks, isLoaded, error } },
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
