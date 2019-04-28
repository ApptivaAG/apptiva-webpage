---
title: Mit einem Chatbot rapportieren
path: mit-einem-chatbot-rapportieren
templateKey: blog-post
image: chefbot.png
date: 2019-04-28
author: Philip Schönholzer
description: >-
  Seit fast drei Jahren verwenden wir einen Chatbot um unsere Stunden und Aufwände zu rapportieren. Hier zeigen wir auf, wie gut dies funktioniert.
categories:
  - Allgemein
---

Als wir die Apptiva gegründeten, haben wir noch gehofft, dass wir nie mehr rapportieren müssen. Vor drei Jahren kamen wir zu traurigen Erkenntnis, dass das Rapportieren von Stunden und Aufwänden doch sinnvoll sein kann. Wir wollten beispielsweise wissen wie lange die Entwickung einzelner Projekte dauert. Zudem interessierte uns während eines Projektes wie viel Budget bereits verwendet wurde. Später hatten wir auch Projekte wo wir unsere Aufwände auf Stundenbasis verrechneten.

So entschieden wir uns schliessliche gewisse Arbeiten doch zu rapportieren. Wir wägten unterscheidliche Varianten wie Excel oder dedizierte Rapportierungslösungen ab. Da wir sowieso an Chatbots interessiert waren, zogen wir auch Chatbots in Betracht. Leider waren die vorhandenen Chatbot-Lösungen zu kompliziert in der Anwendung. Deshalb entschlossen wir uns unsere eigene Lösung entwickelten: Chefbot.

## Rapportierungs-Chatbot "Chefbot"

Wenn wir schon rapportieren, dann soll es gefälligst einfach sein und täglich weniger als 30 Sekunden in Anspruch nehmen. Mit unserem Rapportierungs-Chatbot "Chefbot" schaffen wir dies locker. Dies liegt auch daran, dass sich Chefbot täglich meldet und fragt an was wir gearbeitet haben. Wir brauchen dann bloss zu antworten. Eine Antwort könnte folgendermassen aussehen: `4h #projekt-x deployment umgesetzt`

![Chefbot im Slack Messenger](chefbot-in-slack.png)

Auch die Abfrage der rapportierten Stunden ist ähnlich einfach. Chefbot zeigt uns dann entweder alle rapportierten Stunden oder bloss die des letzten Monats, um eine Rechung erstellen zu können.

Als Plattform für Chefbot nutzen wir die Messaging-App "Slack". Damit kann uns Chefbot täglich notifizieren und wir können sehr schnell im Slack-Client antworten.

## Fazit

Ingesamt sind wir auch nach drei Jahren noch sehr zufrieden mit Chefbot. Er hat sich aber nicht immer kooperativ gezeigt, weshalb wir ihm jetzt ein Update unterzogen haben. Chefbot läuft nun stabil und verhält sich gnädiger, wenn man etwas falsch eingegben hat. Wir hoffen damit, dass uns Chefbot noch lange beim schmerzhaften Rapportieren unterstützt.