import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// SETTING UP CAMERA, SCENE AND RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.setPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// SETTING UP GEOMETRY/MATERIAL - Donut
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// SETTING UP GEOMETRY/MATERIAL - JM BOX
const jmTexture = new THREE.TextureLoader().load('jm.jpg');
const jm = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: jmTexture})
);
scene.add(jm);

// SETTING UP GEOMETRY/MATERIAL - MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
moon.position.z = 15;
moon.position.setX(-10);
scene.add(moon);

// SETTING UP LIGHT AND GRID
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

// ORBIT CONTROL
const controls = new OrbitControls(camera, renderer.domElement);

// UPDATE BACKGROUND TEXTURE
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// CORE FUNCTION
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();

// MISC FUNCTIONS
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// USER INTERACTION
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jm.rotation.y += 0.01;
  jm.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera


/*
AREAS FOR IMPROVEMENT
- not responsive, have to refresh to scale back resolution
- more customization and animation, add into rendering function
- better background and themes
- infusion with bootstrap items 
- update/create new website to host old games, as v2
 
INTEGRATION INTO DJANGO
- add styles.css and main.js into static folder and unpack in html file
- google online to find out how to bring node_modules file into static/django
*/
