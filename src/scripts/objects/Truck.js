import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import { truckConfig } from '../utils/Configs';
import { enumGameObjectTypes, enumDriveState } from '../utils/Enums';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

import { promisifyLoader, generateTween } from '../utils/Helpers'


export class Truck extends THREE.Mesh {
  constructor(config = truckConfig) {
    super();

    this.currentTween = null;
    this.config = config;
    this.gameObjtype = enumGameObjectTypes.TOKEN;
    this.geometry = new THREE.BoxGeometry(.75, .75, .75);
    this.material = new THREE.MeshBasicMaterial({
      color: '#FF0000',
      wireframe: true,

    })
    this.userData = config.userData;

    this.position.set(...config.position)

  }

  get state() { return this.userData.state }
  set state(newState) {
    this.userData.state = newState
  }

  set updateTween(newTween) {
    this.currentTween = newTween;
  }


  jump = () => {
    this.restPosition = this.position;

    if (this.state === enumDriveState.JUMP_RISE) {

      let jumpPosition = JSON.parse(JSON.stringify(this.position.y));
      jumpPosition = { y: jumpPosition + this.userData.coordinates.jumpRange };

      this.updateTween = generateTween(
        this.position,
        jumpPosition,
        450,
        () => { this.state = enumDriveState.JUMP_RISE_ACTIVE },
        () => {

          let jumpPosition = JSON.parse(JSON.stringify(this.position.y));
          jumpPosition = { y: jumpPosition - this.userData.coordinates.jumpRange };

          this.updateTween = generateTween(
            this.position,
            jumpPosition,
            450,
            () => { this.state = enumDriveState.JUMP_FALL_ACTIVE },
            () => {
              this.state = enumDriveState.IDLE;
              this.resetTween();

            }
          );

        }
      );

    }

  }

  resetTween = () => {
    this.updateTween = null;
  }

  update = (userEvent) => {
    TWEEN.update();

    //NOTE: this check will prevent any duplicate tweens from being
    //generated on the same object [user rapid keypress]
    if (
      userEvent && userEvent.keyEvent &&
      userEvent.keyEvent.keyCode === 38
    ) {
      if (this.currentTween == null) {
        this.state = enumDriveState.JUMP_RISE;
        this.jump();
      }
    }


  }


}

