const RouteInstructions = ({ instructions }) => {
    if (instructions.length === 0) return null;
  
    return (
      <div className="route-instructions" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "15px", borderRadius: "5px", border: "2px solid #ddd", marginBottom: "20px" }}>
        <h3>Main Route Instructions:</h3>
        <ul>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default RouteInstructions;
  