---
templateKey: blog-post
source: bot-fabrik
title: Chatbot Metriken
slug: chatbot-metriken
image: ./bot-metriken.png
date: 2020-11-12T11:10:00
author: Linus Hüsler
description: Chatbots können einen sehr guten Einblick geben, wie sie von den Anwendern benutzt werden. Mit diesen Informationen und einigen Chatbot-KPIs können die richtigen Entscheidungen zum Verbessern der Kundenerfahrung getroffen werden.
category:
  - Allgemein
---

Mit der Inbetriebnahme eines Chatbots ist es, wie wenn ein Vollzeitstudent nach dem Studium eine Stelle in einem Unternehmen antritt. Während seines Studiums konnte er seinen Rucksack ordentlich mit theoretischem Wissen packen. In der Praxis aber lernt er Dinge, die während einem Studium nicht vermittelt werden können. Er muss bei seiner Arbeit begleitet werden und die Möglichkeit bekommen, sich ständig zu verbessern. Im Verlaufe der Zeit kann er immer selbstständiger arbeiten und mehr und mehr Verantwortung übernehmen. In Bezug auf den Chatbot bedeutet dies, dass die Arbeit als Chatbot-Entwickler nicht endet, wenn der Chatbot live geht. Umso mehr geht es darum, das Kundenverhalten zu analysieren und mit Hilfe von Metriken den Chatbot kontinuierlich zu verbessern.

## Was sind Chatbot Metriken?

Chatbot Metriken erlauben es, die Leistung eines Chatbots über eine bestimmte Zeit zu überwachen. Damit kann zum Beispiel der Effekt einer Änderung am Chatbot (z.B. eine Einführung eines neuen Intents) beobachtet werden, oder es kann Hinweise darüber geben, wie der Chatbot optimiert werden soll.

Metriken werden in der Regel über einen bestimmten Zeitraum betrachtet (z.B. die letzten 30 Tage) und einige stehen in Korrelation zu anderen, teils nicht Chatbot-spezifischen Metriken (z.B. “Anzahl Bot Nachrichten” vs “Anzahl Erreichung spezifischer Zielvorhaben”). Bei einem neu erstellten Chatbot schwanken Metriken in der Regel noch stark. Mit der Zeit erhält man ein immer klareres Bild darüber, wie die Besucher mit dem Chatbot interagieren.

## Allgemeine Metriken

Die nachfolgenden Chatbot Metriken machen in der Regel für jeden Chatbot Sinn.

### Anzahl Benutzer

Als Benutzer zählt, wer dem Chatbot mindestens eine Nachricht sendet und ihn somit aktiv nutzt. Eine Vielzahl aktiver Benutzer hilft, diese besser zu verstehen und das Angebot passender zu gestalten.

### Anzahl neue Benutzer

Neue Benutzer sind notwendig, um eine aktive Benutzerzahl zu behalten. Attraktive Einstiegspunkte (z.B. auf unterschiedlichen Orten der Webseite) oder gezielte Marketingaktivitäten haben positiven Einfluss auf diese Metrik.

### Anzahl wiederkehrende Benutzer

Wiederkehrende Benutzer sind ein Zeichen dafür, dass Ihnen der Chatbot einen konkreten Nutzen gebracht hat und sie ihn wohl auch weiterempfehlen würden.

### Anzahl Chats

Es ist wichtig, viele Chats und somit eine grosse Datenbasis für verschiedenste Auswertungen zu haben. Die Anzahl Chats kann wichtige Informationen über die Berechnungen der Marktgrösse und möglicherweise die Auswirkungen des Chatbots liefern.

### Anzahl nicht verstandener Benutzerfragen

Ein Chatbot wird nie auf jede Frage eine passende Antwort haben. Die nicht verstandenen Benutzerfragen helfen uns, den Chatbot besser zu trainieren; zum Beispiel durch das Hinzufügen eines neuen Intents oder durch das Optimieren der Trainingssätze eines Intents. Über die Zeit sollte diese Anzahl also eher runter gehen. Ist dies nicht der Fall, kann dies ein Zeichen dafür sein, dass sich die Chatbot Benutzer für andere Themen interessieren (z.B. infolge einer Marketingaktion).

