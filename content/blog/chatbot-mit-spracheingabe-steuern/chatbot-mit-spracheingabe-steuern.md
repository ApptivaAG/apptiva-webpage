---
title: 'Chatbot mit Spracheingabe steuern'
source: bot-fabrik
date: '2019-11-08T15:22:08+00:00'
status: publish
slug: chatbot-mit-spracheingabe-steuern
author: admin
templateKey: blog-post
id: 947
category:
  - Allgemein
tag:
  - chatbot
  - speech-to-text
  - Spracheingabe
---

Seit der Lancierung der Botfabrik wurden wir von unseren Kunden immer wieder zum Thema Sprachsteuerung angefragt. Sprachassistenten wie Alexa oder Siri halten in unserem Privatleben Einzug. Es ist logisch, dass sie auch im Geschäftsumfeld immer wichtiger werden und unter anderem auch Systeme wie Chatbots mittels Spracheingabe gesteuert werden sollen. In diesem Blogpost zeigen wir, wie wir unserem Chatbot Pit beigebracht haben, auf Spracheingaben zu reagieren.

## Chatbot Basics

Eine zentrale Aufgabe jedes Chatbots ist, die Eingabe eines Benutzers zu verstehen, um darauf basierend Aktionen auszuführen. Dies geschieht in der Regel mittels einer sogenannten Natural Language Processing (NLP) Komponente, welche die Eingabe eines Benutzers in Textform analysiert. Dabei geht es in erster Linie darum, die Absicht einer Aussage zu erkennen. Falls eine solche ermittelt werden konnte, kann der Bot eine passende Antwort an den Benutzer schicken. Doch wie wandeln wir nun die gesprochene Sprache in Text um?

## Audio in Text umwandeln

Die Botfabrik unterstützt mehrere Kanäle, über welche mit einem Chatbot kommuniziert werden kann. Dazu gehören z.B. Slack, Facebook Messenger oder natürlich ein gewöhnlicher Webbrowser. Bei all diesen Kanälen funktioniert die Erfassung von Audio-Inhalten auf unterschiedliche Art und Weise. Deshalb ist auch jeder Client selbst dafür verantwortlich, Gesprochenes in Text umzuwandeln.

Wir haben diese Funktionalität zunächst im Webclient eingebaut. Dazu verwenden wir die Google Cloud Bibliothek Speech-to-Text. Der Benutzer klickt auf ein Mikrofon und sagt, was er zu sagen hat. Das Gesprochene wird dann an Speech-to-Text geschickt. Wie es der Name schon andeutet, kommt die Nachricht als Text zurück und wird wie gewohnt in unserer Engine verarbeitet. Der Benutzer sieht dabei sofort, wie seine Aussage in Text aufbereitet wurde. Er kann gegebenenfalls die Mitteilung auch nochmals wiederholen.

<div className="w-72"><video autoplay="1" controls="controls" height="640" id="video-0-1" loop="1" preload="metadata" width="360"><source src="pit-speech2.mp4" type="video/mp4"></source></video></div>

## Formulierungshinweise

Chatbots agieren in der Regel in einem Kontext dessen Vokabular domänenspezifische Begriffe enthält. Bei einem Kino-Chatbot können dies beispielsweise Filmnamen wie _Bohemian Rhapsody_ oder _Avatar_ sein. Diese oder andere Fantasiebegriffe sind womöglich nicht im Standardvokabular der Spracherkennung enthalten. Bei unserem Chatbot Pit ist dies z.B. das Wort _Botfabrik_, welches oftmals mit Brotfabrik oder Bootfabrik verwechselt wird. Cloud Speech-to-Text von Google bietet die Möglichkeit mittels sogenannten Formulierungshinweisen die Erkennungsgenauigkeit zu verbessern und zusätzliche Wörter ins Vokabular aufzunehmen.

## Fazit

Gerade auf dem Smartphone ist die Spracheingabe gegenüber der Tipperei sehr komfortabel. Wenn man einigermassen deutlich spricht, ist die Qualität der Resultate sogar sehr gut.

Bei Dialekten kommt man aber sehr schnell an die Grenze. Da müssen wir uns wohl noch eine Weile gedulden, bis wir mit dem Bot auch auf Mundart schwatzen können.

In einem nächsten Schritt möchten wir auch noch den umgekehrten Weg gehen. D.h. wir möchten auch dem Bot eine Stimme verleihen. Auch hierzu gibt es eine Bibliothek von Google, die wir demnächst einbauen werden.
