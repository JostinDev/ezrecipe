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

const getRandomPosition = () => ({
  top: Math.random() * window.innerHeight,
  left: Math.random() * window.innerWidth,
  rotate: Math.random() * 360,
});

export default function Home() {
  const [positions, setPositions] = useState<
    Array<{ top: number; left: number; rotate: number }>
  >([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    setPositions(foodIcons.map(() => getRandomPosition()));
    setOffsets(foodIcons.map(() => ({ x: 0, y: 0 })));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    setOffsets(
      foodIcons.map(() => ({
        x: getRandomOffset(),
        y: getRandomOffset(),
      }))
    );

    const interval = setInterval(() => {
      setOffsets(
        foodIcons.map(() => ({
          x: getRandomOffset(),
          y: getRandomOffset(),
        }))
      );
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const getPushAnimation = (
    x: number,
    y: number,
    offsetX: number,
    offsetY: number
  ) => {
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
    <div className="container mx-auto px-5">
      <div className="fixed inset-0 pointer-events-none z-50">
        {foodIcons.map((src, index) => (
          <div key={index}>
            <motion.div
              animate={getPushAnimation(
                positions[index].left,
                positions[index].top,
                offsets[index].x,
                offsets[index].y
              )}
              style={{
                top: positions[index].top,
                left: positions[index].left,
                rotate: positions[index].rotate,
                position: "absolute",
              }}
              className="w-12 h-12 absolute pointer-events-auto cursor-pointer"
            >
              <Image src={src} alt={`icon-${index}`} width={48} height={48} />
            </motion.div>
          </div>
        ))}
      </div>

      <div className="flex items-center flex-col justify-center h-screen">
        <h1 className="md:text-7xl sm:text-6xl text-5xl mb-8 text-center font-ptSerif font-bold text-title">
          Welcome to ezrecipe
        </h1>
        <h2 className="md:text-3xl sm:text-2xl text-xl text-center font-inter text-body">
          Your no-bullshit recipes saver
        </h2>
        <button className="bg-pastelYellow text-title rounded-xl mt-10 px-8 py-4 font-inter font-bold border-2 transition border-title hover:drop-shadow-[4px_4px_0px] drop-shadow-shadow">
          Get Started
        </button>
      </div>
    </div>
  );
}
