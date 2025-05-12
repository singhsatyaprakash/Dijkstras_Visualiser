import PriorityQueue from './priorityQueue.js';

// Dijkstra Algorithm (Generator)
export function* dijkstraStepByStep(graph, startNodeId) {
  const distances = {};
  const path = {};
  const visited = new Set();
  const pq = new PriorityQueue();

  graph.nodes.forEach((node) => {
    distances[node.id] = Infinity;
    path[node.id] = null;
  });
  distances[startNodeId] = 0;
  pq.enqueue(startNodeId, 0);

  yield { phase: 'init', distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: pq.getNodes() };

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current || visited.has(current.nodeId)) continue;
    const currentNodeId = current.nodeId;
    visited.add(currentNodeId);

    yield { phase: 'visiting', currentNode: currentNodeId, distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: pq.getNodes() };

    const neighbors = graph.edges.filter((edge) => edge.from === currentNodeId || edge.to === currentNodeId);

    for (const edge of neighbors) {
      const neighborId = edge.from === currentNodeId ? edge.to : edge.from;
      if (!visited.has(neighborId)) {
        yield { phase: 'updating', currentNode: currentNodeId, distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: pq.getNodes(), exploringEdge: edge };

        const newDist = distances[currentNodeId] + edge.weight;
        if (newDist < distances[neighborId]) {
          distances[neighborId] = newDist;
          path[neighborId] = currentNodeId;
          console.log('Updated path:', { neighborId, predecessor: currentNodeId });
          if (pq.has(neighborId)) pq.decreasePriority(neighborId, newDist);
          else pq.enqueue(neighborId, newDist);

          yield { phase: 'updating', updatedNode: neighborId, currentNode: currentNodeId, distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: pq.getNodes(), exploringEdge: edge };
        }
      }
    }
    yield { phase: 'visiting', currentNode: currentNodeId, distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: pq.getNodes(), exploringEdge: undefined };
  }

  const finalState = { phase: 'done', currentNode: null, distances: { ...distances }, visited: new Set(visited), path: { ...path }, queue: [] };
  console.log('Dijkstra final state:', finalState);
  yield finalState;
  return finalState;
}

// Path Reconstruction
export function reconstructPath(pathData, start, end) {
  const path = [];
  let current = end;
  console.log('Reconstructing path:', { start, end, pathData });

  if (current == null) {
    console.log('Invalid end node');
    return [];
  }

  if (start === end) {
    console.log('Start equals end, returning single node path');
    return [start];
  }

  const visited = new Set();
  while (current != null) {
    if (visited.has(current)) {
      console.log('Cycle detected, aborting path reconstruction');
      return [];
    }
    visited.add(current);
    path.unshift(current);
    if (current === start) break;
    current = pathData[current];
    if (current == null) {
      console.log('No predecessor found for node:', path[0]);
      return [];
    }
  }

  if (path[0] !== start) {
    console.log('Start node not reached, returning empty path');
    return [];
  }

  console.log('Reconstructed path:', path);
  return path;
}