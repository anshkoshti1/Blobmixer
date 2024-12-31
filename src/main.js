import * as THREE from 'three';
import vertexShader from '../shaders/vertexShader.glsl';
import textVertex from '../shaders/textVertex.glsl';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { Text } from 'troika-three-text';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const loadingManager = new THREE.LoadingManager();

const blobs = [
  {
    name: 'CD',
    background: '#9D73F7',
    config: { "uPositionFrequency": 0.8, "uPositionStrength": 0.5, "uSmallWavePositionFrequency": 0.7, "uSmallWavePositionStrength": 0.6, "roughness": 0.3, "metalness": 0.7, "envMapIntensity": 0.8, "clearcoat": 0.2, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": false, "wireframe": false, "map": "cd" },
  },
  {
    name: 'Cosmic Fusion',
    background: '#D4C4FA',
    config: { "uPositionFrequency": 1, "uPositionStrength": 0.3, "uSmallWavePositionFrequency": 0.5, "uSmallWavePositionStrength": 0.7, "roughness": 1, "metalness": 0, "envMapIntensity": 0.5, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "cosmic-fusion" },
  },
  {
    name: 'Deep Ocean',
    background: '#99CCFF',
    config: { "uPositionFrequency": 1.1, "uPositionStrength": 0.6, "uSmallWavePositionFrequency": 0.8, "uSmallWavePositionStrength": 0.5, "roughness": 0.4, "metalness": 0.6, "envMapIntensity": 1, "clearcoat": 0.3, "clearcoatRoughness": 0.1, "transmission": 0, "flatShading": false, "wireframe": false, "map": "deep-ocean" },
  },
  {
    name: 'Foil',
    background: '#E6E6E6',
    config: { "uPositionFrequency": 1.2, "uPositionStrength": 0.8, "uSmallWavePositionFrequency": 1.0, "uSmallWavePositionStrength": 0.6, "roughness": 0.2, "metalness": 1, "envMapIntensity": 1.5, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "foil" },
  },
  {
    name: 'Halloween',
    background: '#FFB280',
    config: { "uPositionFrequency": 0.9, "uPositionStrength": 0.7, "uSmallWavePositionFrequency": 0.6, "uSmallWavePositionStrength": 0.8, "roughness": 0.5, "metalness": 0.4, "envMapIntensity": 0.9, "clearcoat": 0.1, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": true, "wireframe": false, "map": "halloween" },
  },
  {
    name: 'Hologram',
    background: '#D8D9E6',
    config: { "uPositionFrequency": 1.5, "uPositionStrength": 0.5, "uSmallWavePositionFrequency": 1.2, "uSmallWavePositionStrength": 1.0, "roughness": 0.1, "metalness": 0.9, "envMapIntensity": 1.8, "clearcoat": 0.3, "clearcoatRoughness": 0.1, "transmission": 0, "flatShading": false, "wireframe": false, "map": "hologram" },
  },
  {
    name: 'Imaginarium',
    background: '#B3ADEB',
    config: { "uPositionFrequency": 1.0, "uPositionStrength": 0.6, "uSmallWavePositionFrequency": 0.9, "uSmallWavePositionStrength": 0.7, "roughness": 0.4, "metalness": 0.6, "envMapIntensity": 1.1, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "imaginarium" },
  },
  {
    name: 'Iridescent',
    background: '#C995F7',
    config: { "uPositionFrequency": 0.7, "uPositionStrength": 0.3, "uSmallWavePositionFrequency": 1.1, "uSmallWavePositionStrength": 0.9, "roughness": 0.3, "metalness": 0.7, "envMapIntensity": 1.2, "clearcoat": 0.2, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": false, "wireframe": false, "map": "iridescent" },
  },
  {
    name: 'Lucky Day',
    background: '#A8DCEF',
    config: { "uPositionFrequency": 1.022, "uPositionStrength": 0.99, "uSmallWavePositionFrequency": 0.378, "uSmallWavePositionStrength": 0.341, "roughness": 0.292, "metalness": 0.73, "envMapIntensity": 0.86, "clearcoat": 1, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "lucky-day" },
  },
  {
    name: 'Passion',
    background: '#FFB3B3',
    config: { "uPositionFrequency": 0.6, "uPositionStrength": 0.4, "uSmallWavePositionFrequency": 0.7, "uSmallWavePositionStrength": 0.5, "roughness": 0.4, "metalness": 0.5, "envMapIntensity": 0.8, "clearcoat": 0.3, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": false, "wireframe": false, "map": "passion" },
  },
  {
    name: 'Pink Floyd',
    background: '#F48FB1',
    config: { "uPositionFrequency": 0.9, "uPositionStrength": 0.5, "uSmallWavePositionFrequency": 0.8, "uSmallWavePositionStrength": 0.6, "roughness": 0.3, "metalness": 0.7, "envMapIntensity": 1.0, "clearcoat": 0.4, "clearcoatRoughness": 0.3, "transmission": 0, "flatShading": true, "wireframe": false, "map": "pink-floyd" },
  },
  {
    name: 'Purple Rain',
    background: '#B980FF',
    config: { "uPositionFrequency": 0.584, "uPositionStrength": 0.276, "uSmallWavePositionFrequency": 0.899, "uSmallWavePositionStrength": 1.266, "roughness": 0, "metalness": 1, "envMapIntensity": 2, "clearcoat": 0, "clearcoatRoughness": 0, "transmission": 0, "flatShading": false, "wireframe": false, "map": "purple-rain" },
  },
  {
    name: 'Rainbow',
    background: '#FFF59D',
    config: { "uPositionFrequency": 0.8, "uPositionStrength": 0.5, "uSmallWavePositionFrequency": 0.7, "uSmallWavePositionStrength": 0.6, "roughness": 0.3, "metalness": 0.7, "envMapIntensity": 0.8, "clearcoat": 0.2, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": false, "wireframe": false, "map": "rainbow" },
  },
  {
    name: 'Sirens',
    background: '#80FFE6',
    config: { "uPositionFrequency": 1.1, "uPositionStrength": 0.4, "uSmallWavePositionFrequency": 0.8, "uSmallWavePositionStrength": 0.7, "roughness": 0.4, "metalness": 0.6, "envMapIntensity": 1, "clearcoat": 0.3, "clearcoatRoughness": 0.1, "transmission": 0, "flatShading": false, "wireframe": false, "map": "sirens" },
  },
  {
    name: 'Sunset Vibes',
    background: '#FFBCA4',
    config: { "uPositionFrequency": 1.0, "uPositionStrength": 0.7, "uSmallWavePositionFrequency": 1.2, "uSmallWavePositionStrength": 0.9, "roughness": 0.3, "metalness": 0.5, "envMapIntensity": 0.9, "clearcoat": 0.2, "clearcoatRoughness": 0.3, "transmission": 0, "flatShading": false, "wireframe": false, "map": "sunset-vibes" },
  },
  {
    name: 'Synthwave',
    background: '#FF99B4',
    config: { "uPositionFrequency": 0.9, "uPositionStrength": 0.4, "uSmallWavePositionFrequency": 1.0, "uSmallWavePositionStrength": 0.8, "roughness": 0.4, "metalness": 0.7, "envMapIntensity": 1.2, "clearcoat": 0.3, "clearcoatRoughness": 0.2, "transmission": 0, "flatShading": true, "wireframe": false, "map": "synthwave" },
  },
  {
    name: 'White',
    background: '#111111',
    config: { "uPositionFrequency": 0.7, "uPositionStrength": 0.5, "uSmallWavePositionFrequency": 0.6, "uSmallWavePositionStrength": 0.7, "roughness": 0.5, "metalness": 0.4, "envMapIntensity": 0.9, "clearcoat": 0.2, "clearcoatRoughness": 0.1, "transmission": 0, "flatShading": false, "wireframe": false, "map": "white" },
  },
];


let isAnimating = false;
let currentIndex = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#9D73F7');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const rgbeLoader = new RGBELoader(loadingManager);
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

const uniforms = {
  uTime: { value: 0 },
  uPositionFrequency: { value: blobs[currentIndex].config.uPositionFrequency },
  uPositionStrength: { value: blobs[currentIndex].config.uPositionStrength },
  uTimeFrequency: { value: .3 },
  uSmallWavePositionFrequency: { value: blobs[currentIndex].config.uSmallWavePositionFrequency },
  uSmallWavePositionStrength: { value: blobs[currentIndex].config.uSmallWavePositionStrength },
  uSmallWaveTimeFrequency: { value: .3 },
};

const geometry = new THREE.IcosahedronGeometry(1.8, 200);
const material = new CustomShaderMaterial({
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader,
  map: new THREE.TextureLoader(loadingManager).load(`./gradients/${blobs[currentIndex].config.map}.png`),
  roughness: blobs[currentIndex].config.roughness,
  metalness: blobs[currentIndex].config.metalness,
  envMapIntensity: blobs[currentIndex].config.envMapIntensity,
  clearcoat: blobs[currentIndex].config.clearcoat,
  clearcoatRoughness: blobs[currentIndex].config.clearcoatRoughness,
  transmission: blobs[currentIndex].config.transmission,
  flatShading: blobs[currentIndex].config.flatShading,
  wireframe: blobs[currentIndex].config.wireframe,
  uniforms,
});

const mergedGeometry = mergeVertices(geometry);
mergedGeometry.computeTangents();

const sphere = new THREE.Mesh(mergedGeometry, material);
sphere.renderOrder = 0; // Render the sphere first
scene.add(sphere);

camera.position.z = 5;

const clock = new THREE.Clock();

const textMaterial = new THREE.ShaderMaterial({
  vertexShader: textVertex,
  fragmentShader: `void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }`,
  uniforms: {
    progress: { value: 0 },
    direction: { value: 1 },
  },
  side: THREE.DoubleSide,
  depthTest: false, // Prevent occlusion
});

const texts = blobs.map((blob, index) => {
  const myText = new Text();
  myText.text = blob.name;
  myText.font = `./fonts/aften_screen.woff`;
  myText.anchorX = 'center';
  myText.anchorY = 'middle';
  myText.material = textMaterial;
  myText.position.set(0, 0, 2);
  myText.renderOrder = 1; // Render after the sphere
  if (index !== 0) {
    myText.scale.set(0, 0, 0);
  }
  myText.fontSize = window.innerWidth / 2000;
  myText.glyphGeometryDetail = 20;
  myText.sync();
  scene.add(myText);
  return myText;
});

window.addEventListener("wheel", (e) => {
  if (isAnimating) return;
  isAnimating = true;
  let direction = Math.sign(e.deltaY);
  let next = (currentIndex + direction + blobs.length) % blobs.length;

  texts[next].scale.set(1, 1, 1);
  texts[next].position.x = direction * 8;

  gsap.to(textMaterial.uniforms.progress, {
    value: 0.5,
    duration: 1,
    ease: 'power1.inOut',
    onComplete: () => {
      currentIndex = next;
      isAnimating = false;
      textMaterial.uniforms.progress.value = 0;
    }
  });

  gsap.to(texts[currentIndex].position, {
    x: -direction * 8,
    duration: 1,
    ease: 'power2.inOut',
  });

  gsap.to(sphere.rotation, {
    y: sphere.rotation.y + Math.PI * 2 * -direction,
    duration: 1,
    ease: 'power2.inOut',
  });

  gsap.to(texts[next].position, {
    x: 0,
    duration: 1,
    ease: 'power2.inOut',
  });

  const bg = new THREE.Color(blobs[next].background);
  gsap.to(scene.background, {
    r: bg.r,
    g: bg.g,
    b: bg.b,
    duration: 1,
    ease: 'power2.inOut',
  });

  updateBlob(blobs[next].config);
});

function updateBlob(config) {
  gsap.to(material, {
    roughness: config.roughness,
    metalness: config.metalness,
    envMapIntensity: config.envMapIntensity,
    clearcoat: config.clearcoat,
    clearcoatRoughness: config.clearcoatRoughness,
    transmission: config.transmission,
    flatShading: config.flatShading,
    wireframe: config.wireframe,
    duration: 1,
    ease: 'power2.inOut',
    onStart: () => {
      material.map = new THREE.TextureLoader(loadingManager).load(`./gradients/${config.map}.png`);
    }
  });

  gsap.to(material.uniforms.uPositionFrequency, {
    value: config.uPositionFrequency,
    duration: 1,
    ease: 'power2.inOut',
  });

  gsap.to(material.uniforms.uPositionStrength, {
    value: config.uPositionStrength,
    duration: 1,
    ease: 'power2.inOut',
  });

  gsap.to(material.uniforms.uSmallWavePositionFrequency, {
    value: config.uSmallWavePositionFrequency,
    duration: 1,
    ease: 'power2.inOut',
  });

  gsap.to(material.uniforms.uSmallWavePositionStrength, {
    value: config.uSmallWavePositionStrength,
    duration: 1,
    ease: 'power2.inOut',
  });
}

loadingManager.onLoad = () => {
  function animate() {
    uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
};

const txtRot = document.querySelector(".rotateText");
gsap.to(txtRot, {
  rotate: 360,
  ease: "linear",
  duration: 15,
  repeat: -1,
});

const counter = document.querySelector('#counter');
    const progressBar = document.querySelector('#progress-bar');
    const loader = document.querySelector('#loader');
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      counter.textContent = count;
      progressBar.style.width = `${count}%`;
      
      if(count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('fade-out');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 500);
      }
    }, 20);