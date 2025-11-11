import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Floating model component
function FloatingFood({ name, recipeId, triggerTransition, isZooming }) {
  const ref = useRef();
  const hoverRef = useRef(false);
  const { scene } = useGLTF("/models/paneerbuttermasala.glb");

  useFrame((_, delta) => {
    // 🔥 model rotates on its own axis
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2; // adjust for faster/slower spin
    }

    // scaling effect (hover / zoom transition)
    let targetScale = hoverRef.current ? 1.1 : 1;
    if (isZooming) targetScale = 3;
    ref.current.scale.lerp(
      { x: targetScale, y: targetScale, z: targetScale },
      0.1
    );
  });

  return (
    <group
      ref={ref}
      dispose={null}
      scale={[20, 20, 20]} // adjust to fit your model
      onPointerOver={() => (hoverRef.current = true)}
      onPointerOut={() => (hoverRef.current = false)}
      onClick={() => triggerTransition(recipeId)}
    >
      <primitive object={scene} />

      {/* Label */}
      <Html position={[0, -2, 0]}>
        <section className="cursor-target">
          <div
            style={{
              width: 260,
              textAlign: "center",
              color: "#e6eef8",
              padding: 8,
              background: "rgba(0,0,0,0.35)",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <strong style={{ fontSize: 16 }}>
              {name || "Heavenly Dish"}
            </strong>
            <div style={{ fontSize: 13, color: "#9fb4d1", marginTop: 6 }}>
              Click for full recipe!
            </div>
          </div>
        </section>
      </Html>
    </group>
  );
}

export default function ThreeScene({ recipe }) {
  const navigate = useNavigate();
  const title = recipe ? recipe.name : "Select a recipe";

  const [transitionStep, setTransitionStep] = useState("idle"); // idle → glitter → zoomfade
  const [selectedId, setSelectedId] = useState(null);

  const handleNavigate = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const triggerTransition = (recipeId) => {
    setSelectedId(recipeId);
    setTransitionStep("glitter");

    // Step 1: Glitter
    setTimeout(() => {
      setTransitionStep("zoomfade");
    }, 600);

    // Step 2: Navigate after fade
    setTimeout(() => {
      handleNavigate(recipeId);
    }, 1600);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <section
        className="cursor-target"
        style={{ width: "100%", height: "100%" }}
      >
        <Canvas camera={{ position: [0, 0.05, 0.05], fov: 4 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 2, -3]} intensity={0.6} />

          <FloatingFood
            name={title}
            recipeId={recipe?.id}
            triggerTransition={triggerTransition}
            isZooming={transitionStep === "zoomfade"}
          />

          {/* Camera orbits around model */}
          <OrbitControls
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.5} // slower orbit
            minDistance={1.2} // lock zoom in/out
            maxDistance={2.5}
          />
        </Canvas>
      </section>

      {/* Transition overlays */}
      <AnimatePresence>
        {transitionStep === "glitter" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="glitter-overlay"
          >
            {[...Array(50)].map((_, i) => (
              <span
                key={i}
                className="glitter-particle"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${Math.random() * 0.3}s`,
                  "--dx": `${(Math.random() - 0.5) * 350}px`,
                  "--dy": `${(Math.random() - 0.5) * 350}px`,
                  "--hue": Math.floor(Math.random() * 360),
                }}
              />
            ))}
          </motion.div>
        )}

        {transitionStep === "zoomfade" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fade-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// 🔥 Preload your GLB so it’s ready before first render
useGLTF.preload("/models/paneerbuttermasala.glb");
