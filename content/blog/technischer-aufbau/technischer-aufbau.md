---
title: Technischer Aufbau von Chatbots
source: bot-fabrik
slug: technischer-aufbau-von-chatbots
templateKey: blog-post
image: ./technischer-aufbau.png
date: 2020-01-23T11:16:49
author: Philip Schönholzer
description: Aus was besteht ein Chatbot und wie wird eine solcher von Grund aufgebaut.
categories:
  - Bots und Chatbots
---

Aus welchen Teilen besteht ein Chatbot? Wie funktionieren diese zusammen? Wie wird ein Chatbot von Grund auf aufgebaut? Diese Fragen wollen wir hier beantworten.

## Bestandteile eines Chatbots

Ein Chatbot besteht aus den folgenden Teilen:

![Bestandteile eines Chatbots](tech-stack.png)

### Client

Der Client ist für das Verschicken und Empfangen von Nachrichten aus der Sicht des Anwenders zuständig. Dies ist auch die einzige Komponente eines Chatbot, welche die Anwender sehen.

Einige Chatbots verwenden bestehende Messaging-Plattformen als Client, wie z.B. den Facebook-Messenger, WhatsApp oder Slack. Dies ist aus verschiedenen Gründen interessant. Zum einen können die Anwender einen bekannten Kanal nutzen. Zum anderen ist es nur so möglich, dass der Chatbot das Gespräch initiiert.

In anderen Fällen wird ein dedizierter Client verwendet. Dies heisst, der Client wurde für den Chatbot entwickelt oder ist Teil des Chatbots. Dies ist meistens der Fall, wenn der Chatbot auf einer Webseite integriert werden soll.

In beiden Fällen hat der Client dieselbe Aufgabe: Er ermöglicht es dem Benutzer einen Text zu schreiben oder zu sprechen. Dieser Text wird an einen Server geschickt. Der Server schickt daraufhin einen möglichst passenden Text zurück an den Client, welcher der Client anzeigt.

### Chatbot-Engine

Die Chatbot-Engine ist das Herzstück eines Chatbots. Die Chatbot-Engine hat folgende Aufgaben:

- **Nachrichten senden und empfangen.** Die Engine empfängt von und schickt Nachrichten an den Client. Eine gute Engine ist dabei in der Lage, mit unterschiedlichen Clients (gleichzeitig) zu kommunizieren.
- **Nachrichten verarbeiten.** In der Engine wird entschieden, was mit einer Nachricht geschehen soll und wie auf die Nachricht geantwortet werden soll. Dafür wird eine Engine häufig auch andere Komponenten anfragen, wie z.B. eine Sprachverarbeitung.
- **Die Sitzungen verwalten.** Die Engine muss schauen, dass die richtigen Anwender die richtigen Antworten erhalten oder die gewünschten Aktionen ausgeführt werden. Teilweise muss die Engine auch die Anwender identifizieren, um korrekt zu reagieren oder ev. gewisse Aktionen gar nicht zu erlauben.
- **Kontext merken.** Ein guter Chatbot antwortet je nach Kontext nicht immer gleich. Wenn der Chatbot im Verlauf des Gesprächs beispielsweise bereits einmal erfahren hat, dass der Anwender an der Informatiker-Lehre interessiert ist, so kann er bei der späteren Frage "Was sind die Anforderungen?" gleich vom Kontext Informatiker-Lehre ausgehen und entsprechend antworten. Teilweise werden solche Aufgaben auch von einer NLP-Komponenten übernommen (siehe unten).
- **Live-Chat vermitteln.** Soll eine Person das Antworten für den Chatbot übernehmen (Live-Chat), so muss die Chatbot-Engine dies koordinieren. Einerseits muss die Engine das Handover (Übergabe) von der Maschine an den Menschen und somit die Kommunikation zwischen den Clients zu sicherstellen. Andererseits muss sich die Engine den Zustand des Live-Chats für jeden Anwender merken, um die Nachrichten korrekt zu verarbeiten.

### Integration in Umsysteme

Gute Chatbots geben nicht nur statisch Antwort, sondern können aktuelle Informationen wiedergeben. Ein klassisches Beispiel ist das Wetter. Damit der Chatbot sagen kann wie das Wetter morgen sein wird, muss dieser einen Wetter-Dienst anfragen. Chatbots die auf Unternehmens-Webseiten angezeigt werden, können ganz unterschiedliche Informationen aus Umsystemen beziehen oder zurückschreiben: Status einer Bestellung, Passwort zurücksetzen, Artikel kaufen usw. Diese Integration wird in den meisten Fällen manuell programmiert. Integrationen die häufiger vorkommen (wie z.B. der Versand eines Emails), müssen aber bloss konfiguriert werden.

