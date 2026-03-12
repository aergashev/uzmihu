"use client";

import { useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Point = {
  lat: number;
  lng: number;
  label?: string;
};

export type WorldMapDot = {
  start: Point;
  end: Point;
};

interface WorldMapProps {
  dots?: WorldMapDot[];
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}

function projectToMap(
  lat: number,
  lng: number,
  width: number,
  height: number,
): { x: number; y: number } {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number },
): string {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}
export function WorldMap({
  dots = [],
  lineColor = "#1e4fa3",
  showLabels = true,
  labelClassName = "text-xs sm:text-sm",
  animationDuration = 1.8,
  loop = true,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const map = useMemo(
    () =>
      new DottedMap({
        height: 100,
        grid: "diagonal",
        projection: { name: "equirectangular" },
      }),
    [],
  );

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: "#00000026",
        shape: "circle",
        backgroundColor: "white",
      }),
    [map],
  );

  const mappedLines = dots.map((dot) => {
    const startPoint = projectToMap(dot.start.lat, dot.start.lng, 800, 400);
    const endPoint = projectToMap(dot.end.lat, dot.end.lng, 800, 400);

    return {
      startPoint,
      endPoint,
      path: createCurvedPath(startPoint, endPoint),
      startLabel: dot.start.label ?? "UZB",
      endLabel: dot.end.label ?? "DST",
    };
  });

  const startPoint = mappedLines[0]?.startPoint;
  const startLabel = mappedLines[0]?.startLabel ?? "UZB";

  const uniqueEndPoints = Array.from(
    new Map(
      mappedLines.map((line) => [
        line.endLabel,
        { label: line.endLabel, point: line.endPoint },
      ]),
    ).values(),
  );

  const staggerDelay = 0.3;
  const totalAnimationTime =
    mappedLines.length * staggerDelay + animationDuration;
  const pauseTime = 2;
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#dbe5f2] bg-white shadow-sm">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none object-cover mask-[linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
        priority
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="pointer-events-auto absolute inset-0 h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="6%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="94%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="map-glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {mappedLines.map((line, index) => {
          const startTime = (index * staggerDelay) / fullCycleDuration;
          const endTime =
            (index * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;

          return (
            <g key={`path-group-${line.startLabel}-${line.endLabel}-${index}`}>
              <motion.path
                d={line.path}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={
                  loop
                    ? {
                        pathLength: [0, 0, 1, 1, 0],
                      }
                    : {
                        pathLength: 1,
                      }
                }
                transition={
                  loop
                    ? {
                        duration: fullCycleDuration,
                        times: [0, startTime, endTime, resetTime, 1],
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 0,
                      }
                    : {
                        duration: animationDuration,
                        delay: index * staggerDelay,
                        ease: "easeInOut",
                      }
                }
              />

              {loop && (
                <motion.circle
                  r="3"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: [null, "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${line.path}')`,
                  }}
                />
              )}
            </g>
          );
        })}

        {startPoint && (
          <g>
            <motion.g
              onHoverStart={() => setHoveredLocation(startLabel)}
              onHoverEnd={() => setHoveredLocation(null)}
              className="cursor-pointer"
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
            >
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="4"
                fill={lineColor}
                filter="url(#map-glow)"
              />
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="4"
                fill={lineColor}
                opacity="0.45"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="14"
                  dur="2.1s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.55"
                  to="0"
                  dur="2.1s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </motion.g>

            {showLabels && (
              <foreignObject
                x={startPoint.x - 58}
                y={startPoint.y - 36}
                width="116"
                height="28"
                className="pointer-events-none block"
              >
                <div className="flex h-full items-center justify-center">
                  <span
                    className={`${labelClassName} rounded-md border border-gray-200 bg-white/95 px-2 py-0.5 font-semibold text-[#163a7d] shadow-sm`}
                  >
                    {startLabel}
                  </span>
                </div>
              </foreignObject>
            )}
          </g>
        )}

        {uniqueEndPoints.map((destination, i) => {
          return (
            <g key={`end-point-${destination.label}-${i}`}>
              <motion.g
                onHoverStart={() => setHoveredLocation(destination.label)}
                onHoverEnd={() => setHoveredLocation(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.15 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.25 + 0.8,
                  duration: 0.45,
                  type: "spring",
                  stiffness: 320,
                  damping: 16,
                }}
              >
                <circle
                  cx={destination.point.x}
                  cy={destination.point.y}
                  r="3"
                  fill={lineColor}
                  filter="url(#map-glow)"
                />
                <circle
                  cx={destination.point.x}
                  cy={destination.point.y}
                  r="3"
                  fill={lineColor}
                  opacity="0.45"
                >
                  <animate
                    attributeName="r"
                    from="3"
                    to="10"
                    dur="2s"
                    begin={`${i * 0.25 + 0.8}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="2s"
                    begin={`${i * 0.25 + 0.8}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </motion.g>

              {showLabels && (
                <motion.foreignObject
                  x={destination.point.x - 56}
                  y={destination.point.y - 30}
                  width="112"
                  height="24"
                  className="pointer-events-none block"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.25 + 0.95, duration: 0.35 }}
                >
                  <div className="flex h-full items-center justify-center">
                    <span
                      className={`${labelClassName} rounded-md border border-gray-200 bg-white/95 px-1.5 py-0.5 font-medium text-[#111827] shadow-sm text-center leading-tight`}
                    >
                      {destination.label}
                    </span>
                  </div>
                </motion.foreignObject>
              )}
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-3 left-3 rounded-lg border border-gray-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-[#111827] shadow sm:hidden"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
