import React, { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import head_front from './assets/head_front.svg';
import head_back from './assets/head_back.svg';
import lung from './assets/lung.svg';
import abdomen from './assets/abdomen.svg';
import legs from './assets/legs.svg';

const ClickableSvg: React.FC = () => {
  const svgWrapperRefFront = useRef<HTMLDivElement>(null);
  const svgWrapperRefBack = useRef<HTMLDivElement>(null);
  const svgWrapperRefLung = useRef<HTMLDivElement>(null);
  const svgWrapperRefAbdomen = useRef<HTMLDivElement>(null);
  const svgWrapperRefLegs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgFront = svgWrapperRefFront.current?.querySelector('svg');
    const svgBack = svgWrapperRefBack.current?.querySelector('svg');
    const svgLung = svgWrapperRefLung.current?.querySelector('svg');
    const svgAbdomen = svgWrapperRefAbdomen.current?.querySelector('svg');
    const svgLegs = svgWrapperRefLegs.current?.querySelector('svg');

    if (!svgFront || !svgBack || !svgLung || !svgAbdomen || !svgLegs) return;

    const handleMouseEnter = (event: MouseEvent) => {
      document.body.style.cursor = 'pointer';
      const target = event.target as SVGElement;
      console.log(target);
      target.style.fill = `hsl(${Math.random() * 360}, 100%, 40%)`;
      target.style.fillOpacity = '0.5';
      console.log(target.id);
    };

    const handleMouseLeave = (event: MouseEvent) => {
      document.body.style.cursor = 'default';
      const target = event.target as SVGElement;
      target.style.fillOpacity = '0'; // Reset fillOpacity to default
    };

    const addListeners = (elements: NodeListOf<SVGElement>) => {
      elements.forEach((element) => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const removeListeners = (elements: NodeListOf<SVGElement>) => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    const pathsFront = svgFront.querySelectorAll('path');
    const rectsFront = svgFront.querySelectorAll('rect');
    const pathsBack = svgBack.querySelectorAll('path');
    const rectsBack = svgBack.querySelectorAll('rect');
    const pathsLung = svgLung.querySelectorAll('path');
    const pathsLegs = svgLegs.querySelectorAll('path');
    const rectsAbdomen = svgAbdomen.querySelectorAll('rect');

    addListeners(pathsFront);
    addListeners(rectsFront);
    addListeners(pathsBack);
    addListeners(rectsBack);
    addListeners(pathsLung);
    addListeners(pathsLegs);
    addListeners(rectsAbdomen);

    // Cleanup
    return () => {
      removeListeners(pathsFront);
      removeListeners(rectsFront);
      removeListeners(pathsBack);
      removeListeners(rectsBack);
      removeListeners(pathsLung);
      removeListeners(pathsLegs);
      removeListeners(rectsAbdomen);
    };
  }, [svgWrapperRefFront, svgWrapperRefBack, svgWrapperRefAbdomen,svgWrapperRefLung, svgWrapperRefLegs]);

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'left', alignItems: 'left' }}>
      <div ref={svgWrapperRefFront} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
        <ReactSVG src={head_front} />
      </div>
      <div ref={svgWrapperRefBack} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
        <ReactSVG src={head_back} />
      </div>
      <div ref={svgWrapperRefLung} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
        <ReactSVG src={lung} />
      </div>      
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'left', alignItems: 'left' }}>
      <div ref={svgWrapperRefAbdomen} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left'}}>
        <ReactSVG src={abdomen} />
      </div>
      <div ref={svgWrapperRefLegs} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left'}}>
        <ReactSVG src={legs} />
      </div>
    </div>
     
  
    
  </>
  );
};

export default ClickableSvg;
