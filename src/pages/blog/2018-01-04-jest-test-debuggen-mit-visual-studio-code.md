---
title: Jest Test debuggen mit Visual Studio Code
slug: jest-test-debuggen-mit-visual-studio-code
templateKey: blog-post
image: img/Jest-Test-debuggen-mit-Visual-Studio-Code.png
date: 2018-01-04T11:13:30.000Z
author: linus-huesler
description: >-
  In diesem Blogpost zeige ich dir, wie du in Visual Studio Code einen Jest Test
  debuggen kannst.
categories:
  - Softwareentwicklung
  - JavaScript
  - Qualitätssicherung
---

Unsere JavaScript Projekte testen wir in der Regel mittels <a href="https://facebook.github.io/jest/" target="_blank" rel="noopener">Jest</a>, eine Testbibliothek von Facebook. Als Code-Editor verwenden wir <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Visual Studio Code</a> von Microsoft.

Mit untenstehender Launch-Konfiguration kannst du Jest Tests in Visual Studio Code debuggen. Nachdem du sie zu deinen Launch-Konfigurationen hinzugefügt hast, kannst du den Jest Test selektieren und dann die Launch-Konfiguration starten. Alternativ kannst du auch die Datei, welche du testen möchtest selektieren. Jest sucht dann automatisch den dazugehörigen Test und führt diesen aus.

Eventuell musst du abhängig vom Projekt einen <em>preLaunchTask</em> hinzufügen. Gerade bei TypeScript Projekten muss vor dem Ausführen des Tests der Code in JavaScript transpiliert werden.

&nbsp;

Unsere Launch-Konfiguration sieht nun so aus:

```json
{
 "type": "node",
 "request": "launch",
 "name": "Debug Jest Test",
 "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
 "args": [
   "${fileDirname}/${fileBasenameNoExtension}",
   "--runInBand",
   "--no-cache",
   "--env=jsdom"
 ],
 "preLaunchTask": "npm: build:server",
 "envFile": "${workspaceRoot}/.env",
 "cwd": "${workspaceRoot}",
 "protocol": "inspector",
 "console": "integratedTerminal",
 "internalConsoleOptions": "neverOpen"
}
```
