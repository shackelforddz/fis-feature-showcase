"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import type { CategoryId } from "@/lib/types";

const DEFAULT_COLORS = ["#111827", "#4BCD3E", "#37952e", "#4ed699", "#a0d851", "#4BCD3E"];

const COLORS_BY_CATEGORY: Partial<Record<CategoryId, string[]>> = {
  "risk-mitigation": ["#111827", "#EF4444", "#7F1D1D", "#FB7185", "#FB923C", "#EF4444"],
};

const FEATHER = 0.06;

export function MeshGradientBg({
  className,
  categoryId,
}: {
  className?: string;
  categoryId?: CategoryId;
}) {
  const colors =
    (categoryId && COLORS_BY_CATEGORY[categoryId]) ?? DEFAULT_COLORS;
  return (
    <div className={className}>
      <svg
        aria-hidden
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter
            id="mesh-mask-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation={FEATHER} />
          </filter>
          <mask
            id="mesh-mask"
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
            x="-0.2"
            y="-0.2"
            width="1.4"
            height="1.4"
          >
            <g filter="url(#mesh-mask-blur)">
              <ellipse cx="0" cy="0" rx="0.55" ry="0.38" fill="white" />
              <ellipse cx="1" cy="1" rx="0.38" ry="0.18" fill="white" />
            </g>
          </mask>
        </defs>
      </svg>
      <div
        style={{
          width: "100%",
          height: "100%",
          mask: "url(#mesh-mask)",
          WebkitMask: "url(#mesh-mask)",
        }}
      >
        <MeshGradient
          colors={colors}
          distortion={1}
          swirl={2}
          speed={0.45}
          scale={1.4}
          grainMixer={0.00}
          grainOverlay={0.00}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
