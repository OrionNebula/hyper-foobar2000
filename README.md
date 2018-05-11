# hyper-foobar2000

[![License](https://img.shields.io/github/license/OrionNebula/hyper-foobar2000.svg)](LICENSE.md)
[![hyper](https://img.shields.io/badge/Hyper-v1.3.3-brightgreen.svg)](https://github.com/zeit/hyper/releases/tag/1.3.3)
[![GitHub issues](https://img.shields.io/github/issues/OrionNebula/hyper-foobar2000.svg)](https://github.com/OrionNebula/hyper-foobar2000/issues)

> foobar2000 plugin for [Hyper](https://hyper.is).
Displays the song currently playing in [foobar2000](https://www.foobar2000.org/) at the bottom of the terminal and allows you to control your favorite music.

Requires the [foo-httpcontrol](https://hydrogenaud.io/index.php/topic,62218.0.html) component to be installed, along with the [ajquery](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/) template.

## Installation

Simply add this plugin inside `~/.hyper.js` and enjoy your music :musical_note:

```js
module.exports = {
  ...
  plugins: ['hyper-foobar2000']
  ...
}
```

If you have trouble with the initial install, use yarn to install the package instead.

## Configuration

Because this plugin borrows so heavily from [hyper-spotify](https://github.com/panz3r/hyper-spotify), all of the same customization and configuration options will work here, plus some extras:

```js
hyperFoobar: {
  position: 'bottom',
  margin: 'default',
  controlsPosition: 'default',
  showArt: true, // If true, album art will appear in the bottom right corner.
  port: 8888 // The port foo-httpcontrol is hosting the interface on.
}
```
