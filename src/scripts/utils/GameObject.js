import { tokenConfig, worldConfig, truckConfig } from './Configs';
import { enumGameObjectTypes } from './Enums'

import { Token } from '../objects/Token'
import { Ground } from '../objects/Ground'
import { Truck } from '../objects/Truck'

import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import * as THREE from 'three';
import { resolve } from '../../../node_modules/url';


export const GameObjectFactory = (config) => {
  switch (config.type) {
    case enumGameObjectTypes.TOKEN:
      let token = new GameObject(config);
      return token;
      break;

    case enumGameObjectTypes.GROUND:
      let ground = new GameObject(config);
      return ground;
      break;

    case enumGameObjectTypes.TRUCK:
      let truck = new GameObject(config);
      return truck;
      break;

    default:
      break;

  }


}

export const GameObject = function(config) {
  this.config = config;

  switch (config.type) {
    case enumGameObjectTypes.TOKEN:
      let token = new Token(config);
      return token;
      break;

    case enumGameObjectTypes.GROUND:
      let ground = new Ground(config);
      return ground;
      break;

    case enumGameObjectTypes.TRUCK:
      let truck = new Truck(config);
      return truck;
      break;

  }

}