### Anzahl Bot-Nachrichten

Mit der Gesamtzahl der vom Chatbot gesendeten Nachrichten können wir die Dauer einer Unterhaltung messen. Muss der Bot viele Nachrichten senden, ohne dass dabei ein konkretes Ziel (z.B. den Kauf eines Produkts) erreicht wird, kann das ein Zeichen dafür sein, dass der Bot viele Anfragen falsch beantwortet (sogenannte False-Positives).

### Anzahl Bot-Nachrichten infolge technischer Probleme

Es kann vorkommen, dass ein Chatbot keine oder nur eine allgemeine Antworten geben kann, weil es zu technischen Problemen kam. Das Ziel ist, diese Zahl zu minimieren.

### Top Intents

Bei Intents, die am meisten aufgerufen werden, kann es Sinn machen, die Antworten des Chatbots besonderes zu optimieren. Anstatt dass der Chatbot z.B. einen Link zu einem Online-Dienst liefert (und damit einen Absprung des Besuchers in Kauf nimmt), könnte er den Online-Dienst via API integrieren und direkt die passende Antwort liefern.

### Top Einstieg-Intents

Durch das Anbieten von Quick Replies kann man den Benutzer durch eine Konversation führen. Dies ist besonders bei den wichtigsten Einstiegs-Intents sinnvoll.

### Top Absprung-Intents

Ein Absprung eines Benutzers hat in der Regel zwei mögliche Ursachen: Entweder der Benutzer hat sein Ziel erreicht (positiv, Chatbot konnte helfen) oder nicht (negativ, Chatbot konnte nicht helfen). In beiden Fällen kann Handlungsbedarf bestehen. Im positiven Fall könnte man zusätzliche Leistungen anbieten (Up-selling) und im negativen Fall lohnt es sich, die Konversationen zu analysieren und den Chatbot besser zu trainieren.

## Projektspezifische Metriken

Um die Geschäftsziele eines Chatbots zu überprüfen, macht es Sinn, zusätzlich zu den allgemeinen Metriken auch noch weitere Metriken zu definieren. Diese Metriken beziehen sich oft auf die Integration des Chatbots in seine jeweilige Umgebung und zeigen die Auswirkungen auf das gesamte Ökosystem auf.

Nachfolgend eine mögliche Auswahl:

- Anzahl Übergaben an einen Live-Agenten vom Kundendienst
- Anzahl Erreichung spezifischer Zielvorhaben (GCR, Goal Completion Rate)
- Bereiche der Webseite, die zum Starten eines Chats führten
- Anzahl E-Mail- und Telefonanfragen an den Kundendienst (Verlagerung der Kommunikationskanäle)
- Anzahl individueller Probleme, die beim ersten Kontakt gelöst werden können (FCR, First Contact Resolution)
- Wahrscheinlichkeit, dass Kunden den Chatbot anderen Personen weiterempfehlen (NPS, Net Promoter Score)
- Aufwand, welchen ein Kunde auf sich genommen hat, um sein Ziel zu erreichen (CES, Customer Effort Score)
- Höhe der Kundenzufriedenheit (CSAT, Customer Satisfaction)

## Chatbot Analytics Tools

Es gibt mehrere Analytics-Tools für Chatbots. Diese unterscheiden sich teils stark im Preis und Funktionsumfang. In unseren Chatbot Projekten nutzen wir oft [Bubble Chat](https://bubble-chat.ch/de) oder [Dashbot](https://www.dashbot.io/). Beide Tools bieten die wichtigsten Kennzahlen für die Chatbot-Analyse. Mit Bubble Chat ist es zudem möglich, alle Daten in ein eigenes Reporting-Tool wie Tableu oder Qlik Sense zu exportieren und man kann Bubble Chat sogar im eigenen Rechenzentrum betreiben.
