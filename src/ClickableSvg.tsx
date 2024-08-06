import React, { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import head_left from './assets/head_left.svg';
import lungs_front from './assets/lungs_front.svg';
import lungs_back from './assets/lungs_back.svg';
import abdomen from './assets/abdomen.svg';
import female_front_for_leg_abnormality from './assets/female_front_for_leg_abnormality.svg';

const ClickableSvg: React.FC = () => {
  const svgRefs = {
    left: useRef<HTMLDivElement>(null),
    lung: useRef<HTMLDivElement>(null),
    lungBack: useRef<HTMLDivElement>(null),
    abdomen: useRef<HTMLDivElement>(null),
    femaleLegAbnormality: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      document.body.style.cursor = 'pointer';
      const target = event.target as SVGElement;
      console.log(target);
      target.style.fill = `hsl(${Math.random() * 360}, 100%, 37%)`;
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

    const setOpacity = (elements: NodeListOf<SVGElement>, opacity: string) => {
      elements.forEach((element) => {
        element.style.fillOpacity = opacity;
      });
    };

    Object.values(svgRefs).forEach(ref => {
      const svg = ref.current?.querySelector('svg');
      if (svg) {
        const paths = svg.querySelectorAll('path');
        const rects = svg.querySelectorAll('rect');
        const desiredOpacity = '0.01';

        setOpacity(paths, desiredOpacity);
        setOpacity(rects, desiredOpacity);

        addListeners(paths);
        addListeners(rects);
      }
    });

    return () => {
      Object.values(svgRefs).forEach(ref => {
        const svg = ref.current?.querySelector('svg');
        if (svg) {
          const paths = svg.querySelectorAll('path');
          const rects = svg.querySelectorAll('rect');

          removeListeners(paths);
          removeListeners(rects);
        }
      });
    };
  }, [svgRefs]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'left', alignItems: 'left' }}>
        <div ref={svgRefs.left} style={{ border: '1px solid #ccc', width: '50%', height: '65%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={head_left} />
        </div>
        <div ref={svgRefs.lung} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lungs_front} />
        </div>
        <div ref={svgRefs.lungBack} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lungs_back} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'left', alignItems: 'left' }}>
        <div ref={svgRefs.abdomen} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={abdomen} />
        </div>
        <div ref={svgRefs.femaleLegAbnormality} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={female_front_for_leg_abnormality} />
        </div>
      </div>
    </>
  );
};

export default ClickableSvg;
