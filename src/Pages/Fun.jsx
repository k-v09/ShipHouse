import WavePropagation from '../Components/WaveProp.jsx';
import BoidSimulation from '../Components/BoidSim.jsx';
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import React, { useState, useCallback } from 'react';

const ComponentSelector = () => {
  const [activeComponent, setActiveComponent] = useState("waves");
  const components = {
    none: {
      label: "Select a component",
      component: null
    },
    boids: {
      label: "Boid Simulation",
      component: <BoidSimulation key="boids" />  // key to force remount
    },
    waves: {
      label: "Wave Propagation",
      component: <WavePropagation />
    },
  };
    /*const components = {
        none: { label: "Select a component", component: null },
        boids: { label: "Boid Simulation", component: <div>Boid Simulation Placeholder</div> },
        waves: { label: "Wave Propagation", component: <div>Wave Propagation Placeholder</div> },
    };*/


  const handleSelectionChange = useCallback((event) => {
    setActiveComponent("none");
    setTimeout(() => {
      setActiveComponent(event.target.value);
    }, 0);
  }, []);

  return (
    <div class="bg-gradient-to-r from-purple-900 via-purple-800 to-emerald-900 w-screen h-screen"><div className="w-full max-w-4xl pt-20 mx-auto space-y-4">
      <Select 
        label="Select Component" 
        value={activeComponent}
        onChange={handleSelectionChange}
        className="max-w-xs"
      >
        {Object.entries(components)
          .filter(([key]) => key !== 'none')
          .map(([key, { label }]) => (
            <SelectItem 
              key={key} 
              value={key} 
            >
              {label}
            </SelectItem>
          ))
        }
      </Select>
      <div className="mt-4">
        {activeComponent !== "none" && components[activeComponent]?.component}
      </div>
    </div></div>
  );
};

export default ComponentSelector;
