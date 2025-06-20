# FL-IHU  - Device Testing & Management Interface

A modern, responsive web application for managing and monitoring network devices. Built with React, TypeScript, and Tailwind CSS, this application provides a comprehensive interface for device administration, network configuration, and real-time status monitoring.

## 🚀 Features

### 🔐 Authentication System
- Secure login interface with persistent authentication
- Session management with localStorage
- Automatic session restoration on page refresh
- Clean logout functionality

### 📊 Administration 
- Quick action buttons for common tasks


### 🌐 Network Settings
- WiFi configuration management
- DHCP and static IP configuration
- DNS server settings
- Gateway and subnet mask configuration
- Auto APN settings

### 📱 Device Status
- Comprehensive device information display
- Hardware specifications and firmware details
- MAC address and network information
- Real-time system metrics with progress bars

### 🎨 Modern UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Modern gradient backgrounds and card layouts
- Smooth animations and micro-interactions
- Collapsible sidebar navigation
- Mobile-optimized interface
- Professional color scheme with status indicators

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint with TypeScript support
- **Development**: Hot Module Replacement (HMR)

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd networkpro-device-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/
│   ├── DeviceStatus.tsx     # Main dashboard with system controls
│   ├── NetworkSettings.tsx   # Device information and metrics
│   ├── LoginScreen.tsx       # Authentication interface
│   ├──AdminDashboard.tsx     # Network configuration panel
│   ├── Sidebar.tsx           # Navigation sidebar component
│   └── Navigation.tsx        # Legacy navigation component
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles and Tailwind imports
└── vite-env.d.ts             # Vite type definitions
```

## 🎯 Component Overview

### AdminDashboard
- **Purpose**: Central control panel for device management
- **Features**: System metrics, control buttons, activity log, quick actions
- **Key Metrics**: CPU usage, memory consumption, network status, security status

### NetworkSettings
- **Purpose**: Network configuration and connectivity management
- **Features**: WiFi setup, IP configuration, DNS settings, connection monitoring
- **Configuration Options**: DHCP/Static IP, Gateway settings, APN configuration

### DeviceStatus
- **Purpose**: Hardware information and real-time monitoring
- **Features**: Device specifications, firmware details, system metrics
- **Monitoring**: Temperature, uptime, resource usage with live updates

### LoginScreen
- **Purpose**: Secure authentication gateway
- **Features**: Username/password authentication, session persistence
- **Security**: Form validation, loading states, secure session management

### Sidebar
- **Purpose**: Main navigation interface
- **Features**: Responsive design, mobile-friendly, status indicators
- **Navigation**: Dashboard, Network Settings, Device Status sections

## 🔧 Configuration

### Environment Setup
The application uses Vite for development and building. Configuration files:

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules and settings

### Customization Options

#### Styling
- Modify `tailwind.config.js` to customize the design system
- Update color schemes in component files
- Adjust responsive breakpoints and spacing

#### Device Data
- Update device information in `DeviceStatus.tsx`
- Modify network settings defaults in `NetworkSettings.tsx`
- Customize system metrics in `AdminDashboard.tsx`

## 📱 Responsive Design

The application is fully responsive across all device sizes:

- **Mobile (< 768px)**: Collapsible sidebar, stacked layouts, touch-friendly controls
- **Tablet (768px - 1024px)**: Optimized grid layouts, balanced spacing
- **Desktop (> 1024px)**: Full sidebar, multi-column layouts, enhanced interactions

## 🚀 Build and Deployment

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint checks
```

### Production Build
```bash
npm run build        # Create production build
npm run preview      # Preview production build locally
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Cloudflare
- **Self-hosted**: Any web server capable of serving static files

## 🔒 Security Features

- **Authentication**: Secure login with session management
- **Data Persistence**: Safe localStorage usage for session data
- **Input Validation**: Form validation and sanitization
- **Secure Defaults**: HTTPS-ready configuration

## 🎨 Design System

### Color Palette
- **Primary**: Teal (500-600) for main actions
- **Secondary**: Blue (500-600) for secondary actions
- **Success**: Green (400-600) for positive states
- **Warning**: Orange (400-600) for caution states
- **Error**: Red (400-600) for error states
- **Neutral**: Gray (50-900) for text and backgrounds

### Typography
- **Headings**: Bold weights (600-900)
- **Body Text**: Regular weight (400-500)
- **Captions**: Light weight (300-400)

### Spacing System
- Based on 8px grid system
- Consistent padding and margins
- Responsive spacing adjustments

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login/logout functionality
- [ ] Responsive design across devices
- [ ] Navigation between sections
- [ ] Form submissions and validations
- [ ] Real-time data updates
- [ ] Session persistence after refresh

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation for common solutions
- Review the component code for implementation details

## 🔄 Version History

- **v1.0.0** - Initial release with core functionality
  - Authentication system
  - Dashboard with system monitoring
  - Network configuration interface
  - Device status monitoring
  - Responsive design implementation

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**