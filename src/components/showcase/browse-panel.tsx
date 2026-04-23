"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FeatureScreen } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScribbleHeading } from "./scribble-heading";
import { MeshGradientBg } from "./mesh-gradient-bg";

type Props = {
  screens: FeatureScreen[];
};

const SWIPE_DISTANCE = 160;
const SWIPE_VELOCITY = 500;
const CARD_RATIO_W = 1440;
const CARD_RATIO_H = 1024;

type ExitSide = "left" | "right";
type TransitionMode = "swipe" | "fade";
type CardCustom = { side: ExitSide; mode: TransitionMode };

export function BrowsePanel({ screens }: Props) {
  const [index, setIndex] = useState(0);
  const [exitSide, setExitSide] = useState<ExitSide>("left");
  const [mode, setMode] = useState<TransitionMode>("swipe");
  const [isDragging, setIsDragging] = useState(false);

  // Detect category change synchronously so the exit animation picks up the
  // new mode, rather than reading a stale value from a useEffect that runs
  // after render.
  const [prevScreens, setPrevScreens] = useState(screens);
  if (prevScreens !== screens) {
    setPrevScreens(screens);
    setMode("fade");
    setIndex(0);
    setExitSide("left");
  }

  const total = screens.length;
  const topScreen = screens[index];
  const backScreen = total > 1 ? screens[(index + 1) % total] : null;

  const advance = (dir: 1 | -1) => {
    // dir=+1 (next) → outgoing card exits left; dir=-1 (prev) → exits right.
    setMode("swipe");
    setExitSide(dir === 1 ? "left" : "right");
    setIndex((i) => (i + dir + total) % total);
  };

  const custom: CardCustom = { side: exitSide, mode };

  return (
    <section className="relative flex-[3] min-w-0 h-full rounded-4xl bg-panel backdrop-blur-xl overflow-hidden p-6">
      <MeshGradientBg className="absolute inset-0 z-0" />
      <div className="absolute left-[35px] top-6 z-30">
        <ScribbleHeading rotate={-3.13}>2. Browse the features</ScribbleHeading>
      </div>

      <div
        className="relative h-full w-full flex items-center justify-center"
        style={{ containerType: "size" }}
      >
        <div
          className="relative"
          style={{
            aspectRatio: `${CARD_RATIO_W} / ${CARD_RATIO_H}`,
            width: "65cqw",
          }}
        >
          {backScreen && <BackCard key={backScreen.id} screen={backScreen} />}

          <AnimatePresence initial={false} custom={custom}>
            <TopCard
              key={`${topScreen.id}-${index}`}
              screen={topScreen}
              custom={custom}
              onSwipe={advance}
              setIsDragging={setIsDragging}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {topScreen && (
              <motion.div
                key={topScreen.id}
                initial={{
                  opacity: 0,
                  x: topScreen.annotation.side === "left" ? -16 : 16,
                  scale: 0.98,
                }}
                animate={{
                  opacity: isDragging ? 0 : 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: topScreen.annotation.side === "left" ? -8 : 8,
                  scale: 0.98,
                  transition: { duration: 0.35, ease: "easeOut" },
                }}
                transition={{
                  default: {
                    duration: 0.28,
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: 0.5,
                  },
                  opacity: { duration: 0.35, ease: "easeOut" },
                }}
                className="pointer-events-none absolute z-[25] w-[29%] max-w-[459px]"
                style={{
                  top: `${topScreen.annotation.y ?? 50}%`,
                  ...(topScreen.annotation.side === "left"
                    ? { left: "-25%" }
                    : { right: "-25%" }),
                  transform: "translateY(-50%)",
                }}
              >
                <div className="pointer-events-auto rounded-[22.5px] bg-popover text-popover-foreground p-[22.5px] shadow-2xl flex flex-col gap-[4.5px]">
                  <p className="text-[0.82vw] leading-[1.17vw] font-medium">
                    {topScreen.annotation.title}
                  </p>
                  <p className="text-[0.82vw] leading-[1.17vw] text-muted-foreground">
                    {topScreen.annotation.body}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <StackButton onClick={() => advance(-1)} aria-label="Previous feature">
          <ChevronLeft className="size-10" />
        </StackButton>
        <div className="flex items-center gap-3 px-2">
          {screens.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-3 rounded-full transition-all duration-300",
                i === index ? "w-12 bg-white" : "w-3 bg-white/40"
              )}
            />
          ))}
        </div>
        <StackButton onClick={() => advance(1)} aria-label="Next feature">
          <ChevronRight className="size-10" />
        </StackButton>
      </div>
    </section>
  );
}

function StackButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="size-20 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition-colors"
    >
      {children}
    </button>
  );
}

function ScreenMedia({ src }: { src: string }) {
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
      />
    );
  }
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(min-width: 1024px) 60vw, 100vw"
      className="object-cover pointer-events-none select-none"
      priority
      draggable={false}
    />
  );
}

function BackCard({ screen }: { screen: FeatureScreen }) {
  return (
    <motion.div
      initial={false}
      animate={{ y: "8%", scale: 0.9, opacity: 0.5 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 }}
      style={{ zIndex: 10, transformOrigin: "center center" }}
      className="absolute inset-0 rounded-[14px] overflow-hidden bg-black/40 shadow-2xl pointer-events-none"
    >
      <ScreenMedia src={screen.image} />
    </motion.div>
  );
}

const EXIT_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const topCardVariants: import("motion/react").Variants = {
  initial: (c: CardCustom) =>
    c.mode === "fade"
      ? { opacity: 0 }
      : { opacity: 0, y: 28, scale: 0.94 },
  animate: (c: CardCustom) => ({
    opacity: 1,
    y: 0,
    transition:
      c.mode === "fade"
        ? { duration: 0.3, ease: "easeOut" }
        : { type: "spring", stiffness: 260, damping: 26, delay: 0.04 },
  }),
  exit: (c: CardCustom) =>
    c.mode === "fade"
      ? {
          opacity: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        }
      : {
          x: c.side === "left" ? -960 : 960,
          rotate: c.side === "left" ? -22 : 22,
          opacity: 0,
          transition: { duration: 0.45, ease: EXIT_EASE },
        },
};

function TopCard({
  screen,
  custom,
  onSwipe,
  setIsDragging,
}: {
  screen: FeatureScreen;
  custom: CardCustom;
  onSwipe: (dir: 1 | -1) => void;
  setIsDragging: (b: boolean) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 0, 320], [-16, 0, 16]);
  const pressScale = useTransform(x, [-320, 0, 320], [0.97, 1, 0.97]);
  const shadowOpacity = useTransform(x, [-240, 0, 240], [0.25, 0.65, 0.25]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const dist = info.offset.x;
    const vel = info.velocity.x;

    let side: -1 | 0 | 1 = 0;
    if (Math.abs(dist) > SWIPE_DISTANCE) {
      side = dist < 0 ? -1 : 1;
    } else if (Math.abs(vel) > SWIPE_VELOCITY) {
      side = vel < 0 ? -1 : 1;
    }
    if (side === 0) return;

    onSwipe(side === -1 ? 1 : -1);
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-[14px] overflow-hidden bg-black/40 cursor-grab active:cursor-grabbing"
      style={{ x, rotate, scale: pressScale, zIndex: 20 }}
      variants={topCardVariants}
      custom={custom}
      initial="initial"
      animate="animate"
      exit="exit"
      drag="x"
      dragElastic={0.7}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 40px 80px -10px rgba(0,0,0,0.75)",
          opacity: shadowOpacity,
        }}
      />
      <ScreenMedia src={screen.image} />
    </motion.div>
  );
}
