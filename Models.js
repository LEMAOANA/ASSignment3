import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function loadModels(scene) {
  const loader = new GLTFLoader();
  const graland = new URL('./animation.glb', import.meta.url)
    // Load the character model
    loader.load(graland.href, function (gltf) {
        const graObject = gltf.scene;
        graObject.scale.set(1, 1, 1);
        graObject.position.set(0, 2.5,0 ); // Set the position of the character model
        scene.add(graObject);
      }, undefined, function (error) {
        console.error(error);
      });

      // Create a box geometry
     const boxGeometry = new THREE.BoxGeometry(2000, 1, 2000);
     const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
     const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
     boxMesh.position.set(0, -2.5, 0); 
     scene.add(boxMesh);

  // Add additional model loading and positioning here
}
