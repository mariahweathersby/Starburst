import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import { tokenConfig } from '../utils/Configs';
import { enumGameObjectTypes, enumTokenState } from '../utils/Enums';
import { generateTween } from '../utils/Helpers';


export class Token extends THREE.Mesh {
  constructor(config = tokenConfig) {
    super();

    this.config = config;
    this.currentTween = null;

    this.gameObjtype = enumGameObjectTypes.TOKEN;
    this.userData = config.userData;

    this.geometry = new THREE.BoxGeometry(...config.geometryArgs);
    this.material = new THREE.MeshBasicMaterial({ color: config.material.color });
    this.position.set(...config.position);

  }

  get state() { return this.userData.state }
  set state(newState) {
    this.userData.state = newState
  }

  get restPosition() { return this.userData.coordinates.rest }
  set restPosition(newCoordinates) {
    this.userData.coordinates.rest = newCoordinates
  }

  set updateTween(newTween) {
    this.currentTween = newTween;
  }



  hover = () => {

    let token = this,
        risePosition = null;

    if (this.state === enumTokenState.HOVER_RISE) {

      risePosition = JSON.parse(JSON.stringify(token.position.y));
      risePosition = risePosition + token.userData.coordinates.hoverRange;

      this.updateTween = generateTween(
        token.position,
        { y: risePosition },
        1500,
        () => { token.state = enumTokenState.HOVER_RISE_ACTIVE },
        () => { token.state = enumTokenState.HOVER_FALL }
      );

    } else if (this.state === enumTokenState.HOVER_FALL) {

      risePosition = JSON.parse(JSON.stringify(token.position.y));
      risePosition = risePosition - token.userData.coordinates.hoverRange;

      this.updateTween = generateTween(
        token.position,
        { y: risePosition },
        1500,
        () => { token.state = enumTokenState.HOVER_FALL_ACTIVE },
        () => { token.state = enumTokenState.HOVER_RISE }
      );

    }

  }

  update = () => {
    TWEEN.update();
    this.hover();
    
  }

}


