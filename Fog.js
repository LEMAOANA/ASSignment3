// Fog.js

export class FogEffect {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.maxDistance = 1000;
    this.minDistance = 350;
    this.maxFogDensity = 0.05;
    this.minFogDensity = 0.001;

    // Enable fog
    this.scene.fog = new THREE.Fog(0x0000ff, this.minDistance, this.maxDistance);
  }

  update() {
    const distance = this.camera.position.distanceTo(this.scene.position);
    const fogDensity = (distance - this.minDistance) / (this.maxDistance - this.minDistance);
    this.scene.fog.density = THREE.MathUtils.clamp(fogDensity, this.minFogDensity, this.maxFogDensity);
  }
}
