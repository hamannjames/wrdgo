import EventEmitter from 'events';

const eventEmitter = new EventEmitter();

const GameplayEmitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload)
}

Object.freeze(GameplayEmitter);

export default GameplayEmitter;