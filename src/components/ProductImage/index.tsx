import React, { useState, useRef } from "react";

interface ICircle {
    x: number;
    y: number;
}

const ProductImage = () => {
  const [circle, setCircle] = useState<ICircle>({
    x: 150,
    y: 100
  });
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const zoomLevel = 2; // 2x zoom
  const circleSize = 120;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragging(true);
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    if (!containerRef.current) return;
    
    const imageRect = containerRef.current.getBoundingClientRect();
    
    let newX = e.clientX - imageRect.left - circleSize / 2;
    let newY = e.clientY - imageRect.top - circleSize / 2;
    
    newX = Math.max(0, Math.min(newX, imageRect.width - circleSize));
    newY = Math.max(0, Math.min(newY, imageRect.height - circleSize));

    setCircle({
      x: newX,
      y: newY
    });
  };

  return (
    <div
      ref={containerRef}
      className="col-span-7 relative w-[600px] h-[400px] cursor-move"
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <img 
        src="/img.jpg" 
        alt="product" 
        className="object-cover w-full h-full"
      />
      <div
        className="border-2 border-black rounded-full absolute cursor-move shadow-lg"
        style={{
          backgroundImage: 'url(/img.jpg)',
          backgroundRepeat: 'no-repeat',
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${circle.x}px`,
          top: `${circle.y}px`,
          backgroundSize: `${600 * zoomLevel}px ${400 * zoomLevel}px`,
          backgroundPosition: `-${circle.x * zoomLevel}px -${circle.y * zoomLevel}px`,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ProductImage;