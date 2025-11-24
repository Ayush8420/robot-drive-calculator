let currentTab = 'mecanum';

/**
 * Gets input values from the Mecanum form
 * @returns {Object} - Object containing all input values
 */
function getMecanumInputValues() {
  return {
    mass: document.getElementById('mecanum-mass').value,
    vmax: document.getElementById('mecanum-vmax').value,
    wheelDiameter: document.getElementById('mecanum-wheelDiameter').value,
    accelTime: document.getElementById('mecanum-accelTime').value,
    numMotors: document.getElementById('mecanum-numMotors').value
  };
}

/**
 * Gets input values from the Omni form
 * @returns {Object} - Object containing all input values
 */
function getOmniInputValues() {
  return {
    mass: document.getElementById('omni-mass').value,
    vmax: document.getElementById('omni-vmax').value,
    wheelDiameter: document.getElementById('omni-wheelDiameter').value,
    accelTime: document.getElementById('omni-accelTime').value,
    numMotors: document.getElementById('omni-numMotors').value,
    alignment: document.getElementById('omni-alignment').value,
    kiwiDrive: document.getElementById('omni-kiwiDrive').checked
  };
}

/**
 * Displays validation errors in the UI
 * @param {Object} errors - Object containing error messages for each field
 * @param {string} prefix - Prefix for field IDs (mecanum or omni)
 */
function displayErrors(errors, prefix) {
  const fields = ['mass', 'vmax', 'wheelDiameter', 'accelTime', 'numMotors'];
  
  fields.forEach(field => {
    const errorEl = document.getElementById(`${prefix}-${field}-error`);
    
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
  if (errorEl) {
    errorEl.classList.add('hidden');
  }
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

  // Show/hide omni-specific info
  const omniInfo = document.getElementById('omni-info');
  if (results.wheelType === 'omni') {
    document.getElementById('alignment-angle').textContent = results.alignmentAngle + '°';
    document.getElementById('cos-factor').textContent = results.cosTheta.toFixed(4);
    document.getElementById('drive-config').textContent = results.kiwiDrive ? 'Kiwi Drive (3-wheel)' : 'Standard';
    omniInfo.classList.remove('hidden');
  } else {
    omniInfo.classList.add('hidden');
  }

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
 * Switches between tabs
 * @param {string} tabName - Name of the tab to switch to
 */
function switchTab(tabName) {
  currentTab = tabName;

  // Update tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tabName}-content`).classList.add('active');

  // Hide results when switching tabs
  hideResults();
}

/**
 * Main calculation handler for Mecanum wheels
 */
function handleMecanumCalculate() {
  const inputs = getMecanumInputValues();
  const errors = validateMecanumInputs(inputs);

  if (errors) {
    displayErrors(errors, 'mecanum');
    hideResults();
    return;
  }

  displayErrors(null, 'mecanum');
  const results = calculateMecanumMotorRequirements(inputs);
  displayResults(results);
}

/**
 * Main calculation handler for Omni wheels
 */
function handleOmniCalculate() {
  const inputs = getOmniInputValues();
  const errors = validateOmniInputs(inputs);

  if (errors) {
    displayErrors(errors, 'omni');
    hideResults();
    return;
  }

  displayErrors(null, 'omni');
  const results = calculateOmniMotorRequirements(inputs);
  displayResults(results);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Mecanum calculate button
  document.getElementById('mecanum-calculate-btn').addEventListener('click', handleMecanumCalculate);

  // Omni calculate button
  document.getElementById('omni-calculate-btn').addEventListener('click', handleOmniCalculate);

  // Clear errors on input - Mecanum
  const mecanumFields = ['mass', 'vmax', 'wheelDiameter', 'accelTime', 'numMotors'];
  mecanumFields.forEach(field => {
    const input = document.getElementById(`mecanum-${field}`);
    input.addEventListener('input', () => clearError(`mecanum-${field}`));
    
    // Allow Enter key to calculate
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleMecanumCalculate();
      }
    });
  });

  // Clear errors on input - Omni
  const omniFields = ['mass', 'vmax', 'wheelDiameter', 'accelTime', 'numMotors'];
  omniFields.forEach(field => {
    const input = document.getElementById(`omni-${field}`);
    input.addEventListener('input', () => clearError(`omni-${field}`));
    
    // Allow Enter key to calculate
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleOmniCalculate();
      }
    });
  });

  // Handle alignment change
  document.getElementById('omni-alignment').addEventListener('change', () => clearError('omni-alignment'));

  // Handle Kiwi Drive checkbox
  document.getElementById('omni-kiwiDrive').addEventListener('change', () => {
    clearError('omni-numMotors');
  });
});
