"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import avocado from "./foodIcons/avocado.png";
import bellPepper from "./foodIcons/bell-pepper.png";
import can from "./foodIcons/canned-food.png";
import carrot from "./foodIcons/carrot.png";
import hamburger from "./foodIcons/hamburger.png";
import kiwi from "./foodIcons/kiwi-fruit.png";
import pan from "./foodIcons/pan.png";
import potato from "./foodIcons/potato.png";
import squid from "./foodIcons/squid.png";
import ramen from "./foodIcons/steaming-bowl.png";
import takeout from "./foodIcons/takeout-box.png";
import tomato from "./foodIcons/tomato.png";

const foodIcons = [
  avocado,
  bellPepper,
  can,
  carrot,
  hamburger,
  kiwi,
  pan,
  potato,
  squid,
  ramen,
  takeout,
  tomato,
];

const getRandomOffset = () => Math.random() * 10 - 5;

const getRandomPositionInCircle = () => {
  let radius;

  if (window.innerWidth < 767) {
    radius = window.innerWidth * 0.6;
  } else {
    radius = 600;
  }

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const r = Math.sqrt(Math.random()) * radius;
  const angle = Math.random() * 2 * Math.PI; // random angle in radians

  let y;
  const x = centerX + r * Math.cos(angle);

  if (window.innerWidth < 767) {
    y = centerY + r * Math.sin(angle) * 2.5;
  } else {
    y = centerY + r * Math.sin(angle);
  }

  return {
    top: y,
    left: x,
    rotate: Math.random() * 360,
  };
};

export default function FloatingFood() {
  const [positions, setPositions] = useState<Array<{ top: number; left: number; rotate: number }>>(
    [],
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    setPositions(foodIcons.map(() => getRandomPositionInCircle()));
    setOffsets(foodIcons.map(() => ({ x: 0, y: 0 })));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    setOffsets(
      foodIcons.map(() => ({
        x: getRandomOffset(),
        y: getRandomOffset(),
      })),
    );

    const interval = setInterval(() => {
      setOffsets(
        foodIcons.map(() => ({
          x: getRandomOffset(),
          y: getRandomOffset(),
        })),
      );
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const getPushAnimation = (x: number, y: number, offsetX: number, offsetY: number) => {
    const dx = x - mousePos.x;
    const dy = y - mousePos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      return {
        x: dx * 0.4,
        y: dy * 0.4,
        transition: {
          type: "spring" as const,
          stiffness: 300,
          damping: 100,
        },
      };
    }

    return {
      x: offsetX,
      y: offsetY,

      transition: {
        duration: 2,
        ease: "easeInOut" as const,
      },
    };
  };
  // Avoid rendering until positions are ready
  if (positions.length === 0 || offsets.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-50">
      {foodIcons.map((src, index) => (
        <div key={index}>
          <motion.div
            animate={getPushAnimation(
              positions[index].left,
              positions[index].top,
              offsets[index].x,
              offsets[index].y,
            )}
            style={{
              top: positions[index].top,
              left: positions[index].left,
              rotate: positions[index].rotate,
              position: "absolute",
            }}
            className="pointer-events-auto absolute h-12 w-12 cursor-pointer"
          >
            <Image src={src} alt={`icon-${index}`} width={48} height={48} />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