### NLP

NLP steht für Natural Language Processing (Sprachverarbeitung). Dies wird manchmal auch als NLU (Natural Language Understanding) beschrieben. Dabei geht es grundsätzlich darum Nachrichten einer Absicht zuzuweisen. Diese Absichten werden im Voraus erfasst und mit Trainingssätzen und teilweise mit Antworten versehen. Schreibt ein Anwender beispielsweise "Ich hätte gerne eine Pizza" so interpretiert eine gut trainierte NLP-Komponente diesen Text als "Absicht: Pizza bestellen; Antwort: Sehr gerne! Wohin soll ich die Pizza liefern?".

Zusätzlich zur Absichtserkennung, wird NLP für weitere aber weniger häufige Aufgaben verwendet. Diese sind Entitätserkennung und teilweise auch Slotfilling und Kontextverarbeitung. Details dazu haben wir im Artikel [Konversationsstränge](/blog/2018/12/17/chatbot-konversationsstraenge-wie-geht-denn-das/) beschrieben.

Nicht jeder Chatbot verwendet NLP. Falls der Chatbot "nur" vorgefertigte Fragen zulässt (Klickbot), so ist NLP nicht nötig. NLP ist nur notwendig, wenn die Anwender frei Text eingeben können.

![NLP-Tool](dialogflow.png)

### CMS

Ähnlich wie bei Webseiten, ist es sinnvoll die Chatbot-Inhalte in einem CMS (Content Management System) zu verwalten. Das CMS enthält dabei alle Absichten, Trainingssätze, Antworten und teilweise auch die Aktionen des Chatbots.

Häufig werden die Inhalte nicht in einem CMS, sondern direkt in einem Chatbot-Tool oder der NLP-Komponente verwaltet. Das Verwalten der Inhalte in einem CMS hat aber viele Vorteile, weshalb wir den Einsatz eins CMSs bevorzugen: Weil die Bedienung sehr einfach und die Daten gesichert sind, können die Inhalte direkt von den Mitarbeitern der Fachabteilung gepflegt werden (z.B. Support). Zudem können die Daten unabhängig vom Chatbot-Tool oder der NLP-Komponente gehalten werden, womit man die Hoheit über die Inhalte behält und jederzeit die Tools austauschen kann.

### Analytics

Mit Analytics ist der Anbieter eines Chatbots in der Lage die Nutzung des Chatbots zu verstehen. Wie viele Personen nutzen den Chatbot wie lange und wofür? So kann der Chatbot laufend verbessert werden oder ev. das Angebot angepasst werden. Für Analytics gibt es unterschiedliche Möglichkeiten. Zum einen liefern viele NLP-Tools automatisch die wichtigsten Kennzahlen wie Anzahl Nutzer, häufigste Absichten und spezielle Exit-Punkte, wo Anwender den Chatbot verlassen. Zusätzlich können bestehende Tools wie beispielsweise dashbot.io eingebunden werden. Wenn bestehenden Tools nicht die gewünschten Daten liefern, entwickeln wir von der Botfabrik auch Projekt-spezifische Dashboards für Analytics. Damit können praktisch alle Wünsche erfüllt werden.

## Entwicklung eines Chatbots

Bei der Entwicklung eines Chatbots von Grund auf stehen einem viele Möglichkeiten zur Verfügung. Entsprechend gilt es die Anforderungen zu kennen, um schliesslich gewisse Entscheidungen zu treffen.

