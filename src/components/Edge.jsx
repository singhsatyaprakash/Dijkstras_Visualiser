function Edge({ edge, nodePositions, dijkstraState, finalPath }) {
  const pos1 = nodePositions[edge.from];
  const pos2 = nodePositions[edge.to];
  if (!pos1 || !pos2) return null;

  const isExploring = dijkstraState?.phase === 'updating' &&
    dijkstraState.exploringEdge &&
    ((dijkstraState.exploringEdge.from === edge.from && dijkstraState.exploringEdge.to === edge.to) ||
      (dijkstraState.exploringEdge.from === edge.to && dijkstraState.exploringEdge.to === edge.from));

  const isPathEdge = finalPath.length > 1 && finalPath.slice(0, -1).some((nodeId, i) =>
    (nodeId === edge.from && finalPath[i + 1] === edge.to) ||
    (nodeId === edge.to && finalPath[i + 1] === edge.from)
  );

  const lineClass = `edge-line ${isPathEdge ? 'path' : ''} ${isExploring ? 'exploring' : ''}`;
  const weightClass = `edge-weight ${isPathEdge ? 'path' : ''} ${isExploring ? 'exploring' : ''}`;

  const midX = (pos1.x + pos2.x) / 2;
  const midY = (pos1.y + pos2.y) / 2;
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const offsetDist = 12;
  const offsetX = length === 0 ? 0 : (-dy / length) * offsetDist;
  const offsetY = length === 0 ? 0 : (dx / length) * offsetDist;

  return (
    <g className="edge-group" data-from={edge.from} data-to={edge.to}>
      <line
        x1={pos1.x}
        y1={pos1.y}
        x2={pos2.x}
        y2={pos2.y}
        className={lineClass}
      />
      <text
        x={midX + offsetX}
        y={midY + offsetY}
        className={weightClass}
      >
        {edge.weight}
      </text>
    </g>
  );
}

export default Edge;