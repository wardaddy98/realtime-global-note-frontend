import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryResult = window.matchMedia(query);

    //For when the hook is first called i.e initial render
    setMatches(mediaQueryResult.matches);

    //For when the screen width changes
    mediaQueryResult.addEventListener('change', event => {
      setMatches(event.matches);
    });
  }, [query]);

  return {
    matches,
  };
};
