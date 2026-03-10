# Shopping List App

A simple mobile shopping list application built with React Native and Expo.  
The app allows users to manage shopping items, track quantities and prices, and organize items based on their status (pending or already in the cart).

---

## Description

This project is a mobile shopping list manager designed to help users organize and track items they plan to buy.

Users can:

- Add items with quantity, price, and unit of measure
- Mark items as collected or pending
- Filter items by status
- Search items by name
- Import and export shopping lists
- Track the estimated total value of the shopping list

The interface is designed to be simple and practical for quick list management.

---

## About

The application contains two main screens:

- **Home Screen**  
  Displays the shopping list, search field, filters, total price estimation, and controls to manage the list.

- **Item Form Screen**  
  Used to create or edit items with fields for name, quantity, price, unit type, and cart status.

Items in the list display quantity, price per unit, total price, and allow editing, deletion, or status toggling.

---

## Requirements

Before running this project, make sure you have installed:

- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn**
- **Expo CLI**
- **Git**
- A mobile device with **Expo Go** or an emulator

---

## Installation

### Windows

1. Clone the repository

2. Enter the project folder

```bash
cd app
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npx expo start
```

5. Run the app

- Press **a** to run on Android emulator or Scan the QR Code using **Expo Go**

---

### Linux

1. Clone the repository

2. Enter the project folder

```bash
cd app/
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npx expo start
```

5. Run the app

- Press **a** to run on Android emulator or scan the QR Code using **Expo Go**

---

## Usage Guide

1. Open the application.
2. Use the **Add Item** floating button to create a new item.
3. Fill in the item information such as name, quantity, price, and unit.
4. Save the item to add it to the list.
5. Use filters to display:
   - All items
   - Pending items
   - Collected items
6. Mark items as collected using the checkbox.
7. Use the search bar to quickly find items.
8. Export or import lists using the available buttons.

---

## Technologies

This project was built using:

- **React Native**
- **Expo**
- **Expo Router**
- **React Navigation**
- **React Native Paper**
- **Async Storage**

---

## License

This project is licensed under the MIT License.

You can view the full license here:

[MIT License](./LICENSE)