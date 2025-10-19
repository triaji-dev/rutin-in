# Habit Tracker Application - AI Prompts

## 1. AI Prompt for HTML Structure

**Goal:** To generate the basic HTML skeleton for the habit tracker cards.

Generate the HTML structure for a habit tracker application. The structure should include:

1. A main `div` with a class of `card-container` that will hold all the habit cards.

2. Inside the container, create three identical `article` elements, each with a class of `task-card`.

3. Each `task-card` must contain:
   
   a. A `header` with a class of `card-header`. Inside the header, include:
      - A `div` for the title, containing an SVG icon for a task/checkbox and a `span` with the text "Task Name".
      - A `button` with a class of `options-btn` containing an SVG icon for "more options" (three horizontal dots).
   
   b. A `div` with a class of `card-body`. Inside this body, create two distinct views that can be toggled later with CSS/JS:
      
      i. A `div` with a class of `weekly-view`. This view should contain:
         - A list of day abbreviations (Mon, Tue, Wed, Thu, Fri, Sat, Sun).
         - A corresponding list of 7 circular `div` elements, each with a class of `date-circle`. Place a sample date number (e.g., 20, 21, 22...) inside each circle.
      
      ii. A `div` with a class of `overview-view`. This view should contain a grid of small squares. For demonstration, create a 7x20 grid of `div` elements, each with a class of `grid-square`.

Make sure the HTML is semantic and the class names are clear for styling.

---

## 2. AI Prompt for CSS Styling

**Goal:** To style the HTML structure with a modern, dark, glassmorphic theme inspired by the image.

Generate the CSS code for the habit tracker component using the previously defined HTML structure. Implement the following design requirements:

1. **Overall Theme:** Create a dark theme. The `body` should have a very dark gray or black background (`#121212`).

2. **Card Container:** Use Flexbox or Grid to center the `card-container` on the page and arrange the cards vertically with a `gap` between them.

3. **Task Card Styling:**
   - Give `.task-card` a semi-transparent dark background color (e.g., `rgba(40, 40, 40, 0.7)`).
   - Apply a `backdrop-filter: blur(15px);` to create a glassmorphic effect.
   - Add a subtle, light gray border (e.g., `1px solid rgba(255, 255, 255, 0.1)`).
   - Use a generous `border-radius` (e.g., `16px`) for rounded corners.
   - Add `padding` for internal spacing.

4. **Card Header:** Use Flexbox with `justify-content: space-between` and `align-items: center` for the header elements. The text and SVG icons should be a light color.

5. **View Visibility:** By default, the `.weekly-view` should be visible, and the `.overview-view` should be hidden (`display: none`). Create a modifier class, `.is-overview-mode`, which when added to `.task-card`, hides the `.weekly-view` and shows the `.overview-view`.

6. **Weekly View Styling:**
   - Style the `.date-circle` to be perfectly circular with a border. Use Flexbox to center the number inside.
   - Add a `:hover` state to the circles to indicate interactivity.
   - Create a `.completed` class that fills the circle's background with a vibrant color (e.g., a shade of green like `#39d353`) and removes the border.

7. **Overview View Styling:**
   - Use CSS Grid to lay out the `.grid-square` elements.
   - The squares should be small, with a light gray background color for the default/empty state.
   - Create 4 modifier classes for activity levels, similar to GitHub:
     - `.level-1` (light green)
     - `.level-2` (medium green)
     - `.level-3` (darker green)
     - `.level-4` (darkest green)
   - Add a subtle `border-radius` to the squares.

Ensure the styling is clean and modern.

---

## 3. AI Prompt for TypeScript Logic

**Goal:** To add interactivity for toggling views and marking habits as complete.

Generate the TypeScript code to add interactivity to the habit tracker component. Do not use any external frameworks (e.g., React, Angular), only plain TypeScript for DOM manipulation. The script should perform the following actions:

1. **Data Structure:** Define a simple `interface` or `type` called `Habit` that includes `id` (string), `name` (string), and `completedDates` (a `Set<string>` to store dates in "YYYY-MM-DD" format).

2. **State Management:** Create a sample array of `Habit` objects to act as the application's state.

3. **Initialization:** On script load, select all `.task-card` elements from the DOM. For each card, perform the following:
   
   a. **Render Function:** Create a `render(habitData)` function that updates the UI of a single card based on the habit's data. This function should iterate through the date circles and grid squares, applying the `.completed` or `.level-x` classes if their corresponding date is in the `completedDates` set.
   
   b. **View Toggle Logic:** Add a click event listener to the `.options-btn`. When clicked, it should toggle the `.is-overview-mode` class on its parent `.task-card` element.
   
   c. **Completion Logic:** Add click event listeners to all `.date-circle` and `.grid-square` elements. When an element is clicked:
      
      i. Determine its corresponding date (you can use a `data-date` attribute in the HTML for this).
      
      ii. Update the `completedDates` set in the corresponding `Habit` object (add the date if it's not there, remove it if it is).
      
      iii. Call the `render` function again to update the UI with the new state.
