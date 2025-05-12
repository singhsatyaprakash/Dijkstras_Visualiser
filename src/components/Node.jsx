function Node({ node, position, nodeRadius, startNode, targetNode, dijkstraState, finalPath, handleNodeClick, isFinished }) {
  // Validate props
  if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
    console.error('Invalid position for Node:', { nodeId: node.id, position });
    return null;
  }
  if (!node || typeof node.id !== 'number') {
    console.error('Invalid node for Node:', { node });
    return null;
  }
  if (typeof nodeRadius !== 'number' || nodeRadius <= 0) {
    console.error('Invalid nodeRadius for Node:', { nodeId: node.id, nodeRadius });
    return null;
  }

  const isSender = node.id === startNode;
  const isReceiver = node.id === targetNode;
  const isVisited = dijkstraState?.visited?.has(node.id) || false;
  const isCurrent = dijkstraState?.currentNode === node.id;
  const isUpdating = dijkstraState?.phase === 'updating' && dijkstraState?.updatedNode === node.id;
  const isPathNode = Array.isArray(finalPath) && finalPath.includes(node.id);

  let className = 'node-circle';
  if (isSender || isReceiver) className += ' selected';
  if (isPathNode && !isSender && !isReceiver) className += ' path';
  if (isCurrent) className += ' current';
  else if (isVisited && !isPathNode && !isSender && !isReceiver) className += ' visited';
  if (isUpdating) className += ' updating';
  if (isSender && isFinished) className += ' messaging-sender';
  if (isReceiver && isFinished) className += ' messaging-receiver';

  let dist = dijkstraState?.distances?.[node.id];
  if (node.id === startNode && (dist === undefined || dist === Infinity)) dist = 0;
  const distanceText = dist === Infinity ? '∞' : dist !== undefined ? dist : '';

  return (
    <g
      className="node-group"
      transform={`translate(${position.x}, ${position.y})`}
      tabIndex="0"
      role="button"
      aria-label={`Node N${node.id}, Distance: ${distanceText || 'N/A'}${isSender ? ', Sender' : isReceiver ? ', Receiver' : ''}`}
      onClick={() => handleNodeClick(node.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent scrolling on Space
          handleNodeClick(node.id);
        }
      }}
    >
      <circle
        cx="0"
        cy="0"
        r={nodeRadius + 4}
        className="node-selection-ring"
        style={{ display: isSender || isReceiver ? 'block' : 'none' }}
      />
      <circle cx="0" cy="0" r={nodeRadius} className={className} />
      <text x="0" y={-nodeRadius - 10} className="node-label" textAnchor="middle">{`N${node.id}`}</text>
      <text x="0" y="0" className="node-distance" textAnchor="middle" dominantBaseline="middle">{distanceText}</text>
    </g>
  );
}

export default Node;