# rutin.in - Habit Tracker

**Visualize Your Consistency**

A sleek, intuitive, and powerful habit tracker inspired by GitHub's contribution graph. Build lasting habits and track your progress with a visually motivating interface designed to keep you focused on what matters: showing up every day.

![rutin.in](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-2.0.0-blue) ![Deployment](https://img.shields.io/badge/Deployment-Vercel-black) ![Database](https://img.shields.io/badge/Database-Supabase-green)

## ✨ Features

### 🎯 Core Functionality

- **Dual-View System**: Switch between Weekly and Overview modes instantly
- **Interactive Tracking**: Click any day to toggle completion status
- **Cloud Sync**: All data synchronized with Supabase database
- **User Authentication**: Secure login/signup with Supabase Auth
- **Multi-User Support**: Each user has their own private data
- **Drag & Drop**: Reorder habits by dragging cards
- **Bulk Operations**: Select multiple habits for batch actions
- **Real-time Updates**: Changes sync instantly across devices

### 📊 View Modes

#### Weekly View

- **Interactive circles**: Click to mark days as complete
- **Visual feedback**: Completed days show in your chosen color
- **Day labels**: Clear weekday abbreviations for easy navigation

#### Overview Mode

- **GitHub-style grid**: 18-week (126 days) contribution graph
- **Pattern visualization**: See your consistency patterns emerge
- **Motivation boost**: Visual representation of your commitment
- **Streak tracking**: Maintain momentum by not breaking the chain

### 🎨 Customization

- **10 Color Themes**: Green, Blue, Purple, Pink, Orange, Yellow, Teal, Red, Indigo, Gray
- **Glassmorphic Design**: Modern dark theme with subtle glass effects
- **Responsive Layout**: Optimized for mobile and desktop
- **Smooth Animations**: Polished transitions and hover effects

### 🔧 Management Tools

- **Add Activities**: Create new habits with one click
- **Edit Names**: Click habit names to rename them
- **Context Menu**: Right-click options for each habit
- **Bulk Selection**: Select multiple habits for batch operations
- **Delete Options**: Remove individual habits or clear all data
- **User Profile**: Manage account settings and preferences
- **Secure Logout**: Sign out with proper session cleanup

## 🚀 Quick Start

### Live Demo

Visit the live application at: **[rutin.in](https://rutin-in.vercel.app)**

### Installation

1. Clone or download this repository
2. Set up Supabase database (see [Deployment Guide](DEPLOYMENT.md))
3. Configure environment variables
4. Deploy to Vercel or run locally

### First Use

1. **Sign Up**: Create a new account with email and password
2. **Verify Email**: Check your email for verification link (if enabled)
3. **Sign In**: Login with your credentials
4. **Create Habits**: Click "Add Activity" to create your first habit
5. **Start Tracking**: Click on any day in Weekly view to mark completion
6. **Explore Views**: Toggle to Overview mode to see your progress pattern

## 💻 Technical Details

### Architecture

- **Frontend**: Pure JavaScript with modern ES6+ features
- **Backend**: Vercel Serverless Functions (Node.js)
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with JWT tokens
- **Deployment**: Vercel with automatic CI/CD
- **Styling**: Tailwind CSS with custom glassmorphic design

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Structure

```javascript
// User Object
{
  id: 'uuid',
  email: 'user@example.com',
  full_name: 'John Doe',
  avatar_url: 'https://...',
  created_at: '2025-01-15T10:30:00Z'
}

// Habit Object
{
  id: 'uuid',
  name: 'Exercise',
  color: 'green',
  completedDates: Set(['2025-01-15', '2025-01-16']),
  createdAt: '2025-01-15T10:30:00Z',
  updatedAt: '2025-01-15T10:30:00Z'
}

// API Response Format
{
  habits: [
    {
      id: 'uuid',
      name: 'Exercise',
      color: 'green',
      completed_dates: ['2025-01-15', '2025-01-16'],
      created_at: '2025-01-15T10:30:00Z',
      updated_at: '2025-01-15T10:30:00Z'
    }
  ]
}
```

### Key Technologies

- **Frontend**: HTML5, CSS3, JavaScript ES6+, Tailwind CSS
- **Backend**: Node.js, Vercel Serverless Functions
- **Database**: PostgreSQL (Supabase), Row Level Security
- **Authentication**: Supabase Auth, JWT tokens
- **Deployment**: Vercel, Git-based CI/CD
- **Styling**: Tailwind CSS, Glassmorphic design, Inter font

## 🎮 Usage Guide

### Creating Habits

1. Click the "+ Add Activity" button
2. The new habit appears with a random color
3. Click the habit name to rename it
4. Start tracking by clicking on days

### Tracking Progress

- **Weekly View**: Click day circles to toggle completion
- **Overview View**: Visual representation of your consistency
- **Color Coding**: Each habit has its own color theme
- **Real-time Updates**: Changes save automatically

### Managing Habits

- **Rename**: Click on the habit name
- **Change Color**: Use context menu → "Change Color"
- **Delete**: Use context menu → "Delete"
- **Reorder**: Drag and drop cards to rearrange

### Bulk Operations

1. Right-click any habit → "Select Mode"
2. Click habits to select them (blue border indicates selection)
3. Use bulk action buttons:
   - **Change Color**: Apply color to all selected habits
   - **Delete**: Remove all selected habits
   - **Select All**: Select all habits at once
   - **Unselect All**: Clear selection
   - **Exit Select Mode**: Return to normal view

## 🔧 Development

### Project Structure

```
rutin-in/
├── index.html          # Main application file
├── README.md           # This documentation
└── temp/               # Development files
    ├── mockup1.html    # Initial prototype
    ├── mockup2.html    # Enhanced version
    ├── mockup3.html    # Final mockup
    └── prompt.md       # Development prompts
```

### Local Development

1. Open `index.html` in your browser
2. Use browser dev tools for debugging
3. Data persists in localStorage
4. No build process required

### Customization

- **Colors**: Modify `COLOR_SETS` object in JavaScript
- **Styling**: Edit CSS variables and Tailwind classes
- **Features**: Extend functionality by modifying the JavaScript modules

## 📱 Mobile Experience

- **Touch-friendly**: Optimized for mobile interactions
- **Responsive Design**: Adapts to all screen sizes
- **Gesture Support**: Tap to interact, drag to reorder
- **Offline Ready**: Works without internet connection

## 🎯 Design Philosophy

### Minimalism

- Clean, uncluttered interface
- Focus on essential features
- Reduce cognitive load

### Motivation

- Visual progress representation
- Gamification through streaks
- Immediate feedback on actions

### Accessibility

- High contrast colors
- Clear visual hierarchy
- Keyboard navigation support

## 🔮 Future Enhancements

- **Data Export**: Export habits to CSV/JSON
- **Statistics**: Detailed analytics and insights
- **Themes**: Additional color schemes and layouts
- **Notifications**: Reminder system
- **Sync**: Cloud backup and multi-device sync
- **Social**: Share progress with friends

## 📄 License

This project does not currently have a license file. Please contact the author for licensing information.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---
