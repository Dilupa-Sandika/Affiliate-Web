import * as THREE from '/assets/js/three.module.js';
import { gsap } from '/assets/js/gsap.min.js';

class HeroAnimation {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.smartDevices = [];
    this.connections = [];
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    
    this.init();
  }

  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createLights();
    this.createSmartDevices();
    this.createConnections();
    this.setupEventListeners();
    this.animate();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0a0a);
    
    // Add fog for depth
    this.scene.fog = new THREE.Fog(0x0a0a0a, 50, 200);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;
  }

  createRenderer() {
    // Detect mobile devices for performance optimization
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      alpha: true,
      powerPreference: isMobile ? "low-power" : "high-performance"
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    
    // Disable shadows on mobile for better performance
    if (!isMobile) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    this.container.appendChild(this.renderer.domElement);
  }

  createLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);

    // Accent lights
    const accentLight1 = new THREE.PointLight(0x3b82f6, 1, 100);
    accentLight1.position.set(-30, 20, 30);
    this.scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xec4899, 1, 100);
    accentLight2.position.set(30, -20, 30);
    this.scene.add(accentLight2);
  }

  createSmartDevices() {
    // Reduce device count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    
    const allDeviceTypes = [
      { type: 'camera', color: 0x3b82f6, position: [-20, 15, 0] },
      { type: 'lock', color: 0xeab308, position: [0, 20, -10] },
      { type: 'light', color: 0xec4899, position: [20, 10, 5] },
      { type: 'sensor', color: 0x10b981, position: [-15, -10, 15] },
      { type: 'hub', color: 0x8b5cf6, position: [0, 0, 0] },
      { type: 'thermostat', color: 0xf59e0b, position: [15, -15, -5] }
    ];
    
    // Use fewer devices on mobile
    const deviceTypes = isMobile ? allDeviceTypes.slice(0, 4) : allDeviceTypes;

    deviceTypes.forEach((device, index) => {
      const geometry = this.getDeviceGeometry(device.type);
      const material = new THREE.MeshPhongMaterial({
        color: device.color,
        transparent: true,
        opacity: 0.9,
        shininess: 100
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...device.position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { type: device.type, originalColor: device.color };

      // Add glow effect
      const glowGeometry = geometry.clone();
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: device.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.scale.multiplyScalar(1.2);
      mesh.add(glow);

      this.scene.add(mesh);
      this.smartDevices.push(mesh);

      // Animate device appearance
      gsap.fromTo(mesh.scale, 
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1, delay: index * 0.2, ease: "back.out(1.7)" }
      );

      // Add floating animation
      gsap.to(mesh.position, {
        y: device.position[1] + Math.sin(index) * 2,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Add rotation animation
      gsap.to(mesh.rotation, {
        y: Math.PI * 2,
        duration: 10 + index * 2,
        repeat: -1,
        ease: "none"
      });
    });
  }

  getDeviceGeometry(type) {
    switch (type) {
      case 'camera':
        return new THREE.CylinderGeometry(0.5, 1, 2, 8);
      case 'lock':
        return new THREE.BoxGeometry(2, 3, 1);
      case 'light':
        return new THREE.SphereGeometry(1.5, 16, 16);
      case 'sensor':
        return new THREE.ConeGeometry(1, 2, 6);
      case 'hub':
        return new THREE.OctahedronGeometry(2);
      case 'thermostat':
        return new THREE.CylinderGeometry(1.5, 1.5, 0.5, 16);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }

  createConnections() {
    const centerDevice = this.smartDevices.find(device => device.userData.type === 'hub');
    if (!centerDevice) return;

    this.smartDevices.forEach(device => {
      if (device.userData.type === 'hub') return;

      const points = [];
      points.push(centerDevice.position);
      points.push(device.position);

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0.3
      });

      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      this.connections.push(line);

      // Animate connection opacity
      gsap.to(material, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
    this.container.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    this.container.addEventListener('click', (event) => this.handleClick(event));
  }

  handleResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  handleMouseMove(event) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Rotate camera slightly based on mouse position
    gsap.to(this.camera.position, {
      x: this.mouse.x * 5,
      y: this.mouse.y * 5,
      duration: 1,
      ease: "power2.out"
    });
  }

  handleClick(event) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.smartDevices);

    if (intersects.length > 0) {
      const clickedDevice = intersects[0].object;
      this.animateDeviceClick(clickedDevice);
    }
  }

  animateDeviceClick(device) {
    // Scale animation
    gsap.to(device.scale, {
      x: 1.3, y: 1.3, z: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    // Color flash
    const originalColor = device.userData.originalColor;
    gsap.to(device.material.color, {
      r: 1, g: 1, b: 1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
      onComplete: () => {
        device.material.color.setHex(originalColor);
      }
    });

    // Add ripple effect
    this.createRippleEffect(device.position);
  }

  createRippleEffect(position) {
    const rippleGeometry = new THREE.RingGeometry(0, 5, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });

    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.copy(position);
    ripple.lookAt(this.camera.position);
    this.scene.add(ripple);

    gsap.to(ripple.scale, {
      x: 3, y: 3, z: 3,
      duration: 1,
      ease: "power2.out"
    });

    gsap.to(rippleMaterial, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        this.scene.remove(ripple);
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the entire scene slowly
    this.scene.rotation.y += 0.002;

    // Update connections
    this.updateConnections();

    this.renderer.render(this.scene, this.camera);
  }

  updateConnections() {
    const centerDevice = this.smartDevices.find(device => device.userData.type === 'hub');
    if (!centerDevice) return;

    this.connections.forEach((line, index) => {
      const device = this.smartDevices[index + 1]; // Skip hub (first device)
      if (!device) return;

      const points = [];
      points.push(centerDevice.position);
      points.push(device.position);

      line.geometry.setFromPoints(points);
    });
  }

  dispose() {
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
  }
}

// Auto-initialize on page load with error handling
document.addEventListener('DOMContentLoaded', () => {
  const heroContainer = document.getElementById('hero-3d');
  if (heroContainer) {
    try {
      new HeroAnimation(heroContainer);
    } catch (error) {
      console.warn('3D animation failed to load, falling back to static background:', error);
      // Add fallback styling if 3D fails
      heroContainer.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%)';
      heroContainer.style.opacity = '0.3';
    }
  }
});