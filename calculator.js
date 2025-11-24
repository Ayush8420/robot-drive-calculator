// Constants for motor calculations
const CONSTANTS = {
  g: 9.8,           // Gravity (m/s²)
  mu: 0.04,         // Coefficient of friction
  eta: 0.8,         // Efficiency
  safetyFactor: 1.5 // Safety factor
};

/**
 * Validates input values
 * @param {Object} inputs - Object containing all input values
 * @returns {Object|null} - Returns validation errors or null if valid
 */
function validateInputs(inputs) {
  const errors = {};

  if (!inputs.mass || parseFloat(inputs.mass) <= 0) {
    errors.mass = 'Must be a positive number';
  }
  if (!inputs.vmax || parseFloat(inputs.vmax) <= 0) {
    errors.vmax = 'Must be a positive number';
  }
  if (!inputs.wheelDiameter || parseFloat(inputs.wheelDiameter) <= 0) {
    errors.wheelDiameter = 'Must be a positive number';
  }
  if (!inputs.accelTime || parseFloat(inputs.accelTime) <= 0) {
    errors.accelTime = 'Must be a positive number';
  }
  if (!inputs.numMotors || parseInt(inputs.numMotors) <= 0 || !Number.isInteger(parseFloat(inputs.numMotors))) {
    errors.numMotors = 'Must be a positive integer';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/**
 * Calculates motor requirements based on input parameters
 * @param {Object} inputs - Object containing all input values
 * @returns {Object} - Calculation results
 */
function calculateMotorRequirements(inputs) {
  const mass = parseFloat(inputs.mass);
  const vmax = parseFloat(inputs.vmax);
  const wheelDiameter = parseFloat(inputs.wheelDiameter);
  const accelTime = parseFloat(inputs.accelTime);
  const numMotors = parseInt(inputs.numMotors);

  // Convert wheel diameter from mm to meters
  const wheelDiameter_m = wheelDiameter / 1000.0;
  const radius = wheelDiameter_m / 2;

  // Calculate RPM
  const rpm = (vmax * 60) / (Math.PI * wheelDiameter_m);

  // Calculate forces
  const frictionForce = mass * CONSTANTS.mu * CONSTANTS.g;
  const accelerationForce = mass * (vmax / accelTime);
  const totalForce = frictionForce + accelerationForce;

  // Calculate torques
  const totalTorque = totalForce * radius;
  const torquePerMotor = totalTorque / (numMotors * CONSTANTS.eta);
  const finalTorque = CONSTANTS.safetyFactor * torquePerMotor;

  return {
    rpm,
    frictionForce,
    accelerationForce,
    totalForce,
    wheelRadius: radius,
    totalTorque,
    torquePerMotor,
    finalTorque
  };
}

