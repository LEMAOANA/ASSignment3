import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { loadModels } from './Models.js';
import { FogEffect } from './Fog.js';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 100, 250);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Function to handle window resizing
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
// Create a fog effect
const fogEffect = new FogEffect(scene, camera);



// Post-processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass();
bloomPass.strength = 0.5; // Adjust the strength of the bloom effect
bloomPass.radius = 1; // Adjust the radius of the bloom effect
bloomPass.threshold = 0.6; // Adjust the threshold for the bloom effect
composer.addPass(bloomPass);



// Render loop
function animate() {
  requestAnimationFrame(animate);
  // Update the controls
  controls.update();
  // Render the scene
  composer.render();
}
// Call the loadModels function
loadModels(scene);

// Event listener for window resize
window.addEventListener('resize', handleWindowResize);

// Start the animation loop
animate();
const controlss = new PointerLockControls( camera, document.body );
scene.add(controlss.getObject());

const movement = function(event){
  switch(event.keyCode){
    case 37:
      controlss.moveRight(-1);
      break;
    case 38 :
      controlss.moveForward(1);
      break;
    case 39: 
    controlss.moveRight(1);
    break;
    case 40:
      controlss.moveForward(-1)
  
  }
}

document.addEventListener("keydown",movement);
movement();
