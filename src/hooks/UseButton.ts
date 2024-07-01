import { useState, useCallback, useEffect, MutableRefObject } from 'react';

const useButton = ({
  buttonRef,
  disabledRipple,
}: {
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  disabledRipple: boolean;
}) => {
  let timer = 0;
  const [handleValue, setHandleValue] = useState({
    showRipple: false,
    posX: 0,
    posY: 0,
    width: 0,
    height: 0,
  });

  const handleRipple = useCallback(
    (event:any) => {
      if (!disabledRipple) {
        const rect = buttonRef?.current?.getBoundingClientRect();
        const rectLeft = rect?.left || 0;
        const rectTop = rect?.top || 0;
        const diameter = Math.max(
          buttonRef?.current?.clientWidth || 0,
          buttonRef?.current?.clientHeight || 0,
        );
        const radius = diameter / 2;
        const posX = Math.round(event.clientX - rectLeft) - radius;
        const posY = Math.round(event.clientY - rectTop) - radius;
        setHandleValue((state) => ({
          ...state,
          showRipple: true,
          posX,
          posY,
          width: diameter,
          height: diameter,
        }));
        timer = window.setTimeout(() => {
          setHandleValue((state) => ({
            ...state,
            showRipple: false,
          }));
        }, 500);
      }
    },
    [buttonRef],
  );

  const handleMouseDown = useCallback(
    (event:any) => {
      if (!disabledRipple) {
        handleRipple(event);
      }
    },
    [disabledRipple, handleRipple],
  );

  // clear timeout
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return {
    handleValue,
    handleMouseDown,
  };
};

export default useButton;
