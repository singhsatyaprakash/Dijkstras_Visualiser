import React, { useEffect } from 'react';

const PathFinder = () => {
  useEffect(() => {
    // Load external socket.io script if needed
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.7.5/socket.io.min.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <header style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <h1>PathFinder: Dijkstra & Messaging Visualizer</h1>
        <p>Visualize Dijkstra's algorithm and send simulated messages between nodes.</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '20px' }}>
        {/* Control Panel */}
        <div style={{ flex: '0 0 300px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h2>Controls</h2>

          {/* Start Node Select */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="start-node-select">Start Node (Sender):</label>
            <select id="start-node-select" style={{ width: '100%', padding: '8px' }}>
              <option value="" disabled selected>Select Start Node</option>
            </select>
            <small>Click node or use dropdown. Dijkstra starts here.</small>
          </div>

          {/* Target Node Select */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="target-node-select">Target Node (Receiver):</label>
            <select id="target-node-select" style={{ width: '100%', padding: '8px' }}>
              <option value="" disabled selected>Select Target Node</option>
            </select>
            <small>Highlights shortest path & destination for messages.</small>
          </div>

          {/* Control Buttons */}
          <div style={{ marginBottom: '15px' }}>
            <button id="start-button" title="Run Dijkstra">Start Dijkstra</button>
            <button id="play-pause-button" title="Play/Pause Animation" disabled>Play</button>
            <button id="step-button" title="Step Forward" disabled>Step</button>
            <button id="reset-button" title="Reset All">Reset</button>
          </div>

          {/* Speed Slider */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="speed-slider">Animation Speed:</label>
            <input type="range" id="speed-slider" min="100" max="1000" defaultValue="500" />
            <span id="speed-value">500ms</span>
          </div>

          {/* Algorithm Status */}
          <div style={{ marginBottom: '15px' }}>
            <h3>Algorithm Status</h3>
            <p id="status-message">Select a starting node.</p>
          </div>

          {/* Result */}
          <div style={{ marginBottom: '15px' }}>
            <h3>Result</h3>
            <p>
              Shortest Distance (<span id="result-start-node">Start</span> to <span id="result-target-node">Target</span>):
              <strong id="result-distance"> - </strong>
            </p>
            <small>Final path highlighted in green.</small>
          </div>

          {/* Messaging Section */}
          <div style={{ marginBottom: '15px' }}>
            <h3>Send Message</h3>
            <label htmlFor="message-input">Message:</label>
            <input type="text" id="message-input" placeholder="Enter message..." disabled style={{ width: '100%', padding: '8px' }} />
            <small>Enter message to send after path is found.</small>
            <button id="send-message-button" disabled>Send Message</button>
            <div>
              <p>Status: <span id="message-status">Idle</span></p>
            </div>
          </div>

          <div>
            Socket Status: <span id="socket-status">Offline</span>
          </div>
        </div>

        {/* Graph Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          <svg id="graph-svg" width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
            <g id="edges-group"></g>
            <g id="nodes-group"></g>
            <g id="messages-group"></g>
          </svg>
          <div id="overlay-message" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '1rem', background: 'rgba(255,255,255,0.9)' }}>
            <div>
              <h3>Welcome to PathFinder!</h3>
              <p>Select a <strong>starting node</strong> on the graph or using the dropdown to begin visualizing Dijkstra's algorithm.</p>
              <small>Optionally, select a target node too.</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PathFinder;
