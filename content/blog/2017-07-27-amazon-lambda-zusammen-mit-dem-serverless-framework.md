---
title: Amazon Lambda zusammen mit dem Serverless Framework
slug: amazon-lambda-zusammen-mit-dem-serverless-framework
templateKey: blog-post
image: img/serverless-application-development.jpg
date: 2017-07-27T13:31:48.000Z
author: linus-huesler
description: >-
  Serverless Applikationen erleichtern die Entwicklung von kostgünstigen und
  skalierbaren Applikationen enorm. Dieser Blogpost zeigt wie das geht.
categories:
  - Softwarearchitektur
---

In unserer <a href="https://www.botfabrik.ch" target="_blank" rel="noopener">Botfabrik</a> haben wir diverse Bots entwickelt, die nur bei bestimmten Ereignissen ihre Arbeit verrichten. Solche Ereignisse können z.B. das Aufrufen eines Webhooks aus einer Instant-Messaging-Anwendung heraus sein (z.B. Facebook Messenger oder Slack), oder aber auch fix hinterlegte Intervalle (z.B. täglich um 18 Uhr, alle 5 Minuten, etc.). Für Funktionen die nur bei bestimmten Ereignissen ausgeführt werden müssen, eignet sich eine sogenannte "Serverless Applikation" bestens. In diesem Blogpost zeige anhand eines einfachen Beispiels wie eine solche Applikation implementiert werden kann.

<h2>Einführung</h2>
AWS Lambda ist ein Managed Service für Serverless Applikation von Amazon. Als Anwender bezieht man diesen Dienst ohne sich um die Hardware oder das Betriebssystem kümmern zu müssen und man bezahlt nur die Zeitdauer in der eine Funktion ausgeführt wird. AWS Lambda lässt sich beliebig skalieren, sodass es sich für einfache Übungsbeispiele aber auch für echte Geschäftslösungen eignet.

Das <a href="https://serverless.com/" target="_blank" rel="noopener">Serverless Framework</a> hilft einem beim Erstellen und Verwalten von Serverless Applikationen. Alle AWS- und Applikationseinstellungen werden in einer serverless.yml Datei vorgenommen und können daher in einem Source Code Verwaltungssystem versioniert abgelegt werden. Mithilfe des Kommandozeilenprogramms können Applikationen einfach packetiert und auf AWS deployed werden.

<h2>Beispiel Applikation</h2>
In diesem Beispiel erstellen wir eine einfache Lambda Funktion die jede Minute ausgeführt wird und eine Meldung ins Log schreibt. Diese Funktion deployen wir mit Hilfe des Serverless Frameworks auf AWS Lambda.
<h3>Voraussetzungen</h3>
Damit dieses Beispiel funktioniert, musst du Node installiert haben (z.B. mit <code>brew install node</code>) und du musst einen Account bei Amazon Web Services haben.
<h3>1. Serverless installieren</h3>
Das Serverless Framework ist ein NPM Modul. Du kannst es wie folgt installieren:

`npm install -g serverless

<h3>2. Beispielprojekt</h3>
Für unser Beispiel brauchst du zwei Dateien:
<div><strong>handler.js: </strong>Diese Datei enhält den Lambda Code</div>

```javascript
'use strict';
module.exports.run = (event, context) =&gt; {
 const time = new Date();
 console.log(`Your cron function "${context.functionName}" ran at ${time}. Yea!`);
};
```

<strong>serverless.yml: </strong>Dies ist die Serverless Konfiguration

```yml
provider:
 name: aws
 runtime: nodejs4.3
functions:
 cron:
   handler: handler.run
   events:
     # Führe die Lambda Funktion jede Minute aus
     - schedule: rate(1 minute)
```

Du kannst nun die erstellte Lambda Funktion bereits lokal ausführen:

`serverless invoke local -f cron`

Als Resultat solltest du folgende Ausgabe erhalten:

`Your cron function "apptiva-demo-service" ran at Thu Jul 27 2017 11:42:03 GMT+0200 (CEST). Yea!`

### 3. AWS Service Account einrichten

Damit das Serverless Framework Zugriff auf deinen AWS Account hat, erstellen wir bei AWS einen IAM Benutzer mit Admin Berechtigung. Dieser Benutzer kann den Lamdba Service innerhalb deines AWS Accounts konfigurieren.

<ul>
 	<li>Melde dich bei Amazon Web Services an: <a href="https://console.aws.amazon.com" target="_blank" rel="noopener">https://console.aws.amazon.com</a></li>
 	<li>Gehe zur "Identity &amp; Access Management (IAM)" Seite</li>
 	<li>Klicke rechts auf "User" und dann auf "Add user"</li>
 	<li>Gib einen Benutzername an, z.B. serverless-admin, aktiviere die Checkbox "Programmatic access" und klicke auf "Next: Permissions"</li>
 	<li>Klicke auf "Attach existing policies directly", suche und selektiere "AdministratorAccess" und klicke auf "Next: Review"</li>
 	<li>Prüfe ob alle Angaben stimmen und klicke "Create user"</li>
 	<li>Kopiere den erstellten API Key und das Secret</li>
</ul>

In deiner Konsole musst du nun dem Serverless Framework den AWS API Key und das Secret mitteilen:

`serverless config credentials --provider aws --key DEIN_API_KEY --secret DEIN_SECRET`

<h3>4. Applikation deployen</h3>
Du kannst nun die Applikation mit folgendem Befehl deployen:

`serverless deploy -v`

Ab jetzt wird die <em>run</em> Funktion jede Minute ausgeführt. Dies kannst du im Log sehen:

`serverless logs -f cron`

Falls du nur eine Änderung an der Funktion gemacht hast, kannst du diese Änderung mittels folgendem Befehle neu deployen:

`serverless deploy function -f cron`

<h2>Fazit</h2>
Meiner Meinung nach vereinfachen Serverless Applikationen die Entwicklung von kostgünstigen und skalierbaren Applikationen enorm. Als Softwareentwickler muss ich mich nicht um die Skalierbarkeit und Verfügbarkeit der Applikation kümmern. So glaube ich, dass wir in Zukunft immer mehr solche Applikationen antreffen werden.

Folgende Präsentation von AWS gibt dir weitere Informationen zum Thema:

<iframe src="https://www.slideshare.net/slideshow/embed_code/key/IXHTxRxxUtD61G" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen="" height="356" frameborder="0" width="427"> </iframe>
