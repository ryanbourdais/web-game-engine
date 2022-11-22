// import * as THREE from "three";
import { Box, Plane } from "@react-three/drei";
import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import niceColors from "nice-color-palettes";
import { useEffect, useState } from "react";
import "./index.css";

function PhyPlane({ color, ...props }) {
  const [ref] = usePlane(() => ({ ...props }));

  return (
    <Plane args={[1000, 1000]} ref={ref}>
      <meshStandardMaterial color={color} />
    </Plane>
  );
}

const PhyBox = (props) => {
  const { position, controlled } = props;
  const [ref, api] = useBox(() => ({
    args: [1, 1, 1],
    mass: 1,
    position,
  }));

  const [key, setKey] = useState("a");
  document.addEventListener("keydown", (e) => setKey(e.key));
  document.addEventListener("keyup", (e) => setKey(""));
  useEffect(() => {
    if (controlled) {
      if (key === "w") {
        api.velocity.set(0, 0, -2);
      } else if (key === "a") {
        api.velocity.set(-2, 0, 0);
      } else if (key === "s") {
        api.velocity.set(0, 0, 2);
      } else if (key === "d") {
        api.velocity.set(2, 0, 0);
      } else if (key === " ") {
        api.velocity.set(0, 5, 0);
      }
    }
  }, [key, api.velocity, controlled]);

  return (
    <Box
      args={[1, 1, 1]}
      ref={ref}
      onClick={
        () =>
          // This shoots the object when clicked on
          api.applyImpulse([0, 5, -10], [0, 0, 0])
        // &&

        // This makes the object fly upwards when clicked on

        // api.velocity.set(0, 2, 0)
      }
    >
      <meshNormalMaterial />
    </Box>
  );
};

// function InstancedSpheres({ number }) {
//   const map = useLoader(THREE.TextureLoader, "/carbon_normal.jpg");
//   const [ref] = useSphere((index) => ({
//     mass: 1,
//     position: [Math.random() - 0.5, Math.random() - 0.5, index * 4],
//     args: 1,
//   }));
//   const colors = useMemo(() => {
//     const array = new Float32Array(number * 3);
//     const color = new THREE.Color();
//     for (let i = 0; i < number; i++)
//       color
//         .set(niceColors[17][Math.floor(Math.random() * 5)])
//         .convertSRGBToLinear()
//         .toArray(array, i * 3);
//     return array;
//   }, [number]);
//   return (
//     <instancedMesh
//       ref={ref}
//       castShadow
//       receiveShadow
//       args={[null, null, number]}
//     >
//       <sphereBufferGeometry attach="geometry" args={[1, 16, 16]}>
//         <instancedBufferAttribute
//           attachObject={["attributes", "color"]}
//           args={[colors, 3]}
//         />
//       </sphereBufferGeometry>
//       <meshPhongMaterial
//         attach="material"
//         // vertexColors={THREE.VertexColors}
//         normalMap={map}
//         normalScale={[1, 1]}
//         normalMap-wrapS={THREE.RepeatWrapping}
//         normalMap-wrapT={THREE.RepeatWrapping}
//         normalMap-repeat={[10, 10]}
//       />
//     </instancedMesh>
//   );
// }

const App = () => {
  return (
    // Canvas holds all our items and scenes
    // Set camera position and focus
    <Canvas
      camera={{ position: [0, 0, 0], near: 0.1, far: 1000 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Set gravity // All items we want to see the effect of gravity on them
      shall be inside the Physics tags // These include the planes and boxes and
      any other models // Four planes are created which shall hold the contents
      as a platform*/}
      <Physics gravity={[0, -10, 0]}>
        <PhyPlane
          color={niceColors[17][5]}
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        {/* <PhyPlane color={niceColors[17][2]} position={[0, 0, -10]} /> */}
        {/* <PhyPlane
          color={niceColors[17][3]}
          position={[-6, 0, -10]}
          rotation={[0, 2, 0]}
        /> */}
        {/* <PhyPlane
          color={niceColors[17][1]}
          position={[6, 0, -10]}
          rotation={[0, -2, 0]}
        /> */}
        {/* Three objects are placed in different positions in the x, y, and z
        axis */}
        <PhyBox position={[2, 0, -5]} />
        <PhyBox position={[0, 0, -5]} controlled={true} />
        <PhyBox position={[-2, 0, -5]} />
      </Physics>
      {/* This is for provision of ambient lighting in the scene*/}
      <ambientLight intensity={0.3} />
      {/* We have added some pointLight here at the position showed*/}
      <pointLight intensity={0.8} position={[5, 0, 5]} />
      {/* Apart from ambient light and point light, you can add others such as
      fog */}
    </Canvas>
  );
};

export default App;
