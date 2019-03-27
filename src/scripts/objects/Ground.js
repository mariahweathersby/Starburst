import * as THREE from 'three';
import { groundConfig } from '../utils/Configs';
import { enumGameObjectTypes } from '../utils/Enums';


export class Ground extends THREE.Mesh {
  constructor(config = groundConfig) {
    super();

    this.config = config;
    this.gameObjtype = enumGameObjectTypes.GROUND;

    this.geometry = new THREE.SphereGeometry(...config.geometryArgs);
    this.geometry.vertices.forEach(v => {
      v.x += THREE.Math.randFloatSpread(2);
      v.y += THREE.Math.randFloatSpread(.25);
      v.z += THREE.Math.randFloatSpread(.5);
    });
    this.geometry.computeFaceNormals();

    this.material = new THREE.MeshBasicMaterial(config.material)


  }


}

