import * as THREE from "three";

if (typeof THREEx === 'undefined') {
    var THREEx: any = {};
}


var scene = new THREE.Scene();
var camera = new THREE.Camera();
var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// AR.js Context
var arToolkitSource = new THREEx.ArToolkitSource({ sourceType: 'webcam' });
var arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
    detectionMode: 'mono_and_matrix',
    matrixCodeType: '3x3_HAMMING63'
});

arToolkitSource.init(function onReady() {
    setTimeout(() => {
        onResize();
    }, 2000);
});

// Handle resize
window.addEventListener('resize', function () {
    onResize();
});

function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
}



var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial({ color: 0x888888 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);




function animate() {
    requestAnimationFrame(animate);

    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }

    // prioritizeMarkers();
    renderer.render(scene, camera);
}

animate();