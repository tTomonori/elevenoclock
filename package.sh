#!/bin/bash
appname="11o'clock"
electron-packager ./ $appname --platform=darwin --icon=image/icon.icns
rm -r $appname-darwin-x64/$appname.app/Contents/Resources/app/node_modules
cp -r node_modules $appname-darwin-x64/$appname.app/Contents/Resources/app/node_modules
