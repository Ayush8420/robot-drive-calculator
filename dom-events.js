/**
 * Gets input values from the form
 * @returns {Object} - Object containing all input values
 */
function getInputValues() {
  return {
    mass: document.getElementById('mass').value,
    vmax: document.getElementById('vmax').value,
    wheelDiameter: document.getElementById('wheelDiameter').value,
    accelTime: document.getElementById('accelTime').value,
    numMotors: document.getElementById('numMotors').value
  };
}

/**
 * Displays validation errors in the UI
 * @param {Object} errors - Object containing error messages for each field
 */
function displayErrors(errors) {
  const fields = ['mass', 'vmax', 'wheelDiameter', 'accelTime', 'numMotors'];
  
  fields.forEach(field => {
    const errorEl = document.getElementById(`${field}-error`);
    
    if (errors && errors[field]) {
      errorEl.textContent = errors[field];
      errorEl.classList.remove('hidden');
    } else {
      errorEl.classList.add('hidden');
    }
  });
}

/**
 * Clears error message for a specific field
 * @param {string} fieldId - ID of the field to clear error for
 */
function clearError(fieldId) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  errorEl.classList.add('hidden');
}

/**
 * Displays calculation results in the UI
 * @param {Object} results - Object containing calculation results
 */
function displayResults(results) {
  // Update primary results
  document.getElementById('rpm-value').textContent = results.rpm.toFixed(2);
  document.getElementById('torque-value').textContent = results.finalTorque.toFixed(4);

  // Update force calculations
  document.getElementById('friction-force').textContent = results.frictionForce.toFixed(4) + ' N';
  document.getElementById('accel-force').textContent = results.accelerationForce.toFixed(4) + ' N';
  document.getElementById('total-force').textContent = results.totalForce.toFixed(4) + ' N';

  // Update torque calculations
  document.getElementById('wheel-radius').textContent = results.wheelRadius.toFixed(4) + ' m';
  document.getElementById('total-torque').textContent = results.totalTorque.toFixed(4) + ' N·m';
  document.getElementById('torque-per-motor').textContent = results.torquePerMotor.toFixed(4) + ' N·m';

  // Show results section
  document.getElementById('results').classList.remove('hidden');
}

/**
 * Hides the results section
 */
function hideResults() {
  document.getElementById('results').classList.add('hidden');
}

/**
 * Main calculation handler
 */
function handleCalculate() {
  const inputs = getInputValues();
  const errors = validateInputs(inputs);

  if (errors) {
    displayErrors(errors);
    hideResults();
    return;
  }

  displayErrors(null);
  const results = calculateMotorRequirements(inputs);
  displayResults(results);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Calculate button
  document.getElementById('calculate-btn').addEventListener('click', handleCalculate);

  // Clear errors on input
  const inputFields = ['mass', 'vmax', 'wheelDiameter', 'accelTime', 'numMotors'];
  inputFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    input.addEventListener('input', () => clearError(fieldId));
    
    // Allow Enter key to calculate
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleCalculate();
      }
    });
  });
});

