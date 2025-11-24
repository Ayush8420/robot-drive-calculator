# Robot Motor Calculator

A Progressive Web App (PWA) for calculating motor requirements for robotics applications. Supports both Mecanum and Omni wheel configurations with offline functionality.

## Features

### 🎯 Wheel Type Support
- **Mecanum Wheels**: Standard 4-wheel mecanum drive calculations
- **Omni Wheels**: Configurable alignment angles and Kiwi Drive support

### 📊 Calculations
- Required RPM (Revolutions Per Minute)
- Minimum torque per motor (with safety factor)
- Force calculations (friction, acceleration, total tractive force)
- Detailed torque breakdown

### 🔧 Configuration Options

#### Mecanum Wheels
- Total mass (kg)
- Maximum velocity (m/s)
- Wheel diameter (mm)
- Acceleration time (s)
- Number of motors

#### Omni Wheels
All Mecanum options plus:
- **Wheel Alignment**: 0° (straight) or 45° (diagonal)
- **Kiwi Drive Mode**: 3-wheel configuration where only 2 motors work at a time

### 💾 PWA Features
- **Offline Access**: Works without internet after first visit
- **Installable**: Can be installed on desktop and mobile devices
- **Responsive Design**: Optimized for all screen sizes
- **Fast Loading**: Cached resources for instant access

## Installation

### Local Setup

1. **Clone or download** the repository:
```bash
git clone <repository-url>
cd robot-motor-calculator
```

2. **File Structure**:
```
robot-motor-calculator/
├── index.html          # Main HTML structure
├── styles.css          # All styling
├── calculator.js       # Core calculation logic
├── dom-events.js       # DOM manipulation & event handlers
├── pwa.js             # PWA installation logic
├── service-worker.js   # Service worker for offline functionality
├── manifest.json       # PWA manifest configuration
└── README.md          # This file
```

3. **Serve the application**:

   The app requires a local server to enable PWA features. Choose one:

   **Option A - Python**:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B - Node.js**:
   ```bash
   npx http-server -p 8000
   ```

   **Option C - VS Code**:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

4. **Access the app**:
   - Open browser to `http://localhost:8000`

### Installing as PWA

#### Desktop (Chrome/Edge)
1. Open the app in your browser
2. Click the install icon (⊕) in the address bar
3. Click "Install"

#### Mobile (Chrome/Safari)
1. Open the app in your browser
2. Tap the browser menu (⋮ or share icon)
3. Select "Add to Home Screen" or "Install"

## Usage

### Mecanum Wheels

1. Select the **Mecanum Wheels** tab
2. Enter the following parameters:
   - Total Mass: Weight of the robot in kg
   - Maximum Velocity: Desired top speed in m/s
   - Wheel Diameter: Diameter in millimeters
   - Acceleration Time: Time to reach max velocity in seconds
   - Number of Motors: Typically 4 for mecanum drives
3. Click **Calculate Motor Requirements**
4. Review the results:
   - Required RPM for your motors
   - Minimum torque per motor (includes 1.5x safety factor)
   - Detailed force and torque breakdown

### Omni Wheels

1. Select the **Omni Wheels** tab
2. Enter basic parameters (same as Mecanum)
3. Configure omni-specific settings:
   - **Wheel Alignment**: 
     - 0° for straight/perpendicular alignment
     - 45° for diagonal alignment
   - **Kiwi Drive**: Check this if using a 3-wheel configuration
     - Automatically adjusts calculations for 2 active motors
     - Validates that exactly 3 motors are specified
4. Click **Calculate Motor Requirements**
5. Review results including alignment factor and drive configuration

## Formulas

### Constants
- **Gravity (g)**: 9.8 m/s²
- **Friction Coefficient (μ)**: 0.04
- **Efficiency (η)**: 0.8 (80%)
- **Safety Factor**: 1.5 (150%)

### Mecanum Wheels

**RPM Calculation**:
```
RPM = (v_max × 60) / (π × wheel_diameter)
```

**Force Calculations**:
```
Friction Force = mass × μ × g
Acceleration Force = mass × (v_max / accel_time)
Total Force = Friction Force + Acceleration Force
```

**Torque Calculations**:
```
Total Torque = Total Force × wheel_radius
Torque per Motor = Total Torque / (num_motors × η)
Final Torque = Safety Factor × Torque per Motor
```

### Omni Wheels

**Modified RPM Calculation**:
```
RPM = (v_max × cos(θ) × 60) / (π × wheel_diameter)
```

**Modified Acceleration Force**:
```
Acceleration Force = mass × (v_max × cos(θ) / accel_time)
```

Where θ is the alignment angle (0° or 45°)

**Kiwi Drive Adjustment**:
```
Effective Motors = 2 (regardless of input)
Torque per Motor = Total Torque / (2 × η)
```

## Technical Details

### Architecture

**Modular Design**: Code is separated by concern for maintainability

- **index.html**: Structure and markup
- **styles.css**: Visual design and responsive layouts
- **calculator.js**: Pure calculation functions
- **dom-events.js**: UI interactions and event handling
- **pwa.js**: Progressive Web App features
- **service-worker.js**: Offline caching and resource management
- **manifest.json**: PWA metadata

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with PWA support

### Offline Functionality

The service worker caches all resources on first load:
- HTML, CSS, and JavaScript files
- Calculations work entirely offline
- No backend server required

## Customization

### Modifying Constants

Edit the `CONSTANTS` object in `calculator.js`:

```javascript
const CONSTANTS = {
  g: 9.8,           // Gravity (m/s²)
  mu: 0.04,         // Coefficient of friction
  eta: 0.8,         // Efficiency
  safetyFactor: 1.5 // Safety factor
};
```

### Adding New Wheel Types

1. Add new tab button in `index.html`
2. Create tab content section with input fields
3. Add validation function in `calculator.js`
4. Add calculation function in `calculator.js`
5. Add event handlers in `dom-events.js`
6. Update styles in `styles.css`

### Styling

Modify `styles.css` to change:
- Color scheme (search for color values)
- Layout breakpoints (media queries)
- Animations and transitions
- Typography

## Troubleshooting

### PWA Not Installing
- Ensure you're using HTTPS or localhost
- Check browser console for service worker errors
- Clear browser cache and reload

### Calculations Seem Wrong
- Verify input units (kg, m/s, mm, seconds)
- Check that constants match your robot's specifications
- For Kiwi Drive, ensure exactly 3 motors are specified

### Offline Not Working
- Visit the app online at least once
- Check browser console for service worker status
- Ensure browser supports service workers

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Test** thoroughly on multiple devices
4. **Maintain** the modular architecture
5. **Document** any formula changes
6. **Submit** a pull request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Acknowledgments

- Physics formulas based on standard robotics kinematics
- Design inspired by modern web app patterns
- Built with vanilla JavaScript for maximum compatibility

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review calculation formulas

## Version History

### v1.0.0 (Current)
- Initial release
- Mecanum wheel support
- Omni wheel support with alignment angles
- Kiwi Drive configuration
- PWA functionality
- Offline support
- Responsive design

---

**Made with ⚙️ for robotics enthusiasts**
