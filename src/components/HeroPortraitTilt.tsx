"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

/** Horizontal only: 70° total swing (cursor fully left → −35°, fully right → +35°). */
const MAX_TILT_DEG = 35;

/** Cubic curve: gentle near center, still reaches ±1 at edges. */
function softTiltNorm(n: number) {
  const x = Math.max(-1, Math.min(1, n));
  return x * x * x;
}

/** Interpolation per frame — lower = smoother, slower catch-up. */
const LERP = 0.12;

type Props = {
  className?: string;
};

export function HeroPortraitTilt({ className }: Props) {
  const reduceMotionRef = useRef(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const tiltLayerRef = useRef<HTMLDivElement>(null);
  const targetDegRef = useRef(0);
  const currentDegRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tickRef = useRef<() => void>(() => undefined);

  const applyTransform = useCallback((deg: number) => {
    const node = tiltLayerRef.current;
    if (node) node.style.transform = `rotateY(${deg}deg)`;
  }, []);

  const tick = useCallback(() => {
    const reduce = reduceMotionRef.current;
    const tgt = targetDegRef.current;
    let cur = currentDegRef.current;

    if (reduce) {
      cur = tgt;
    } else {
      cur += (tgt - cur) * LERP;
      if (Math.abs(tgt - cur) < 0.06) cur = tgt;
    }
    currentDegRef.current = cur;
    applyTransform(cur);

    const moving = Math.abs(tgt - cur) > 0.04;
    if (moving) {
      rafRef.current = requestAnimationFrame(tickRef.current);
    } else {
      rafRef.current = null;
    }
  }, [applyTransform]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const scheduleTick = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const onMq = () => {
      reduceMotionRef.current = mq.matches;
      targetDegRef.current = 0;
      currentDegRef.current = 0;
      applyTransform(0);
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, [applyTransform]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const onPhotoPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = photoRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const w = r.width || 1;
      const nx = ((e.clientX - r.left) / w) * 2 - 1;
      const clamped = Math.max(-1, Math.min(1, nx));
      const next = softTiltNorm(clamped) * MAX_TILT_DEG;

      if (reduceMotionRef.current) {
        targetDegRef.current = next;
        currentDegRef.current = next;
        applyTransform(next);
        return;
      }

      targetDegRef.current = next;
      scheduleTick();
    },
    [applyTransform, scheduleTick],
  );

  const onPhotoPointerLeave = useCallback(() => {
    targetDegRef.current = 0;
    if (reduceMotionRef.current) {
      currentDegRef.current = 0;
      applyTransform(0);
      return;
    }
    scheduleTick();
  }, [applyTransform, scheduleTick]);

  return (
    <div
      className={[
        "[perspective:min(2000px,185vw)]",
        className ?? "",
      ].join(" ")}
    >
      <div
        ref={tiltLayerRef}
        className="origin-center will-change-transform [transform-style:preserve-3d] motion-reduce:transform-none"
        style={{ transform: "rotateY(0deg)" }}
      >
        <div
          ref={photoRef}
          className="relative aspect-[768/1024] w-full cursor-default touch-manipulation overflow-hidden rounded-[2rem] shadow-[0_28px_70px_-14px_rgba(248,200,220,0.55)] ring-2 ring-white/70 [mask-image:radial-gradient(ellipse_108%_102%_at_50%_35%,#000_22%,#000_32%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.28)_64%,rgba(0,0,0,0.1)_78%,rgba(0,0,0,0.03)_90%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_108%_102%_at_50%_35%,#000_22%,#000_32%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.28)_64%,rgba(0,0,0,0.1)_78%,rgba(0,0,0,0.03)_90%,transparent_100%)] sm:rounded-[2.25rem] lg:rounded-[2.5rem]"
          aria-hidden
          onPointerMove={onPhotoPointerMove}
          onPointerLeave={onPhotoPointerLeave}
          onPointerCancel={onPhotoPointerLeave}
        >
          <Image
            src="/hero-me.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 500px"
            className="object-cover object-[50%_14%] saturate-[1.04]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-[#fff8fc]/38 via-[#fff8fc]/14 via-40% to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[54%] bg-gradient-to-t from-[#fff8fc]/55 via-[#fff8fc]/22 via-38% to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[34%] bg-gradient-to-r from-[#fff8fc]/58 via-[#fff8fc]/22 via-42% to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[34%] bg-gradient-to-l from-[#fff8fc]/58 via-[#fff8fc]/22 via-42% to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_100px_75px_rgba(255,248,252,0.55),inset_0_0_160px_110px_rgba(255,248,252,0.28)] sm:rounded-[2.25rem] lg:rounded-[2.5rem]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
