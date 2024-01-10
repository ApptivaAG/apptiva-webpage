---
layout: blog
source: bubble-chat
slug: können-chatbots-selbständig-lernen
tags: blog
date: 2022-11-29
title: Können Chatbots selbständig lernen?
excerpt: Diese Frage wird oft gestellt. Der Blogpost erläutert die Möglichkeiten der Lernfähigkeit eines Chatbots und erklärt, wie Bubble Chat mit der Thematik umgeht.
image: learn.jpg
imageCopy: Foto von <a href="https://unsplash.com/@aaronburden?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Aaron Burden</a> auf <a href="https://unsplash.com/de/fotos/QJDzYT_K8Xg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
author: Markus Tanner
---

Dieses Jahr wurde auf verschiedenen Technologie-Kanälen über den Chatbot [Blenderbot 3](https://www.golem.de/news/blenderbot-3-metas-chatbot-aeussert-antisemitische-verschwoerungen-2208-167479.html){target="_blank"} von Meta und die antisemitischen Verschwörungen berichtet, auf die der Chatbot geantwortet hat. Im Jahr 2016 hat ein Projekt von Microsoft ein ähnliches Schicksal ereilt, als der Chatbot [Tay](https://www.golem.de/news/tay-microsofts-chat-bot-wird-zum-rassisten-1603-119976.html){target="_blank"} frauenfeindliche Äusserungen und eine Vorliebe für Adolf Hitler gezeigt hat.

Solche Ereignisse bringen uns natürlich zum Nachdenken über die Programmierung oder auch über den Lernprozess dieser Chatbots. Kann ein Chatbot selbständig lernen oder wie lernt ein Chatbot überhaupt?

Auch wenn Chatbots mehr als nur regelbasierte Logik sind, können wir behaupten, dass Chatbots von einer Logik ausgehend entwickelt werden und dieser dann weiter folgen. Allerdings antwortet ein Chatbot in den meisten Fällen mit einer vorprogrammierten Antwort. Hiermit ist gemeint, dass Chatbots meistens nicht selbst eine Sprache erzeugen können. Obwohl es heutzutage Technologien dazu gibt. Dies nennt sich auch “Natural Language Generation”: Dabei zieht die Software relevante Informationen aus einem strukturierten Datensatz und fügt sie in einen Absatz oder Satz ein.

Das Gegenstück dazu ist das “Natural Language Understanding”. Im Wesentlichen bedeutet es, dass bestimmte Wörter und Sätze “gehört” und schliesslich einer Absicht zugeordnet werden. Es gibt mehrere Möglichkeiten, etwas zu fragen, auch wenn der Gegenstand der Frage derselbe ist. Hinzu kommt die nächste Ebene der Komplexität, nämlich das Verständnis des Kontextes. Je nach Verlauf des Gesprächs kann dieselbe Äusserung eine unterschiedliche Bedeutung haben.

Beide Formen des "Understandings" müssen von Chatbots gelernt und trainiert werden.

## Wieso kann der Lernprozess eines Chatbots kritisch sein?

Chatbots können automatisch lernen, denn sie können Daten aus der Vergangenheit analysieren und Annahmen darüber treffen, was richtig ist nach ihrer Logik. Sie kopieren dazu Benutzerinteraktionen und verwenden diese weiter.

Allerdings ist beim Training des Chatbots meistens ein Mensch in den Prozess involviert. Chatbots, die zu 100% mit künstlicher Intelligenz entwickelt werden, können fehlerhaft sein, ähnlich wie im Fall von Meta und Microsoft. Künstliche Intelligenz nimmt auch unangemessene Sprache auf. Ohne ein Review durch menschliche Agenten ist die Verallgemeinerung von Daten und Wissen immer mit einem erhöhten Risiko verbunden. Deshalb ist es wichtig, dass ein Mensch einspringt, um die Sprache zu überprüfen und zu korrigieren, insbesondere im Hinblick auf die Frage, ob es erlaubt ist, etwas zu sagen oder nicht.

Das Training des Chatbots ist oft aber auch ein ausschliesslich manueller Vorgang. Die Trainingsätze werden dabei von Menschen erfasst. Die Daten für die Erstellung von Machine-Learning-Modellen werden hierbei nicht von der Maschine selbst erweitert.

## Welche Art des Lernens verwendet Bubble Chat?

Bei Bubble Chat haben wir uns für ein von Menschen unterstütztes Lernen entschieden. Bubble Chat merkt sich die Äusserungen von Benutzern, die nicht einer existierenden Absicht zugewiesen werden konnten. Beim Trainieren des Chatbots muss entschieden werden, ob für diese Äusserungen eine neue Absicht erstellt werden muss, oder ob bereits ähnliche Inhalte existieren.

Diese Daten werden anschliessend verwendet, um ein Machine-Learning-Modell zu erstellen. Dank einem solchen Modell kann zur Laufzeit sehr schnell ermittelt werden, um welche Absicht es sich handelt bei einer Benutzeräusserung. Zudem versteht ein Chatbot dank diesen Modellen auch Formulierungen, welche nicht 1:1 so in den Trainingsdaten enthalten sind. Die Qualität dieser Modelle ist ein kritischer Erfolgsfaktor für einen Chatbot. Sind die Modelle schlecht, sind auch die Antworten des Chatbots grösstenteils schlecht.

Die Erstellung solcher Modelle ist aufwändig und ressourcenintensiv. Wir setzen dazu in der Regel [Dialogflow](https://cloud.google.com/dialogflow){target="_blank"}, einen Cloud-Dienst von Google, ein. Die Modelle werden dabei verhältnismässig schnell erstellt und weisen eine überdurchschnittlich gute Qualität auf.
Nicht in jeder Umgebung ist es aber möglich, auf einen Cloud-Dienst in der EU zuzugreifen, z.B. aus datenschutzrechtlichen Gründen. In diesen Fällen gibt es glücklicherweise Alternativen, welche mit Bubble Chat ebenfalls angebunden werden können.

## Können Chatbots nun selbständig lernen?

Kommen wir zur Titelfrage zurück. Und die Antwort ist “Ja, klar können sie das”. Sie können es aber leider noch viel zu wenig gut. Die negativen Beispiele von Microsoft und Meta haben gezeigt, dass sich Chatbots sehr schnell unerwünschte Inhalte aneignen können. Und das Risiko von politisch inkorrekten oder gar rassistischen Äusserungen will und kann niemand eingehen.

Auch ohne selbständiges Lernen bringen Chatbots jedoch grossen Mehrwert und können eine Menge Arbeit abnehmen. Die Voraussetzung ist, dass man sich dem Chatbot immer mal wieder widmet und ihn laufend trainiert.
