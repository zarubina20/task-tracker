# Task Tracker

A responsive single-page task tracker built with semantic HTML5, CSS3 and vanilla JavaScript.
No frameworks, no libraries, no templates.

**Live demo:** https://zarubina20.github.io/task-tracker/

## Features

- Add a task with one of three priority levels: Low, Medium or High
- Mark a task as completed
- Delete a task
- Filter tasks by All, Active or Completed
- See the number of active tasks at any time
- Tasks are stored in localStorage and remain after a page refresh
- Form validation: empty tasks cannot be submitted

## Additional features

- **Dark / light theme switcher.** The selected theme is saved in localStorage
  and restored on the next visit. Switching is implemented through a single
  `data-theme` attribute on the root element that overrides a set of CSS custom
  properties, so no duplicated styles are needed.
- **CSS animations.** New tasks appear with a short fade-in, and colour changes
  between themes are animated.
- **Colour-coded priorities.** Each task has a coloured left border matching its
  priority level.

## Tech stack

- Semantic HTML5
- CSS3 — custom properties, Flexbox, CSS Grid, media queries
- Vanilla JavaScript (ES6+) — no dependencies
- Manrope font from Google Fonts

## Responsive design

The layout is built mobile-first with two breakpoints:

| Screen | Behaviour |
| --- | --- |
| Mobile (< 640px) | Form fields stacked vertically |
| Tablet (≥ 640px) | Form fields in a single row |
| Desktop (≥ 1024px) | Wider spacing and larger typography |

## Project structure