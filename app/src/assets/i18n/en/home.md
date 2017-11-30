# Welcome

This Ringa JS Application Template is designed as a starting point to building a SPA using:

* React
* Ringa JS ([ringa](http://www.ringajs.com/ringa-js/ringa))
* React Ringa Plugin ([react-ringa](http://www.ringajs.com/ringa-js/react-ringa))
* Ringa JS Component Library ([ringa-fw-react](http://www.ringajs.com/ringa-js/ringa-fw-react))

[Click here for documentation and a demonstration of all components available to you.](http://react.ringajs.com/)

# Tiny

This template starts out at only **193kb gzipped** with all library components included and
ready to go.

# Features

1. Integrated `BUILD_INFO` into the build (see the version in `Footer.jsx` for example)
    * Automatically updates every time you run
    * Information is output in the browser console on run for easy debugging
2. NPM Build Scripts
    * `start`: run a local development instance at `http://localhost:8080`
    * `prod`: run a full production build, minified with CSS extracted, into `dist`
    * `analyze`: run Webpack `BundleAnalyzerPlugin` on the production build
3. Internationalization
    * Built in internationalization ready to go so that you can get easily expand your application to a larger audience
4. Debugging Inspector
    * Built-in debug inspector to help you figure out how the application is constructed
    * Shows attached Controllers
    * Shows which Models are attached to which controllers
    * Hold down ALT+SHIFT and move the mouse around the screen to inspect components

# Getting Started

* Entry point: `app/src/index.js`
* Internationalization Setup: `app/src/i18n.js`
* Layout: `app/src/layout/ApplicationLayout.jsx`