# Figure Archive Design System

## Purpose

The Figure Archive Design System defines the visual language, reusable UI primitives and interaction rules used throughout the application.

Its purpose is to ensure consistency, accessibility and scalability across every screen.

The design prioritizes clarity over decoration and focuses on helping collectors manage large collections efficiently.

---

# Design Principles

The interface should always feel:

- Clean
- Fast
- Consistent
- Predictable
- Information-first

The application is a productivity tool rather than a marketing website.

Collectors may spend hours cataloging figures, therefore visual fatigue should be minimized.

---

# Visual Identity

Style

Modern.

Minimal.

Content-focused.

Inspired by:

- Discogs
- Letterboxd
- Brickset
- Notion
- Apple Human Interface Guidelines

Avoid:

- Heavy gradients
- Decorative animations
- Excessive shadows
- Visual noise

---

# Color Palette

Primary

Deep Blue

Used for:

- Primary buttons
- Navigation
- Links
- Active elements

Secondary

Neutral Gray

Used for:

- Borders
- Secondary buttons
- Disabled states

Success

Green

Used for:

- Saved changes
- Completed actions

Warning

Amber

Used for:

- Missing information
- Partial completeness

Danger

Red

Used for:

- Delete actions
- Errors

Background

Very Light Gray

Cards

White

---

# Typography

Primary Font

Inter

Fallback

System UI

Hierarchy

H1

Main page title

H2

Section title

H3

Card title

Body

General content

Caption

Metadata

Examples

Luke Skywalker

The Vintage Collection

Hasbro • 2010

---

# Spacing

Base spacing unit

8px

Common values

8

16

24

32

48

64

Margins and paddings should always follow this scale.

---

# Border Radius

Cards

12px

Buttons

10px

Inputs

10px

Dialogs

16px

---

# Elevation

Only three shadow levels.

Level 0

Flat

Level 1

Cards

Level 2

Dialogs

Avoid excessive elevation.

---

# Icons

Library

Angular Material Icons

Icons should always reinforce text.

Never replace labels.

---

# Buttons

Primary

Main actions

Examples

- Add Figure
- Save
- Login

Secondary

Alternative actions

Examples

- Cancel
- Back

Danger

Deletion

Ghost

Toolbar actions

Icon Button

Scanner

Search

Menu

---

# Inputs

Standard Text Field

Search Field

Select

Autocomplete

Date Picker

Currency Field

Numeric Field

Textarea

Validation is always inline.

---

# Cards

Cards are the fundamental building block.

Types

Figure Card

Owned Figure Card

Product Release Card

Collection Summary Card

Statistics Card

Cards are clickable.

Entire surface is interactive.

---

# Lists

Dense

Used for collections.

Comfortable

Used for administration.

---

# Tables

Only for:

Administration

Large datasets

Imports

Collectors should primarily interact with cards.

---

# Navigation

Desktop

Left navigation rail.

Tablet

Collapsible navigation.

Mobile

Bottom Navigation Bar.

---

# Dialogs

Used only when necessary.

Examples

Delete confirmation

Edit notes

Filters

Import

---

# Notifications

Snackbar

Small confirmations

Dialog

Important decisions

Inline Validation

Form errors

---

# Loading States

Skeleton loaders

Never show empty pages while loading.

---

# Empty States

Every empty state should explain:

Why nothing is shown.

How to solve it.

Example

"No figures found.

Try another search or add your first figure."

---

# Error States

Always explain:

What happened.

What the user can do next.

Avoid technical language.

---

# Accessibility

WCAG AA minimum.

Keyboard navigation supported.

Visible focus indicators.

Screen reader compatible.

Color never communicates information alone.

---

# Responsive Strategy

Desktop

Full navigation

Tablet

Adaptive layout

Mobile

Thumb-friendly navigation

Bottom actions

Single-column layouts

---

# Motion

Animations should be subtle.

Used only to improve comprehension.

Maximum duration

250 ms

Avoid decorative animations.

---

# Future Extensions

Dark Theme

Collector themes

Franchise themes

Accessibility themes

High contrast mode

Custom font scaling