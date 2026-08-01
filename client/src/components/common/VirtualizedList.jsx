import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

/**
 * Phase 4.5: High-Performance Virtualized List Component
 * Supports 10,000+ items (Chat messages, Notifications, Club Member rosters, Audit logs)
 * with 60 FPS smooth scrolling and minimal DOM nodes.
 */
function VirtualizedList({
  items = [],
  itemHeight = 64,
  containerHeight = 400,
  renderItem,
  className = "",
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;

  // Calculate visible window slice with buffer
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - 4),
    [scrollTop, itemHeight]
  );

  const endIndex = useMemo(
    () =>
      Math.min(
        items.length - 1,
        Math.floor((scrollTop + containerHeight) / itemHeight) + 4
      ),
    [scrollTop, containerHeight, itemHeight, items.length]
  );

  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex + 1),
    [items, startIndex, endIndex]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`overflow-y-auto relative custom-scrollbar ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: "relative", width: "100%" }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          const topOffset = actualIndex * itemHeight;
          return (
            <div
              key={item.id || actualIndex}
              style={{
                position: "absolute",
                top: topOffset,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(VirtualizedList);
