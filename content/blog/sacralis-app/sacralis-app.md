---
title: sacralis - nun mit Push-Notifikationen
source: apptiva
slug: sacralis-app
templateKey: blog-post
image: sacralis.png
date: 2018-12-24
author: Markus Tanner
description: >-
  Für hbTec durften wir eine neue Version der App sacralis umsetzen. Nun unterstützt die App auch Push-Notifikationen.
categories:
  - Allgemein
---

Mit sacralis erhält man eine einfache, mobile und übersichtliche Darstellung der gesamten technischen Einrichtungen in der Kirche. Dazu gehören Heizung, Lüftung, Licht, Zutritt, Überwachung u.v.m..

Die neue Version dieser App beinhaltet eine Vielzahl von Verbesserungen und Erweiterungen. Drei davon möchten wir an dieser Stelle hervorheben.

## Push

Neu kann die App Push-Nachrichten erhalten. Wenn beispielsweise in einer Kirche ein Fenster geöffnet ist, welches eigentlich geschlossen sein sollte, können via Push-Notifikation die entsprechenden Personen informiert werden. Den Versand der Notifikationen haben wir mit [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) umgesetzt. Wir haben damit sehr gute Erfahrungen gemacht.

## Simple Konfiguration

Die Einstellungen können ganz gewöhnlich manuell auf einer Seite vorgenommen werden. Es besteht aber auch die Möglichkeit, einen Link aufzurufen, welcher die App mit den gewünschten Konfigurationsparametern öffnet. So kann beispielsweise die Konfiguration mittels QR-Code eingelesen werden. Damit lassen sich Tippfehler vermeiden, und einfaches Switchen zwischen Konfigurationen passiert im Handumdrehen.

## Android

Diese App war bis anhin nur für Apple-Geräte verfügbar. Mit der neuen Version ändert sich das nun. Ab sofort ist die sacralis App auch im [Play Store](https://play.google.com/store/apps/details?id=ch.sacralis) verfügbar.
Dank dem Einsatz von [React Native](https://facebook.github.io/react-native/) hielt sich der Aufwand für die Erstellung einer Android-Variante absolut in Grenzen.

... und wenn wir schon beim Thema "Kirchen" sind: Merry Xmas! 🎄
