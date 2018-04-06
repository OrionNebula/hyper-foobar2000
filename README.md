[![License](https://img.shields.io/github/license/OrionNebula/hyper-foobar2000.svg)](LICENSE.md)
[![hyper](https://img.shields.io/badge/Hyper-v1.3.3-brightgreen.svg)](https://github.com/zeit/hyper/releases/tag/1.3.3)
[![GitHub issues](https://img.shields.io/github/issues/OrionNebula/hyper-foobar2000.svg)](https://github.com/OrionNebula/hyper-foobar2000/issues)


> foobar2000 plugin for [Hyper](https://hyper.is). <br>
Displays the song currently playing in [foobar2000](https://www.foobar2000.org/) at the bottom of the terminal and allows you to control your favourite music. <br>
Requires the [COM Automation Server](https://hydrogenaud.io/index.php/topic,39946.0.html) component to be installed.

## Installation
Simply add this plugin inside `~/.hyper.js` and enjoy your music :musical_note:
```js
module.exports = {
  ...
  plugins: ['hyper-foobar2000']
  ...
}
```

Make sure to execute the following after installing the package:
```bash
    $ ./node_modules/.bin/electron-rebuild
```

This will makes sure the required native binaries are compiled with the right version of NodeJs.

## Configuration

Because this plugin borrows so heavily from [hyper-spotify](https://github.com/panz3r/hyper-spotify), all of the same customization and configuration options will work here.
