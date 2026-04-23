"use client";

import { MeshGradient } from "@paper-design/shaders-react";

const COLORS = ["#111827", "#4BCD3E", "#37952e", "#4ed699", "#a0d851", "#4BCD3E"];

const CORNER_MASK =
  "radial-gradient(ellipse 75% 50% at 0% 0%, black 0%, transparent 100%), radial-gradient(ellipse 50% 25% at 100% 100%, black 0%, transparent 100%)";

export function MeshGradientBg({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        maskImage: CORNER_MASK,
        WebkitMaskImage: CORNER_MASK,
        maskComposite: "add",
        WebkitMaskComposite: "source-over",
      }}
    >
      <MeshGradient
        colors={COLORS}
        distortion={1}
        swirl={2}
        speed={0.45}
        scale={1.4}
        grainMixer={0.00}
        grainOverlay={0.00}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
