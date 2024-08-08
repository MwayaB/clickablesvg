import React, { useEffect, useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import head_left from './assets/head_left.svg';
import head_right from './assets/head_right.svg';
import lungs_front from './assets/lungs_front.svg';
import lungs_back from './assets/lungs_back.svg';
import abdomen from './assets/abdomen.svg';
import female_front_for_leg_abnormality from './assets/female_front_for_leg_abnormality.svg';
import lower_limbs_anterior from './assets/lower_limbs_anterior.svg'; 
import lower_limbs_posterior from './assets/lower_limbs_posterior.svg'; // Import the new SVG

const ClickableSvg: React.FC = () => {
  const svgRefs = {
    left: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
    lung: useRef<HTMLDivElement>(null),
    lungBack: useRef<HTMLDivElement>(null),
    abdomen: useRef<HTMLDivElement>(null),
    femaleLegAbnormality: useRef<HTMLDivElement>(null),
    lowerLimbsAnterior: useRef<HTMLDivElement>(null), 
    lowerLimbsPosterior: useRef<HTMLDivElement>(null), // Add reference for the new SVG
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseEnter = (event: MouseEvent) => {
      document.body.style.cursor = 'pointer';
      const target = event.target as SVGElement;
      target.style.fill = `hsl(${Math.random() * 360}, 100%, 37%)`;
      target.style.fillOpacity = '0.5';
      setHoveredId(target.id); // Set the hovered ID
    };

    const handleMouseLeave = (event: MouseEvent) => {
      document.body.style.cursor = 'default';
      const target = event.target as SVGElement;
      target.style.fillOpacity = '0'; // Reset fillOpacity to default
      setHoveredId(null); // Reset the hovered ID
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
        <div ref={svgRefs.left} style={{ border: '1px solid #ccc', width: '25%', height: '65%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={head_left} />
        </div>
        <div ref={svgRefs.right} style={{ border: '1px solid #ccc', width: '25%', height: '65%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={head_right} />
        </div>
        <div ref={svgRefs.lung} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lungs_front} />
        </div>
        <div ref={svgRefs.lungBack} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lungs_back} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', justifyContent: 'left', alignItems: 'left' }}>
        <div ref={svgRefs.abdomen} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={abdomen} />
        </div>
        <div ref={svgRefs.femaleLegAbnormality} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={female_front_for_leg_abnormality} />
        </div>
        <div ref={svgRefs.lowerLimbsAnterior} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lower_limbs_anterior} />
        </div>
        <div ref={svgRefs.lowerLimbsPosterior} style={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'left', alignItems: 'left' }}>
          <ReactSVG src={lower_limbs_posterior} />
        </div>
      </div>
      <div style={{ position: 'fixed', top: '10px', left: '10px', padding: '10px', backgroundColor: 'white', border: '1px solid #ccc' }}>
        {hoveredId ? `Hovered ID: ${hoveredId}` : 'Hover over an element'}
      </div>
    </>
  );
};

export default ClickableSvg;
