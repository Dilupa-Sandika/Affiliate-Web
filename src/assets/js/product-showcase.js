import * as THREE from 'three';
import { gsap } from 'gsap';

class ProductShowcase {
  constructor(container, productType = 'smartlock') {
    this.container = container;
    this.productType = productType;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.product = null;
    this.mouse = new THREE.Vector2();
    this.isHovered = false;
    
    this.init();
  }

  init() {
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.createLights();
    this.createProduct();
    this.setupEventListeners();
    this.animate();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 8;
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);
  }

  createLights() {
    // Main light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, -5, 5);
    this.scene.add(fillLight);

    // Ambient
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Accent light based on product type
    const accentColor = this.getAccentColor();
    const accentLight = new THREE.PointLight(accentColor, 0.8, 20);
    accentLight.position.set(3, 3, 3);
    this.scene.add(accentLight);
  }

  getAccentColor() {
    const colors = {
      smartlock: 0xeab308,
      camera: 0x3b82f6,
      lighting: 0xec4899,
      sensor: 0x10b981
    };
    return colors[this.productType] || 0x3b82f6;
  }

  createProduct() {
    const group = new THREE.Group();
    
    switch (this.productType) {
      case 'smartlock':
        this.createSmartLock(group);
        break;
      case 'camera':
        this.createSecurityCamera(group);
        break;
      case 'lighting':
        this.createSmartLight(group);
        break;
      default:
        this.createSmartLock(group);
    }

    this.product = group;
    this.scene.add(group);

    // Initial animation
    gsap.fromTo(group.scale, 
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
    );

    // Floating animation
    gsap.to(group.position, {
      y: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  createSmartLock(group) {
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(2, 3, 0.8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d3748,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    group.add(body);

    // Touchscreen
    const screenGeometry = new THREE.PlaneGeometry(1.2, 1.8);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.9
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.41;
    group.add(screen);

    // Screen glow
    const glowGeometry = new THREE.PlaneGeometry(1.4, 2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = 0.4;
    group.add(glow);

    // Add pulsing animation to glow
    gsap.to(glowMaterial, {
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Number pad dots
    const dotGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    
    for (let i = 0; i < 12; i++) {
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      const row = Math.floor(i / 3);
      const col = i % 3;
      dot.position.set(
        (col - 1) * 0.3,
        0.6 - row * 0.3,
        0.42
      );
      group.add(dot);

      // Animate dots
      gsap.to(dot.material, {
        emissive: new THREE.Color(0x3b82f6),
        duration: 0.5,
        delay: i * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }

  createSecurityCamera(group) {
    // Camera body
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 1.2, 2.5, 16);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    group.add(body);

    // Lens
    const lensGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 16);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shininess: 200
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.y = 1.4;
    lens.rotation.x = Math.PI / 2;
    group.add(lens);

    // LED ring
    const ledRing = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const ledGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const ledMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        transparent: true,
        opacity: 0.8
      });
      const led = new THREE.Mesh(ledGeometry, ledMaterial);
      const angle = (i / 8) * Math.PI * 2;
      led.position.set(
        Math.cos(angle) * 0.7,
        1.4,
        Math.sin(angle) * 0.7
      );
      ledRing.add(led);

      // Animate LEDs
      gsap.to(led.material, {
        opacity: 1,
        duration: 0.5,
        delay: i * 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    group.add(ledRing);

    // Spotlight beam effect
    const spotlightGeometry = new THREE.ConeGeometry(2, 4, 8, 1, true);
    const spotlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    const spotlight = new THREE.Mesh(spotlightGeometry, spotlightMaterial);
    spotlight.position.y = 3;
    spotlight.rotation.x = Math.PI;
    group.add(spotlight);
  }

  createSmartLight(group) {
    // Bulb
    const bulbGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bulbMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.castShadow = false; // Light source shouldn't cast shadows
    group.add(bulb);

    // Base/Socket
    const baseGeometry = new THREE.CylinderGeometry(0.6, 0.8, 1, 16);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a5568,
      shininess: 50
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.5;
    base.castShadow = true;
    group.add(base);

    // Glow effect
    const glowGeometry = new THREE.SphereGeometry(1.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    group.add(glow);

    // Color changing animation
    const colors = [0xffffff, 0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24];
    let colorIndex = 0;

    const changeColor = () => {
      const newColor = new THREE.Color(colors[colorIndex]);
      gsap.to(bulbMaterial.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        duration: 2,
        ease: "sine.inOut"
      });
      gsap.to(bulbMaterial.emissive, {
        r: newColor.r * 0.3,
        g: newColor.g * 0.3,
        b: newColor.b * 0.3,
        duration: 2,
        ease: "sine.inOut"
      });
      gsap.to(glowMaterial.color, {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
        duration: 2,
        ease: "sine.inOut"
      });
      
      colorIndex = (colorIndex + 1) % colors.length;
      setTimeout(changeColor, 3000);
    };

    changeColor();
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize());
    this.container.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
    this.container.addEventListener('mousemove', (event) => this.handleMouseMove(event));
  }

  handleResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  handleMouseEnter() {
    this.isHovered = true;
    gsap.to(this.product.rotation, {
      y: this.product.rotation.y + Math.PI * 0.25,
      duration: 1,
      ease: "power2.out"
    });
  }

  handleMouseLeave() {
    this.isHovered = false;
    gsap.to(this.product.rotation, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });
  }

  handleMouseMove(event) {
    if (!this.isHovered) return;

    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    gsap.to(this.product.rotation, {
      x: this.mouse.y * 0.3,
      y: this.mouse.x * 0.3,
      duration: 0.5,
      ease: "power2.out"
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Slow rotation when not hovered
    if (!this.isHovered) {
      this.product.rotation.y += 0.005;
    }

    this.renderer.render(this.scene, this.camera);
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

// Auto-initialize product showcases
document.addEventListener('DOMContentLoaded', () => {
  const showcases = document.querySelectorAll('[data-product-showcase]');
  showcases.forEach(container => {
    const productType = container.getAttribute('data-product-showcase');
    new ProductShowcase(container, productType);
  });
});