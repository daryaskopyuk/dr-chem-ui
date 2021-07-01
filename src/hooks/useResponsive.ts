import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile = useMediaQuery({
    maxWidth: 767,
  });

  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1023,
  });
  const isTabletOrMobile = useMediaQuery({
    maxWidth: 1023,
  });
  return {
    isMobile,
    isTablet,
    isTabletOrMobile,
  };
};

export default useResponsive;
