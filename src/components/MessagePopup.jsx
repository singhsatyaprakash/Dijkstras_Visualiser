import { useEffect, useState } from 'react';

function MessagePopup({ nodeId, message, position, nodeRadius }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log('MessagePopup useEffect:', { nodeId, message, position });
    if (message && position) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, position]);

  // Log props to debug rendering
  console.log('MessagePopup render attempt:', { nodeId, message, position, visible });

  // Temporarily relax validation for debugging
  if (!message) {
    console.warn('MessagePopup not rendering: missing message');
    return null;
  }

  const estimatedCharWidth = 7;
  const padding = 12;
  const textWidth = message.length * estimatedCharWidth;
  const rectWidth = Math.max(textWidth + 2 * padding, 60);
  const rectHeight = 28;
  const offsetY = -(nodeRadius + 200); // Adjusted to be closer to node

  return (
    <g
      className={`message-popup ${visible ? 'visible' : ''}`}
      transform={`translate(${position?.x || 0}, ${position?.y + offsetY || 0})`}
    >
      <rect
        x={-(rectWidth / 2)}
        y={-(rectHeight / 2)}
        width={rectWidth}
        height={rectHeight}
        rx="4"
        className="message-popup-rect"
        fill="rgba(229, 26, 26, 0.9)"
        stroke="#333"
        strokeWidth="1"
      />
      <text
        x="0"
        y="4"
        className="message-popup-text"
        textAnchor="middle"
        fill="#000"
        fontSize="12"
      >
        {message}
      </text>
    </g>
  );
}

export default MessagePopup;