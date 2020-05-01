---
title: 'Unsere Erfahrungen mit PostFinance E-Payment'
slug: unsere-erfahrungen-mit-postfinance-e-payment-service
templateKey: blog-post
image: postfinance-e-payment.png
date: 2020-04-27
author: Philip Schönholzer
description: >-
  In einem aktuellen Projekt setzen wir PostFinance E-Payment ein. Hier teilen wir hier unsere Erfahrungen und Eindrücke mit.
categories:
  - Allgemein
---

Wir verwenden PostFinance E-Payment für ein aktuelles Projekt, um Zahlungstransaktionen durchzuführen. Unsere gewonnenen Eindrücke teilen wir nun im folgenden Video. Wir möchten betonen, dass wir PostFinance nicht gewählt haben, weil es der "beste" Anbieter ist, sondern weil unser Kunde bereits PostFinance einsetzt. Der Kunde war froh, dass er nicht nochmals den ganzen administrativen Aufwand für einen neuen Anbieter treiben musste. Für uns spielte die Wahl des Zahlungsdiestleisters keine grosse Rolle. So fiel die Wahl auf PostFinance E-Payment.

`youtube: https://youtu.be/feFnkgM9Mpw`

## PostFinance E-Payment einbinden

Grundsätzlich funktionierte die Einbindung von PostFinance E-Payment recht gut. Es gab zwei Dinge, die nicht optimal waren.

Zum einen dauerte es ein paar Tage, bis wir einen Test-Account erhalten haben. Bei anderen Anbietern kann man direkt online einen Test-Account erstellen. Die PostFinance begründete die Verzögerung nachvollziehbar mit der Corona-Krise. Laut ihrer Aussage gab es zahlreiche Anfragen, da aktuell viele Webshops eröffnet werden.

Zum anderen war die Dokumentation nicht so gut. Auch da sind andere Anbieter besser aufgestellt. Erschwerend kommt hinzu, dass die Einbindung technisch komplizierter als nötig ist und so eine gute Dokumentation noch wichtiger wäre. Nachdem wir diese Hürden genommen hatten, war die Einbindung recht schnell und sauber möglich.

> ### Hilfreiche Links zur Einbindung von PostFinance E-Payment
>
> Folgende Links haben uns bei der Einbindung unterstützt:
>
> - [Dokumentation von PostFinance E-Payment](https://e-payment-postfinance.ecom-psp.com/en/integration/all-sales-channels/integrate-with-e-commerce/guide)
> - [Test-Zahlungsmittel (PDF)](https://shared.ecom-psp.com/v2/docs/guides/TestCards_3DS%20v2_EN.pdf)

## Unsere Eindrücke zur Plattform

PostFinance E-Payment scheint uns eine gut funktionierende und sichere Zahlungsplattform zu sein. Wir sind damit gut in der Lage, Zahlungstransaktionen durchzuführen. Der Dienst war bisher stabil und korrekt. Dies ist natürlich das Fundament jedes Zahlungssystems. Da kann niemand Kompromisse eingehen.

Trotzdem sind uns einige weniger positive Punkte aufgefallen. Auf diese möchten wir nun auch noch kurz eingehen.

Die Zahlungsplattform zeigt unverkennbar ihr Alter und wurde in den letzten Jahren offensichtlich nicht gross aktualisiert. Dies zeigt sich an der gewählten Art der Einbindung. Sie ist auf einem POST-Request an ein PostFinance-Server aufgebaut, welcher HTML zurück liefert. Dies hat folgende Konsequenzen:

- Auf unserer Seite muss ein HTML-Formular (ohne JavaScript) die Zahlung übermitteln. Eine andere Möglichkeit wie z.B. Fetch gibt es nicht, soweit wir das aus der Dokumentation entnehmen konnten. Dies ist eine bewährte aber eher "klassische" Art der Kommunikation.
- Die Auswahl der Zahlungsmittel und die Eingabe der entsprechenden Daten findet zwingend auf der Webseite der PostFinance statt. Dieser Wechsel ist unschön und kann für Verwirrung sorgen. Auch optisch macht die Seite von der PostFinance nicht den frischesten Eindruck. Es sind etliche Konfigurationen notwendig, um das Erscheinungsbild ansprechend zu gestalten. Da sind andere Anbieter bereits einige Schritte voraus.

Ein weiterer Aspekt, welcher uns bei PostFinance nicht so gut gefiel, war die Admin-Benutzeroberfläche. Neben der altbackenen Optik ist vor allem der verwirrende Aufbau der Einstellungen und Übersichten zu kritisieren. Selbst Einstellungen, die wir bereits einmal vorgenommen hatten, konnten wir erst nach mehrmaligem Durchklicken wieder auffinden.

## Fazit

Trotz der eben genannten Punkte würden wir die Plattform wieder einsetzen, falls es aus Projektsicht sinnvoll ist. Mit den gemachten Erfahrungen sind wir in der Lage, eine gute Lösung mit der Zahlungslösung von PostFinance zu entwickeln. Falls PostFinance die Integrations-Strategie, Dokumentation und Benutzeroberfläche verbessert, wären wir aber auch nicht böse. Wir freuen uns auf jeden Fall auf das nächste Projekt.
