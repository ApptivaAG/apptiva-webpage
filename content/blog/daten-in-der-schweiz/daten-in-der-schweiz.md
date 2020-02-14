---
title: Chatbots in der Schweiz hosten
slug: chatbots-in-der-schweiz-hosten
templateKey: blog-post
image: daten-in-der-schweiz2.jpg
date: 2020-02-12
author: Patrik Stutz
description: >-
  Chatbotsysteme verwenden oft Dienste von Drittanbietern auf Servern im Ausland. Dies muss aber nicht so sein!
categories:
  - Chatbots
---

Sprache zu verstehen ist sehr komplex. So komplex, dass es sich nicht lohnt, dies für jeden Chatbot neu zu erfinden. Deshalb benutzen Chatbots zu diesem Zweck oft Dienste von Drittanbietern.
Ein gutes Beispiel für einen solchen Dienst, den wir auch selbst sehr oft benutzen, ist Google Dialogflow. In Dialogflow kann man verschiedenste sogenannte "Absichten" definieren, welche dann automatisch anhand eines vom Benutzer eingegebenen Textes erkannt werden sollen. Gibt man Dialogflow zu jeder Absicht ein paar Beispielsätze, funktioniert das sehr zuverlässig und schnell.

# Problem

Dialogflow ist ein Dienst, der auf Googles Servern läuft. Es gibt keine Möglichkeit Dialogflow selbst zu hosten. Möchte unser Chat nun herausfinden, was die Absicht seines Gegenübers ist, muss er den gesamten Text an Google senden. Auf diese Weise erlangt Google Kenntnis über sämtliche mit dem Chatbot geführten Gespräche. Wie der Drittanbieter mit diesen sensiblen Daten umgeht ist nicht unter unserer Kontrolle. Zusätzlich können sich dadurch auch datenschutz-rechtliche Probleme ergeben.

# Alternativen

Zum Glück gibt es für solche Fälle gleich zwei hochkarätige Alternativen zu den Diensten der grossen Anbieter wie Dialogflow, Lex, Watson und Wit.ai.

## Rasa

[Rasa](https://rasa.com/) ist die wohl bekannteste Alternative zu Dialogflow, die man auf den eigenen Servern betreiben kann. Entwickelt und gepflegt wird Rasa von der gleichnamigen Firma Rasa Technologies Inc., welche sich hauptsächlich mit dem Verkauf der konstenpflichtigen Enterprise Version von Rasa finanziert. Für das Erstellen von Chatbots reicht die kostenlose Open-Source Version völlig aus. Der Funktionsumfang, die Performance und auch Qualität der Spracherkennung steht Dialogflow in nichts nach.

Lediglich die Verwaltung der einzelnen Absichten, Trainingssätze, etc. gestaltet sich bei Rasa mit dem Editieren von Markdown- und YAML Dateien nicht ganz so intuitiv.
Durch den Einsatz von einem Chatbot-CMS wie [Bubble](https://bubblecms.io), ist das aber nicht länger ein Problem.

## Snips

Etwas weniger bekannt, aber mehr als ebenbürtig ist [Snips](https://snips.ai/). Die kürzlich von Sonos aufgekaufte Software ist ebenfalls quelloffen und kostenlos verfügbar. Einen Chatbot damit zu realisieren gestaltet sich nicht schwieriger, als es mit Rasa der Fall wäre. Es bleibt allerdings abzuwarten, wie sich die Übernahme durch Sonos auf die Zukunft des Produkts auswirkt.

# Fazit

Auch wenn das Verwenden von Cloud-Diensten wie Dialogflow sehr einfach und komfortabel ist, so ist es keineswegs alternativlos!
Sehr sensible Gesprächsdaten müssen also nicht zwingend aus der Hand gegeben werden. Die etwas höheren Entwicklungskosten werden durch die zusätzlich gewonnene Sicherheit wieder wettgemacht.
