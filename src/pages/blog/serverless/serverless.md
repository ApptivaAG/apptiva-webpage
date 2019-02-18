---
title: Serverless Apps
path: serverless
templateKey: blog-post
image: apptiva-lambda.png
date: 2019-02-18
author: Roman Schaller, Philip Schönholzer
description: >-
  Wir haben unser erstes Projekt mit Severless-Technologien umgesetzt. Folgende Erfahrungen haben wir damit gesammelt.
categories:
  - Allgemein
---

# Unser Szenario

Für einen Kunden durften wir die Lokalisierung von iPad-Geräten in der Schweiz umsetzen. Die Aufgabe war, die Geräte zu lokalisieren und den Verlauf in der internen MS-SQL-Datenbank zu speichern. Dort werden die Daten für weitere interne Zwecke weiterverarbeitet.

Die iPads sind meistens nur morgens und abends online. Die MS-SQL-Datenbank hat keine explizite Verfügbarkeit. Es gilt also "best effort".

# Lösungsansatz

Sobald die Geräte online sind, schicken wir die gesammelten Daten an eine Serverless-Funktion. Diese nimmt alles entgegen und speichert es in der Amazon-Cloud.

Eine weitere, regelmässig als Job ausgeführte Funktion nimmt die Daten, und versucht diese an die MS-SQL-Datenbank zu schicken. Sobald das erfolgreich war, werden die übermittelten Daten gelöscht.

&nbsp;

> ## Was heisst Serverless
>
> Als Serverless werden Anwendungsarchitekturen bezeichnet, bei denen die Server-Infrastruktur komplett vom Cloud-Anbieter gepflegt wird und die Anwendungsentwickler sich ausschliesslich auf die Anwendungslogik konzentrieren können. In diesem Sinne gibt es natürlich irgendwo Server, die betrieben werden müssen. Der Cloud-Anbieter übernimmt aber die ganze Administration.
>
> ### Die Vorteile von Serverless
>
> - **Kaum Wartungsaufwand**  
>   Mit diesem Ansatz müssen wir uns um keine Infrastruktur kümmern. Wir betreiben keinen Server.
>
> - **Kaum Kosten**  
>   Wenn keine Daten anstehen, laufen unsere Funktionen nicht und brauchen weder Rechenleistung noch Arbeitsspeicher. Dadurch entstehen nur Kosten, wenn Daten von A nach B übermittelt werden. Mit einigen duzend Geräten bezahlen wir monatlich deutlich weniger als 10 Franken.

# Unser Fazit

Für unser durchaus bescheidenes Szenario hat sich der Einsatz der Serverless-Architektur gelohnt. Die Anwendung ist extrem leichtgewichtig und der entstandene Code sehr kompakt. Im Betrieb haben wir bislang keinerlei Probleme festgestellt. Die AWS-Cloud bietet zudem ein riesiges Portfolio an weiteren Diensten, die wir ebenfalls anbinden können, um auch komplexere Szenarien abzudecken.

Wir werden diesen Ansatz für weitere Projekte im Auge behalten und freuen uns bei passenden Einsatzgebieten wieder eine Serverless-Architektur anzuwenden.
