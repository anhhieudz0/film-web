import useButton from '@/hooks/UseButton';
import React, { FC, ReactNode, useRef, CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';


const defaultStyle = {
  background: 'none' as const,
};

const StyledButtonRoot = styled.button<{
  disabled: boolean;
}>`
  border: 10px;
  box-sizing: border-box;
  display: inline-block;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  outline: none;
  position: relative;
  transform: translateZ(0);
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
`;

const StyledButtonBody = styled.div`
  display: block;
`;

const keyframeRipple = () => keyframes`
  to {
    opacity: 0;
    transform: scale(4);
  }
`;

const StyledRipple = styled.span<{ buttonClickColor: string }>`
  position: absolute;
  background-color: ${({ buttonClickColor }) => buttonClickColor};
  top: 0px;
  left: 0px;
  overflow: hidden;
  z-index: 1;
  transform: scale(0);
  border-radius: 50%;
  animation: ${keyframeRipple} 0.6s linear;
`;

interface Props {
  disabled?: boolean;
  disabledRipple?: boolean;
  buttonClickColor?: string
  style?: CSSProperties;
  styleBody?: CSSProperties;
  onClick?: () => void;
  onFocus?: () => void;
  children?: ReactNode;
}

const EnhancedButton: FC<Props> = ({
  disabled = false,
  disabledRipple = false,
  buttonClickColor = "rgba(153, 153, 153, .2)",
  children = null,
  onClick,
  onFocus,
  style = {},
  styleBody = {},
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { handleValue, handleMouseDown } = useButton({
    buttonRef,
    disabledRipple,
  });

  const rippleElement = () => (
    <StyledRipple
      style={{
        top: `${handleValue.posY}px`,
        left: `${handleValue.posX}px`,
        width: `${handleValue.width}px`,
        height: `${handleValue.height}px`,
      }}
      buttonClickColor={buttonClickColor}
    />
  );
  return (
    <StyledButtonRoot
      style={{ ...defaultStyle, ...style }}
      onClick={onClick}
      onFocus={onFocus}
      disabled={disabled}
      onMouseDown={(event) => handleMouseDown(event)}
      ref={buttonRef}
    >
      <StyledButtonBody style={styleBody}>
        {/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) && handleValue.showRipple && rippleElement()}
        {children}
      </StyledButtonBody>
    </StyledButtonRoot>
  );
};

export default EnhancedButton;
