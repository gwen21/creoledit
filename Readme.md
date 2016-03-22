CreolEdit
==========

CreolEdit stands for Creole Editor, a Creole XML dictionary editor.

Install
---------

First, clone the [CreolEdit](https://forge.cadoles.com/gremond/CreolEdit)
repository and checkout the `develop` branch (sorry, there's no release yet).

After that, launch `npm install`, then `npm run build` it will generate a 
javascript bundle.

Usage
-------

Open the `index.html` file in a browser, then go to the `creoledit/index.html#/upload`
url in order to load a Creole XML file. If you don't have one, a creole XML file
is available in the `creoledit/data` project's directory.
Drag and drop this file in the grey rectangular area : you dictionary is loaded.

You can then list the files at the `creoledit/index.html#/` url
