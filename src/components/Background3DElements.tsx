import { motion, useScroll, useTransform } from "motion/react";

export function Background3DElements() {
  const { scrollYProgress } = useScroll();
  
  // Parallax values for different depths
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Frosted Glass Orb */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] md:left-[10%]">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-48 md:w-72 md:h-72 rounded-full"
          style={{
            background: "radial-gradient(150% 150% at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 100%)",
            boxShadow: "inset 2px 2px 10px rgba(255,255,255,0.9), inset -10px -10px 30px rgba(0,0,0,0.05), 0 30px 60px rgba(0,0,0,0.08)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.4)"
          }}
        />
      </motion.div>

      {/* 2. Metallic Aluminium Profile (Cylinder) */}
      <motion.div style={{ y: y2 }} className="absolute top-[25%] right-[5%] md:right-[10%]">
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotateZ: [35, 45, 35],
            rotateX: [10, 25, 10]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-64 md:w-32 md:h-[400px] rounded-[100px]"
          style={{
            background: "linear-gradient(105deg, #f5f5f5 0%, #ffffff 20%, #e0e0e0 45%, #ffffff 70%, #cccccc 100%)",
            boxShadow: "inset 5px 5px 15px rgba(255,255,255,1), inset -10px -10px 20px rgba(0,0,0,0.15), 20px 30px 50px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.8)"
          }}
        />
      </motion.div>

      {/* 3. Red 3D Glass Ring */}
      <motion.div style={{ y: y3 }} className="absolute bottom-[10%] left-[10%] md:left-[20%]">
        <motion.div
          animate={{ 
            rotateX: [60, 75, 60],
            rotateY: [20, 45, 20],
            rotateZ: [0, 180, 360],
            y: [0, -25, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 md:w-96 md:h-96 rounded-full"
          style={{
            border: "12px solid rgba(230, 0, 35, 0.15)",
            background: "linear-gradient(135deg, rgba(230, 0, 35, 0.05), transparent)",
            boxShadow: "inset 0 0 20px rgba(230,0,35,0.1), 0 20px 40px rgba(230,0,35,0.15)",
            backdropFilter: "blur(8px)",
            transformStyle: "preserve-3d"
          }}
        />
      </motion.div>

      {/* 4. Floating Glass Plate */}
      <motion.div style={{ y: y4 }} className="absolute -bottom-[10%] right-[10%] md:right-[20%]">
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            rotateX: [45, 55, 45],
            rotateY: [-20, -10, -20],
            rotateZ: [-15, -5, -15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-72 h-72 md:w-[400px] md:h-[400px] rounded-[40px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            borderTop: "2px solid rgba(255,255,255,0.8)",
            borderLeft: "2px solid rgba(255,255,255,0.8)",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.07)"
          }}
        />
      </motion.div>
    </div>
  );
}
