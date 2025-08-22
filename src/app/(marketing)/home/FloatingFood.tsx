"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import avocado from "./foodIcons/avocado.png";
import bacon from "./foodIcons/bacon.png";
import banana from "./foodIcons/banana.png";
import bellPepper from "./foodIcons/bell-pepper.png";
import bentoBox from "./foodIcons/bento-box.png";
import brownMushroom from "./foodIcons/brown-mushroom.png";
import bubbleTea from "./foodIcons/bubble-tea.png";
import cannedFood from "./foodIcons/canned-food.png";
import carrot from "./foodIcons/carrot.png";
import cheeseWedge from "./foodIcons/cheese-wedge.png";
import croissant from "./foodIcons/croissant.png";
import dango from "./foodIcons/dango.png";
import doughnut from "./foodIcons/doughnut.png";
import earOfCorn from "./foodIcons/ear-of-corn.png";
import egg from "./foodIcons/egg.png";
import eggplant from "./foodIcons/eggplant.png";
import friedShrimp from "./foodIcons/fried-shrimp.png";
import hamburger from "./foodIcons/hamburger.png";
import honeyPot from "./foodIcons/honey-pot.png";
import kiwiFruit from "./foodIcons/kiwi-fruit.png";
import onion from "./foodIcons/onion.png";
import pan from "./foodIcons/pan.png";
import pancakes from "./foodIcons/pancakes.png";
import peanuts from "./foodIcons/peanuts.png";
import potOfFood from "./foodIcons/pot-of-food.png";
import potato from "./foodIcons/potato.png";
import poultryLeg from "./foodIcons/poultry-leg.png";
import pretzel from "./foodIcons/pretzel.png";
import squid from "./foodIcons/squid.png";
import steamingBowl from "./foodIcons/steaming-bowl.png";
import strawberry from "./foodIcons/strawberry.png";
import sushi from "./foodIcons/sushi.png";
import taco from "./foodIcons/taco.png";
import takeoutBox from "./foodIcons/takeout-box.png";
import tomato from "./foodIcons/tomato.png";
import watermelon from "./foodIcons/watermelon.png";

const getRandomOffset = () => Math.random() * 10 - 5;

export default function FloatingFood() {
  const getRandomPositionInCircle = () => {
    let radius;

    if (window.innerWidth < 767) {
      radius = window.innerWidth * 0.6;
      setFoodIcons(foodIcons.sort(() => 0.5 - Math.random()).slice(0, 20));
    } else {
      radius = 800;
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

  const [foodIcons, setFoodIcons] = useState([
    avocado,
    bacon,
    banana,
    bellPepper,
    bentoBox,
    brownMushroom,
    bubbleTea,
    cannedFood,
    carrot,
    cheeseWedge,
    croissant,
    dango,
    doughnut,
    earOfCorn,
    egg,
    eggplant,
    friedShrimp,
    hamburger,
    honeyPot,
    kiwiFruit,
    onion,
    pan,
    pancakes,
    peanuts,
    potOfFood,
    potato,
    poultryLeg,
    pretzel,
    squid,
    steamingBowl,
    strawberry,
    sushi,
    taco,
    takeoutBox,
    tomato,
    watermelon,
  ]);

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
