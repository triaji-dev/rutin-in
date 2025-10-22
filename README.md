# rutin.in - Habit Tracker

**Visualize Your Consistency**

A sleek, intuitive, and powerful habit tracker inspired by GitHub's contribution graph. Build lasting habits and track your progress with a visually motivating interface designed to keep you focused on what matters: showing up every day.

![rutin.in](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## ✨ Features

### 🎯 Core Functionality

- **Dual-View System**: Switch between Weekly and Overview modes instantly
- **Interactive Tracking**: Click any day to toggle completion status
- **Persistent Storage**: All data saved locally using localStorage
- **Drag & Drop**: Reorder habits by dragging cards
- **Bulk Operations**: Select multiple habits for batch actions

### 📊 View Modes

#### Weekly View

- **7-day focus**: Perfect for daily check-ins and short-term planning
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

## 🚀 Quick Start

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start tracking your habits immediately!

### First Use

1. Click "Add Activity" to create your first habit
2. Click on any day in Weekly view to mark completion
3. Toggle to Overview mode to see your progress pattern
4. Use the context menu (three dots) to customize colors and manage habits

## 💻 Technical Details

### Architecture

- **Pure JavaScript**: No frameworks or dependencies
- **ES6 Modules**: Modern JavaScript features
- **Local Storage**: Client-side data persistence
- **Responsive Design**: Mobile-first approach

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Structure

```javascript
{
  id: 'habit-1234567890',
  name: 'Exercise',
  completedDates: Set(['2025-01-15', '2025-01-16']),
  color: 'green'
}
```

### Key Technologies

- **HTML5**: Semantic markup and modern APIs
- **CSS3**: Flexbox, Grid, Backdrop Filter, Custom Properties
- **JavaScript ES6+**: Modules, Classes, Arrow Functions, Destructuring
- **Tailwind CSS**: Utility-first styling framework
- **Inter Font**: Clean, readable typography

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
