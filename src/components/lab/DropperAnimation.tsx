import React from 'react';

interface DropperAnimationProps {
  color: string;
  isDropping: boolean;
}

export const DropperAnimation: React.FC<DropperAnimationProps> = ({ color, isDropping }) => {
  if (!isDropping) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-2 z-30">
      {/* Pipette Dropper Graphic */}
      <div className="w-4 h-16 bg-slate-300/80 border border-slate-400 rounded-b-md relative flex flex-col items-center animate-bounce">
        <div className="w-6 h-6 rounded-full bg-rose-600 border border-rose-700 -top-4 absolute" />
        <div
          className="w-2.5 h-10 mt-2 rounded-b-full shadow-inner"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Falling Liquid Drop */}
      <div
        className="w-3 h-3 rounded-full animate-ping mt-1 shadow-lg"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
