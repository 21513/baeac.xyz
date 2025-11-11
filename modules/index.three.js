import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { mouseHorizontal, mouseVertical, scrollAmount } from './mouse.js';

const mouseMoveIntensity = 0.01;

const model = './assets/models/head.glb';
const hdri = './assets/images/hdr/environment.hdr';

// Idle animation parameters
const idleIntensity = 0.02; // How much the object rotates
const idleSpeed = 0.001; // How fast the idle animation is
const randomOffset = Math.random() * Math.PI * 2; // Random starting point

export function setupThreeJS() {
    const scene = new THREE.Scene();

    const page = document.getElementsByClassName('landingPage')[0];
    const camera = new THREE.PerspectiveCamera(50, page.clientWidth / page.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(page.clientWidth, page.clientHeight);

    const container = document.getElementById('three_js');
    container.appendChild(renderer.domElement);

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(hdri, (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;
        scene.environmentIntensity = 0.75;
    });

    const glbLoader = new GLTFLoader();
    glbLoader.load(
        model,
        gltf => {
            scene.add(gltf.scene);
            gltf.scene.position.set(0, 0, 0);
        },
        error => console.error('Error loading GLB:', error)
    );

    window.addEventListener('resize', () => {
        camera.aspect = page.clientWidth / page.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(page.clientWidth, page.clientHeight);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        
        // Get current time for smooth animation
        const time = Date.now();
        
        camera.rotation.y = mouseHorizontal * mouseMoveIntensity;
        camera.rotation.x = mouseVertical * mouseMoveIntensity;

        const loadedModel = scene.children.find(child => child.type === 'Group');
        if (loadedModel) {
            const scrollRotation = Math.sign(scrollAmount) * Math.pow(Math.abs(scrollAmount), 1.2) * -0.001;
            
            const idleRotationY = Math.sin(time * idleSpeed + randomOffset) * idleIntensity;
            const idleRotationX = Math.cos(time * idleSpeed * 0.7 + randomOffset + 1.5) * idleIntensity * 0.5;
            const idleRotationZ = Math.sin(time * idleSpeed * 1.3 + randomOffset + 3) * idleIntensity * 0.3;
            
            loadedModel.rotation.y = scrollRotation + idleRotationY;
            loadedModel.rotation.x = idleRotationX;
            loadedModel.rotation.z = idleRotationZ;
            
            loadedModel.position.z = scrollAmount * -0.01;
        }
        
        renderer.render(scene, camera);
    };
    animate();
}