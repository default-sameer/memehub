import React from 'react'

const ScrollIndicator = ({ children }) => {
  const [scroll, setScroll] = React.useState('0');

  const onScrollProgress = () => {
    const html = document.documentElement;
    const scrollPx = html.scrollTop;
    const winHeightPx = html.scrollHeight - html.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
    
    setScroll(scrolled);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', onScrollProgress);

    return () => {
      window.removeEventListener('scroll', onScrollProgress);
    };
  }, []);

  const inlineStyle = {
    height: '3px',
    background: '#ffa31a',
    width: scroll,
  };

  return (
    <>
      <div className="top-0 left-0 w-screen h-1.5 fixed z-40 shadow-2x">
        <div style={inlineStyle} />
      </div>
      {children}
    </>
  );

  
}

export default ScrollIndicator