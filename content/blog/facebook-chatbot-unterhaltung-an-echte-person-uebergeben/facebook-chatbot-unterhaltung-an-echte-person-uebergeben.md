---
title: 'Facebook Chatbot: Unterhaltung an echte Person übergeben'
source: bot-fabrik
date: '2018-05-08T10:10:17+00:00'
status: publish
slug: facebook-chatbot-unterhaltung-an-echte-person-uebergeben
author: admin
templateKey: blog-post
id: 716
image: ./facebook-ai-799x423.jpg
category:
  - Allgemein
tag: []
---

Chatbots können heutzutage schon sehr schlau sein. Doch allwissend sind sie natürlich bei weitem nicht. In Fällen, bei denen der Bot nicht mehr weiter weiss, ist es hilfreich, wenn er menschliche Unterstützung heranziehen kann.
![](fb_conversation.png)

## Handover: Bot -&gt; Inbox

Doch wie übergibt der Bot die Konversation nun an die Inbox? Die Lösung heisst [Facebook Handover Protocol](https://developers.facebook.com/docs/messenger-platform/handover-protocol). Der Bot muss beim Handover die ID des Benutzers und die ID der Page-Inbox angeben. Verläuft dieses Handover erfolgreich, landen die Nachrichten fortan in der Inbox der Page. Somit steht dem Live-Chat zwischen Benutzer und Page-Betreiber nichts mehr im Weg.
![](fb_inbox.png)

## Und retour

Die Konversation kann schliesslich wieder dem Bot zurückgegeben werden. Dazu muss die Konversation lediglich als „erledigt“ markiert werden. Anschliessend antwortet der Bot wieder auf die Anfragen der Benutzer.

![](fb_done.png)

## Facebook-Page Konfiguration

Auf einer Facebook-Page ist eine solche Integration ziemlich simpel. Unter den Einstellungen der Page kann man beim Menüpunkt Messenger-Plattform die abonnierten Apps konfigurieren. Der Chatbot muss als _Primary Receiver_ konfiguriert sein. Dies bedeutet, dass sämtliche Chat-Anfragen zunächst vom Bot beantwortet werden. Falls der Bot dann nicht mehr weiter weiss, kann er die Konversation an die Page-Inbox übergeben. Die Inbox muss hierzu als _Secondary Receiver_ eingerichtet sein.

![](fb_abonnnierte_apps.png)
