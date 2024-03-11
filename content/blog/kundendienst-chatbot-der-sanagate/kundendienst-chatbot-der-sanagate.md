---
title: 'Kundendienst-Chatbot der Sanagate'
source: bot-fabrik
date: '2017-10-31T17:25:08+00:00'
status: publish
slug: kundendienst-chatbot-der-sanagate
author: 'Philip Schönholzer'
templateKey: blog-post
description: Seit Kurzem beantwortet unser neuster Kundendienst-Chatbot einen Teil der Kundenanfragen der Sanagate.
id: 577
image:
  src: /assets/blog/kundendienst-chatbot-der-sanagate/Blog.png
  base64Placeholder: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAbUlEQVR4nGNYunRpe3v7qlVr7t+98/XDu/////0HA4bcvDw2Tk4fD7eczqkMftkMSTUMoUW96/cxhIaFBocEx0ZF1k6Y4VDcHtg4zaWye8PRkwympqZ+vr6NTU27t217/ejumzfvPn568u/fJwDGjjcycs2hcwAAAABJRU5ErkJggg==
  height: 492
  width: 1024
category:
  - Allgemein
tag: []
post_format: []
seo-keywords:
  - Kundendienst-Chatbot
---

&nbsp;

> ## Update vom 06.07.2020
>
> Inzwischen hat die Sanagate AG keinen eigenständigen Markenauftritt mehr und ist stattdessen ein Teil der CSS Gruppe geworden. Aus diesem Grund wird unser Chatbot nicht mehr benötigt und wurde offline genommen.
>
> An dieser Stelle möchten wir uns für die hervorragende Zusammenarbeit mit der Sanagate bedanken und hoffen in Zukunft mit den involvierten Personen in anderen Projekt zusammenarbeiten zu dürfen.
>
> &nbsp;

## Anforderungen an den Kundendienst-Chatbot

Der Sanagate Chatbot erkennt heute über 200 Absichten, ist aber immer noch in der Trainingsphase und lernt somit täglich dazu. Dies ist auch nötig, da das Spektrum beim Kundendienst sehr breit ist. Vom Fitness-Abo über die Schwangerschaft bis hin zu den Vorteilen von Sanagate soll der Chatbot sinnvolle Antworten geben. Zudem unterstützt der Chatbot Kunden bei der Wahl der passenden Grund- und Zusatzversicherung.

<video autoplay controls height="640" loop preload="auto" width="360" muted>
  <source src="Sanagate_720p.mp4" type="video/mp4" />
</video>

## Umsetzung des Chatbots

Der Aufbau des Sanagate Chatbots ist wieder sehr ähnlich zu unseren bisherigen Projekten. Für die Absichten- und Entitätserkennung (NLP) haben wir auf API.AI gesetzt, welches seit Sommer 2017 neu Dialogflow heisst. An und für sich sind wir mit Dialogflow zufrieden, hatten aber zwei unschöne Überraschungen. Erstens unterstützte Dialogflow im Laufe des Projekts den IE11 Browser nicht mehr. Dies ist ein Problem, da wir sehr gute Erfahrungen gemacht haben, wenn der Kundendienst die Inhalte des Bots selber pflegen kann. Ohne IE11 war dies für den Kunden sehr umständlich. Zweitens bietet Dialogflow keine Möglichkeit, gelöschte Inhalte wiederherzustellen. Wenn etwas fälschlicherweise gelöscht wurde, ist es definitiv weg.

Beim Sanagate Chatbot setzen wir das erste Mal unsere neue Bot-Engine ein. Diese erlaubt uns, sehr schnell unterschiedliche Clients (Web, Facebook, Slack, usw.) und NLP-Dienste einzubinden und direkt die projektspezifischen Anpassungen vorzunehmen. Unsere Bot-Engine läuft auf Node.js und wird mittels NPM-Modulen eingebunden. Damit war es für uns sehr einfach, im Laufe des Projekts den Chatbot auch auf Facebook anzubieten.

Wer uns beim Training des Chatbots helfen will, erreicht diesen über Facebook oder die Webseite. Viel Spass! 🤖

Facebook: [facebook.com/sanagate/](https://www.facebook.com/sanagate/)  
Webseite: [sanagate.ch/](https://www.sanagate.ch/)
