import { enumGameObjectTypes, enumTokenState } from './Enums'

export const tokenConfig = {
  type: enumGameObjectTypes.TOKEN,
  position: [0, -7, 0],
  geometryArgs: [.25, .25, .25],
  material: {
    color: '#433F81'
  },
  userData: {
    state: enumTokenState.HOVER_RISE,
    coordinates: {
      rest: { x: 0, y: 0, z: 0 },
      hoverRange: 0.35
    }
  }
}


export const groundConfig = {
  type: enumGameObjectTypes.GROUND,
  position: [0, 0, 0],
  geometryArgs: [5, 15, 10],
  material: {
    color: '#433F81',
    wireframe: true,
  },
  userData: {
    state: "drive",
    coordinates: {
      rest: { x: 0, y: 0, z: 0 }
    }
  }
}

export const truckConfig = {
  type: enumGameObjectTypes.TRUCK,
  position: [0, 5.25, 0 ],
  scale: .75,
  geometry: {
    path: '/maya_models/',
    file: 'truck_body.obj'
  },
  material: {
    path: '/maya_models/',
    file: 'truck_body.mtl'
  },
  userData: {
    state: "JUMP_RISE",
    coordinates: {
      rest: { x: 0, y: 0, z: 0 },
      jumpRange: 3,
    }
  }
}
