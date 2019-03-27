//https://blackthread.io/blog/promisifying-threejs-loaders/#promises-promises
import * as TWEEN from '@tweenjs/tween.js';


export const promisifyLoader = ( loader, onProgress ) => {
    let promiseLoader = ( url ) => {
      return new Promise( ( resolve, reject ) => {
        loader.load( url, resolve, onProgress, reject );
  
      });
    }
  
    return {
      originalLoader: loader,
      load: promiseLoader,
    };
  
}

export class UserEvent {
  constructor(keyEvent = null, mouseEvent = null) {
    this.keyEvent = keyEvent;
    this.mouseEvent = mouseEvent;
  }

  set udpateMouseEvent(newMouseEvent) {
    this.mouseEvent = newMouseEvent
  }

  set udpateKeyEvent(newKeyEvent) {
    this.keyEvent = newKeyEvent
  }

}


export const generateTween = (
              startPostition = { x: 0, y: 0, z: 0 },
              endPosition = { x: 0, y: 0, z: 0 },
              duration = 1000,
              onUpdate = () => { },
              onComplete = () => { }
            ) => {
              return (
                new TWEEN.Tween(startPostition)
                  .to(endPosition, duration)
                  .onUpdate(function () {
                    onUpdate();

                  })
                  .onComplete(function () {
                    onComplete();

                  })
                  .start()
              )
}


