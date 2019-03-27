import { qs, qsa, $on, $delegate } from './utils';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

import { GameObjectFactory } from "./utils/GameObject"
import { enumGameObjectTypes } from "./utils/Enums"
import { UserEvent } from "./utils/Helpers"
import { tokenConfig, groundConfig, truckConfig } from "./utils/Configs"

import '../stylesheets/style.scss';

var camera,
    container,
    ground,
    renderer,
    scene,
    token,
    testTruck;

let collidableMeshList = [];


function init() {
  scene = new THREE.Scene();

  const SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight,
        VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 1000;

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

  scene.add(camera);
  camera.position.set(0, 0, -30);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  renderer.setClearColor(0x000000, 0);

  ground = GameObjectFactory(groundConfig);
  scene.add(ground);


  token = GameObjectFactory(tokenConfig);
  ground.add(token)
  collidableMeshList.push(token);


  testTruck = new GameObjectFactory(truckConfig);
  scene.add(testTruck);
  collidableMeshList.push(token);

  document.addEventListener(
    "keydown",
    (event) => {
      event.preventDefault();
      var keyCode = event.which;
      if (keyCode == 38) {
        testTruck.update(
          new UserEvent(event, null)
        );
      }
    },
    false
  );

  document.body.appendChild(renderer.domElement);

}

init();





function animate() {
  requestAnimationFrame(animate);
  render();
}


var render = function () {
  requestAnimationFrame(render);

  token.update();
  testTruck.update();

  ground.rotation.x += .005;

  var originPoint = testTruck.position.clone();

  for (var vertexIndex = 0; vertexIndex < testTruck.geometry.vertices.length; vertexIndex++) {
    var localVertex = testTruck.geometry.vertices[vertexIndex].clone();

    var globalVertex = localVertex.applyMatrix4(testTruck.matrix);
    var directionVector = globalVertex.sub(testTruck.position);


    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collidableMeshList);
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      // COLLISION DETECTED
    }
  }

  renderer.render(scene, camera);
};

render();
