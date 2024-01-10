---
title: 'Chatbot-Konversationsstränge &#8211; wie geht denn das?'
source: bot-fabrik
date: '2018-12-17T08:42:13+00:00'
status: publish
slug: chatbot-konversationsstraenge-wie-geht-denn-das
author: Markus Tanner
templateKey: blog-post
id: 861
image: ./beautiful-beauty-chat-1126287.jpg
category:
  - Allgemein
tag:
  - chatbot
  - Konversation
  - Konversationsstrang
  - Modellierung
---

Zu Beginn eines Chatbot-Projektes für Supportabteilungen gibt es ganz unterschiedliche Ausgangslagen. Es gibt Firmen, die setzen beispielsweise bereits einen Live-Chat ein und kategorisieren die Konversationen nach Themenbereichen. Es gibt aber auch Firmen, bei denen ist das Know-how mehr oder weniger nur in den Köpfen der Mitarbeiter abgelegt.

Die Verläufe von Live-Chats stellen natürlich eine gute Ausgangslage dar. Man kennt die Formulierungen und Absichten der Kunden bereits und kann den Chatbot entsprechend trainieren. Wenn so etwas nicht existiert, so soll dies aber kein Hindernis sein, dennoch einen guten Chatbot auf die Beine zu stellen. Wie wir dabei vorgehen, möchte ich in diesem Blogbeitrag kurz beschreiben.

## Absichten

Der Input der Fachpersonen ist eminent wichtig. Deshalb trifft man sich am besten zu einem Workshop und reserviert ausreichend Zeit dafür.

In einem ersten Schritt geht es darum, die Absichten der Kunden zu sammeln. Mit welchen Anliegen melden sich die Kunden heute? Für das Zusammentragen dieser Absichten eignet sich natürlich ein Brainstorming sehr gut. Dies ist eine Aufgabe, welche die Fachpersonen bereits im Vorfeld des Workshops erledigen können.

Meistens ergibt sich dabei schon eine lange Liste von Absichten. Umso wichtiger ist es, dass man diese anschliessend sortiert. Die Absichten, welche am häufigsten vorkommen und am meisten Zeit beanspruchen, sollen zuerst bearbeitet werden.

## Slots

Aus der sortierten Liste von Absichten wählt man die wichtigste aus. Im nächsten Schritt sollen die Informationen ermittelt werden, welche nötig sind, um eine Antwort auf die Absicht, respektive Frage des Kunden liefern zu können.

Stellt der Kunde z.B. die Frage “Wo ist mein Paket?”, dann muss danach die Sendungsnummer erfragt werden. Diese zu ermittelnden Informationen werden auch Slots genannt. Es gibt Absichten, da gibt es keine Slots. Dann handelt es sich eher um eine Q&amp;A-Geschichte. Es gibt aber auch Absichten, die haben gleich mehrere Slots. Das Füllen dieser Slots erledigt man mit Konversationssträngen.

## Konversationen

Gut, nun haben wir die eine Absicht und die entsprechenden Slots beisammen. Als nächstes geht es darum, die Konversation zu modellieren. Der Kunde stellt eingangs eine Frage, bei welcher die Absicht erkannt werden muss. Genau diese Fragen einer Absicht müssen ermittelt werden. Eine gewisse Variation ist dabei wichtig; nur so kann der Chatbot vernünftig trainiert werden.

Dann kommen die Slots ins Spiel. Diese müssen auf möglichst natürliche Weise erfragt werden. Man muss darauf achten, dass dieser Schritt nicht zu monoton ausfällt. Wenn man bei einem Chatbot nur “Ja” und “Nein” klicken muss, dann macht die Konversation mit dem Bot nur mässig Spass.

Dieses Vorgehen wendet man nun für die weiteren Absichten an, bis man die wichtigsten Themenbereiche abgedeckt hat. Diese Konversationen bieten eine optimale Ausgangslage, um den Bot initial trainieren zu können.

Können wir Euch beim Erstellen eines Chatbots helfen? Wir unterstützen Euch gerne.
