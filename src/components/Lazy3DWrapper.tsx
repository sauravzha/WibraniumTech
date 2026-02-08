import { useRef } from "react";
import { useInView } from "framer-motion";

interface Lazy3DWrapperProps {
  children: React.ReactNode;
  threshold?: number | "some" | "all";
  rootMargin?: string;
  className?: string;
}

/**
 * A wrapper component that uses Intersection Observer (via framer-motion's useInView)
 * to only render its children when they are near the viewport.
 * This helps in reducing CPU/GPU usage by not rendering heavy 3D components off-screen.
 */
export const Lazy3DWrapper = ({
  children,
  threshold = 0.1,
  rootMargin = "200px 0px",
  className = "",
}: Lazy3DWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Using margin to start loading before it actually enters the viewport
  const isInView = useInView(ref, {
    once: false,
    amount: threshold,
    margin: rootMargin,
  });

  return (
    <div ref={ref} className={className}>
      {isInView ? children : <div className="min-h-[100px]" />}
    </div>
  );
};
