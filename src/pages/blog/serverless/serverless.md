---
title: Serverless Apps
path: serverless
templateKey: blog-post
image: pwa-app-transparent.png
date: 2019-02-18
author: Roman Schaller
description: >-
  Wir haben unser erstes Projekt mit Severless-Technologien umgesetzt. Diese Erfahrungen haben wir damit gemacht.
categories:
  - Allgemein
---

# Unser Szenario

Für einen Kunden durften wir die Lokalisierung von iPad-Geräten in der Schweiz umsetzen. Die Aufgabe war, die Geräte
zu lokalisieren und den Verlauf in der internen MS-SQL-Datenbank zu speichern. Dort werden die Daten für weitere 
interne Zwecke weiterverarbeitet.

Die iPads sind meistens nur morgens und abends online. Die MS-SQL-Datenbank hat keine explizite Verfügbarkeit. Es
gilt also "best effort".

# Lösungsansatz

Sobald die Geräte online sind, schicken wir die gesammelten Daten an eine Serverless-Funktion. Diese nimmt alles entgegen und speichert es in der Amazon-Cloud.

Eine weitere regelmässig als Job ausgeführte Funktion nimmt die Daten wiederum, und versucht sie an die MS-SQL-Datenbank zu schicken. Sobald das erfolgreich war, werden die übermittelten Daten gelöscht.

# Was heisst Serverless?

Als Serverless werden Anwendungsarchitekturen bezeichnet, bei denen die Server-Infrastruktur komplett vom Cloud-Anbieter gepflegt wird und die Anwendungsentwickler sich ausschliesslich auf die Anwendungslogik konzentrieren können.
In diesem Sinne gibt es natürlich irgendwo Server, die betrieben werden müssen. Der Cloud-Anbieter übernimmt aber die ganze Administration.

# Die Vorteile dieser Architektur

## Kaum Wartungsaufwand
Mit diesem Ansatz müssen wir uns um keine Infrastruktur kümmern. Wir betreiben keinen Server. 

## Kaum Kosten
Wenn keine Daten anstehen, laufen unsere Funktionen nicht und brauchen weder Rechenleistung noch Arbeitsspeicher. Dadurch entstehen nur Kosten, wenn Daten von A nach B übermittelt werden. Mit einigen duzend Geräten bezahlen wir monatlich deutlich unter 10 Franken.

# Unser Fazit
