---
title: React Komponenten mit Chrome Timeline analysieren
source: apptiva
slug: react-komponenten-mit-chrome-timeline-analysieren
templateKey: blog-post
image:
  src: /assets/blog/img/profiling.png
  base64Placeholder: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiElEQVR4nAF9AIL/AC5UXAA1V5+xucbFxbe5vbe5vLa5ur7AxABqk6cAEzh4h4/Gua/QyL7Wz8jLxcPFu7EAjKayNXiUu8C3qZRgq5RU49Ki9Ozb1MejAPT4+vH2+fz69PTs2/Hm0/Ts2f735v/77gDk4N+ksrmwvMTh4OHc3uDm5+nl5ufj4+ReQFgSqpA1WAAAAABJRU5ErkJggg==
  height: 1515
  width: 2271
date: 2016-11-16T21:01:42.000Z
author: linus-huesler
description: >-
  Heute ist Version 15.4.0 von React veröffentlicht worden. Mit der neuen
  Version können React Komponenten in der Chrome Timeline visualisiert werden.
  Damit lässt sich erkennen, welche Komponenten mounted, aktualisiert und
  unmounted werden und wie lange sie im Vergleich zu den anderen Komponenten
  brauchen.
categories:
  - Softwarearchitektur
  - React
  - Chrome
  - Profiling
  - JavaScript
  - Qualitätssicherung
---

Heute ist Version 15.4.0 von React veröffentlicht worden. Mit der neuen Version können React Komponenten in der Chrome Timeline visualisiert werden. Damit lässt sich erkennen, welche Komponenten mounted, aktualisiert und unmounted werden und wie lange sie im Vergleich zu den anderen Komponenten brauchen.

Ich will prüfen, ob ich mithilfe dieser neuen Visualisierung in unserem Botfabrik-Projekt ([www.botfabrik.ch](http://www.botfabrik.ch)) etwas auffälliges erkennen kann. Dazu aktualisiere ich zuerst die beiden Node Module <em>react</em> und <em>react-dom</em> auf Version 15.4.0. und starte dann die Applikation.

Um nun die Timeline in Chrome anschauen zu können, muss ich folgendes machen:

<ol>
  <li>Applikation im Chrome Browser mit Query-String <strong>?react_perf</strong> aufrufen (bei mir http://localhost:3000/?react_perf)</li>
  <li>Chrome DevTools Öffnen und im Tab <strong>Timeline</strong> die Aufzeichnung starten</li>
  <li>Nun kann ich die aufzuzeichnenden Aktionen ausführen. Ich frage Pit nach seinem Alter ("wie alt bist du?") und erhalte von ihm die Antwort "Ich bin noch jung".</li>
  <li>Aufzeichnung stoppen</li>
  <li>React Aktionen werden innerhalb der Gruppe <strong>User Timing</strong> gruppiert und können nun analysiert werden:</li>
</ol>
&nbsp;

![react-profiling](img/react-profiling.png)

&nbsp;

Was mir auffällt ist, dass nach dem Eintreffen einer neuen Chat-Nachricht die <em>Intro</em> Komponente aktualisiert wird. Dies macht keinen Sinn, da diese Komponente nur statischen Text anzeigt. Es gilt jetzt herauszufinden, warum das so ist. Gut Nacht :smile:

Linus Hüsler
