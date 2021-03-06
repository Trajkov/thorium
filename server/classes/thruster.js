import {System} from "./generic";
export default class Thrusters extends System {
  constructor(params) {
    super(params);
    this.class = "Thrusters";
    this.type = "Thrusters";
    this.name = params.name || "Thrusters";
    this.direction = params.direction || {x: 0, y: 0, z: 0};
    this.rotation = params.rotation || {yaw: 0, pitch: 0, roll: 0};
    this.rotationDelta = params.rotationDelta || {yaw: 0, pitch: 0, roll: 0};
    this.rotationRequired = params.rotationRequired || {
      yaw: 0,
      pitch: 0,
      roll: 0,
    };
    this.manualThrusters = params.manualThrusters || false;
    this.thrusting = params.thrusting || false;
    this.rotationSpeed = params.rotationSpeed || 3;
    this.movementSpeed = params.movementSpeed || 5;
  }
  get stealthFactor() {
    if (this.thrusting) return 0.2;
    return 0;
  }
  trainingMode() {
    this.rotationRequired = {yaw: 125, pitch: 320, roll: 200};
  }
  reset = () => {
    this.thrusting = false;
    this.rotationDelta = {yaw: 0, pitch: 0, roll: 0};
    this.direction = {x: 0, y: 0, z: 0};
  };
  updateRotation(rotation, thrusting = false) {
    this.thrusting = thrusting;
    this.rotationDelta = rotation;
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(this.reset, 7 * 1000);
  }
  updateDirection(direction) {
    this.direction = direction;
    clearTimeout(this.resetTimeout);
    this.resetTimeout = setTimeout(this.reset, 7 * 1000);
  }
  setRotation(rotation) {
    this.rotation = rotation;
  }
  updateRequired(rotation) {
    this.rotationRequired = rotation;
  }
  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }
  setMovementSpeed(speed) {
    this.movementSpeed = speed;
  }
}
