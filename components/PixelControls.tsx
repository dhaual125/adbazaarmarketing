"use client";

import React from "react";

interface PixelControlsProps {
  cellSize: number;
  brushSize: number;
  onCellSizeChange: (size: number) => void;
  onBrushSizeChange: (size: number) => void;
  hidden?: boolean;
}

export const PixelControls: React.FC<PixelControlsProps> = ({
  cellSize,
  brushSize,
  onCellSizeChange,
  onBrushSizeChange,
  hidden = false,
}) => {
  if (hidden) return null;

  return (
    <div className={`pxctl transition-opacity duration-300 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <span className="lbl">Cell</span>
      <button
        type="button"
        onClick={() => onCellSizeChange(22)}
        className={cellSize === 22 ? "on" : ""}
      >
        L
      </button>
      <button
        type="button"
        onClick={() => onCellSizeChange(14)}
        className={cellSize === 14 ? "on" : ""}
      >
        M
      </button>
      <button
        type="button"
        onClick={() => onCellSizeChange(9)}
        className={cellSize === 9 ? "on" : ""}
      >
        S
      </button>

      <span className="lbl">Brush</span>
      <button
        type="button"
        onClick={() => onBrushSizeChange(16)}
        className={brushSize === 16 ? "on" : ""}
      >
        L
      </button>
      <button
        type="button"
        onClick={() => onBrushSizeChange(10)}
        className={brushSize === 10 ? "on" : ""}
      >
        M
      </button>
      <button
        type="button"
        onClick={() => onBrushSizeChange(7)}
        className={brushSize === 7 ? "on" : ""}
      >
        S
      </button>
    </div>
  );
};
