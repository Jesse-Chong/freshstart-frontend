const extractInstructions = (route) => {
    let instructions = [];
  
    route.sections.forEach((section) => {
      if (section.type === 'transit') {
        const transport = section.transport || {};
        instructions.push(
          `Take ${transport.mode || 'public transport'} ${transport.name || ''} from ${section.departure.place.name} to ${section.arrival.place.name}`
        );
      } else if (section.actions) {
        instructions = instructions.concat(
          section.actions
            .filter((action) => action.instruction)
            .map((action) => action.instruction)
        );
      }
    });
  
    return instructions.length > 0
      ? instructions
      : ['No specific instructions available for this route.'];
  };
  
  const calculateRouteSummary = (route) => {
    let totalDuration = 0;
    let totalLength = 0;
  
    route.sections.forEach((section) => {
      if (section.arrival && section.departure) {
        const arrivalTime = new Date(section.arrival.time);
        const departureTime = new Date(section.departure.time);
        totalDuration += (arrivalTime - departureTime) / 1000;
      }
  
      if (section.actions) {
        section.actions.forEach((action) => {
          if (action.duration) totalDuration += action.duration;
          if (action.length) totalLength += action.length;
        });
      }
    });
  
    return {
      duration: Math.round(totalDuration / 60),
      length: (totalLength / 1000).toFixed(2),
    };
  };
  
  export const handleGetRoute = async (
    selectedLocation,
    startLocation,
    transportMode,
    setInstructions,
    setRouteSummary
  ) => {
    if (!selectedLocation) return;
  
    try {
      const response = await fetch(
        `http://localhost:3001/route?origin=${startLocation}&destination=${selectedLocation}&transportMode=${transportMode}`
      );
      const data = await response.json();
      console.log(data);
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const instructions = extractInstructions(route);
        const summary = calculateRouteSummary(route);
        setInstructions(instructions);
        setRouteSummary(summary);
      } else {
        setInstructions(["No route available"]);
        setRouteSummary(null);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setInstructions(["Error fetching route"]);
      setRouteSummary(null);
    }
  };  