- Auf welchen Kanälen soll der Chatbot verfügbar sein? Nur im Web? Oder auch im Facebook-Messenger oder WhatsApp? Entsprechend hat dies auf den Datenschutz und die folgenden Punkte Einfluss.
- Wo soll der Chatbot-Server stehen? In der Schweiz, im DACH-Raum, in Europa oder auch ausserhalb Europas möglich? Hier spielen vor allem die Datenschutzanforderungen und entstehende Kosten eine Rolle.
- Wird NLP benötigt oder reicht ein einfaches Skript? Und falls NLP benötigt wird, welche Lösung soll verwendet werden? Bei der Wahl der NLP-Lösung spielt wieder der Datenschutz eine entscheidende Rolle. Falls die Daten das Unternehmen oder das Land wo der Chatbot-Server in Zukunft laufen soll nicht verlassen dürfen, so kommt beispielsweise RASA als NLP-Lösung zum Zug. Spielt dieser Datenschutz-Aspekt aber keine Rolle, so ist RASA zu aufwändig, um in jedem Projekt zu verwenden. Stattdessen setzen wir meistens Dialogflow von Google ein.
- Wo sollen die Inhalte gespeichert werden? Direkt im NLP-Tool, dem Skript oder doch lieber in einem dedizierten CMS? Diese Entscheidung hängt von der Grösse des Projekts und den späteren Pflegepersonen des Chatbots ab. Bei ganz kleinen Projekten wo immer eine technische Person den Chatbot pflegen wird, verwalten wir die Inhalte wahrscheinlich direkt im NLP-Tool oder dem Skript in der Bot-Engine. In allen anderen Fällen empfehlen wir den Einsatz von [Bubble Chat](https://bubble-chat.ch).

Sind die Anforderungen klar und die Entscheidungen getroffen und mit dem Kunden besprochen, geht es darum dien Chatbot zu entwickeln. Die Entwicklung eines individuellen Chatbots läuft in der Regel folgendermassen ab.

### Chatbot-Engine aufsetzen

Beim Aufsetzen der Chatbot-Engine werden viele der anderen Teile konfiguriert: Welche Clients sollen für die Kommunikation verwendet werden, ob und welche NLP-Komponente eingesetzt wird, ob und wie Live-Chat funktionieren soll, woher die Inhalte kommen und wie die Umsystem integriert werden. Unsere Chatbot-Engine läuft auf Node.js. Entsprechend Konfigurieren wir die Engine in TypeScript, einer typisierten Variante von JavaScript. Die konfigurierte Engine wird schliesslich auf einem Server bereitgestellt.

![Konfiguration der Chatbot-Engine](bot-engine-config.png)

### NLP Konfigurieren

Bei Chatbots die NLP verwenden, müssen wir die Komponente ebenfalls aufsetzen. Dies bedeutet einerseits ein neues Projekt auf Dialogflow mit den entsprechenden Tokens für den Zugriff der Engine erstellen.

### Client(s) anpassen

Je nach dem auf welchen Clients der Chatbot erreichbar ist, werden diese ebenfalls aufgesetzt. Im Fall eines Web-Projektes werden zumindest die Farben des Clients an die Webseite angepasst. Im Fall von Facebook-Messenger, muss auf Facebook eine neue Applikation erfasst und die entsprechenden Tokens verlanget werden.

### CMS aufsetzen

Werden für die Inhalte des Chatbots ein CMS verwendet, so wird das CMS einerseits installiert und in der Engine konfiguriert. Die Engine muss vom CMS wissen, damit die Inhalte beim Verarbeiten der Nachrichten aus dem CMS genommen werden.

### Spezielle Logik

Teilweise bietet ein Chatbot spezielle Logik an, wie z.B. ein Gewinnspiel. Die Logik des Spiels wird dabei direkt im Code via Middleware der Engine in TypeScript geschrieben.

### Integrationen sicherstellen

Verwendet ein Chatbot andere Systeme, so wird die Integration mittels Middleware in der Engine programmiert. Diese wird ebenfalls in TypeScript implementiert. Die Möglichkeiten sind nahezu unbegrenzt, solange der Zugriff auf anderes System möglich ist.

### Inhalte erfassen

Sobald das CMS läuft, können die Inhalte darin erfasst werden. Dies kann als einziger Schritt auch vom Chatbot-Kunden übernommen werden. Teil der Inhalte sind auch die Trainingssätze. Diese werden während der Entwicklung, aber auch nach dem Publizieren laufend verbessert. Diesem Vorgang wird auch "Trainieren" gesagt.

![Inhalte im Bubble Chat erfassen](bubble-chat.png)

### Chatbot publizieren

Wenn der Chatbot die gewünschte Qualität erreicht hat, gilt es den Chatbot zu publizieren. Dies geschieht indem der Client entweder auf der Webseite eingebunden wird oder beim der Messaging-Plattform veröffentlicht wird.

## Fazit

Wie eben beschrieben, kann die Entwicklung eines Chatbots von Grund auf recht umfangreich wirken. Dies hängt aber sehr stark von der Grösse und den Fähigkeiten des Chatbots ab. Einen einfacher Chatbot z.B. für ein Gewinnspiel ist bereits nach wenigen Tagen einsatzbereit. Bei einem sehr umfangreichen Chatbot mit vielen Absichten und Schnittstellen kann die Entwicklung aber durchaus auch mehrere Monate in Anspruch nehmen. Natürlich ist der riesige Vorteil einer Entwicklung von Grund auf die maximale Flexibilität und Möglichkeit praktisch alle Wünsche umsetzen zu können.
