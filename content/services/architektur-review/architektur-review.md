---
templateKey: 'service-page'
slug: architektur-review
title: Architektur-Review
image: architektur-review.jpg
author: Markus Tanner
description: Es gibt viele Situationen, bei welchen Architektur-Reviews von Bedarf sein können. Doch wieso entsteht dieser Bedarf überhaupt?
---

Ein Produkt wird neu entwickelt. Wie stellt man sicher, dass die richtigen Architekturentscheidungen getroffen werden?
In einem Unternehmen fehlt das Vertrauen in die eigene Lösung. Liegt es an der Architektur?
Bei einem etwas in die Jahre gekommenen Produkt stehen weitreichende Anpassungen an. Sind es die richtigen? Wie soll dabei vorgegangen werden?

Bei jedem Softwareprojekt befindet man sich im Spannungsfeld von Qualität, Zeit und Kosten. Das sogenannte „Qualitätsdreieck“ illustriert den Kompromiss, welcher bei der Entwicklung von Software eingegangen werden muss.

<p style="text-align:center;"><img src="qualitaetsdreieck.png" style="width:50%;" alt="Qualitätsdreieck"></p>

Und wie das halt im Leben so ist, kann man nicht alles auf einmal haben. Bei einem Projekt liegen bestenfalls zwei Eigenschaften aus dem Dreieck drin. Will man wenig Geld investieren und dennoch schnell am Markt präsent sein, leidet bestimmt die Qualität bei diesem Vorhaben. Werden hohe Qualität und kurze Entwicklungszeit vorausgesetzt, braucht man exzellente Leute, welche die Lösung entwickeln. Meistens sind die besten Leute nicht die günstigsten.

Im Normalfall müssen also Kompromisse eingegangen werden. Dabei werden manchmal Entscheide gefällt, welche schwerwiegende Folgen für das Projekt haben können. Gute Architekturentscheidungen zu treffen ist einfacher, wenn man Qualitätsszenarien definiert.

## Qualitätsszenarien

Für Kosten und Time-To-Market gibt es Einheiten, welche gut messbar sind. Im Normalfall gibt es ein Budget für ein Produkt und einen entsprechenden Zeitplan. Doch wie misst man die Qualität einer Software?
Ob eine Softwarearchitektur gut ist, kommt immer auf den Kontext an, in welcher sich die Lösung befindet. Je nach Umfeld sind unterschiedliche Qualitätsmerkmale relevant. Daher ist es wichtig, dass diese zusammen mit den Stakeholdern identifiziert werden. Dazu gehören beispielsweise Benutzbarkeit und Sicherheit. Sind die wichtigsten Qualitätsmerkmale bekannt, können entsprechende Qualitätsziele definiert und priorisiert werden.
Zu den einzelnen Zielen werden schliesslich Qualitätsszenarien definiert. Die Szenarien helfen dabei, die Qualität aus unterschiedlichen Blickwinkeln zu betrachten und sind auch für etwas weniger technisch angehauchte Personen verständlich. Ein Szenario zur Benutzbarkeit könnte z.B. wie folgt lauten: “Eine Pflegefachfrau ruft das Patientendossier auf. Das System zeigt alle relevanten Daten in weniger als einer Sekunde an.”

## Ablauf eines Reviews

1.  Das gemeinsame Verständnis von Qualitätsmerkmalen und -zielen ist die Voraussetzung für die Analyse der Architektur. Nur mit diesen Grundlagen kann nämlich die Angemessenheit der Architektur geprüft werden. Architekturentscheidungen sollten mit den Qualitätszielen übereinstimmen, ansonsten ist man definitiv auf dem Holzweg und geht womöglich unnötige Risiken ein.

2.  Nebst der Angemessenheit der Architektur wird auch der Entwicklungsansatz an sich bewertet. Entsprechen die eingesetzten Tools den Best-Practices? Ist die Architektur verständlich und einfach nachvollziehbar? Ist die Architektur in der Firma gut kommuniziert und stehen die Mitarbeitenden dahinter?

3.  Nun wird eine Verifikation auf Code-Ebene durchgeführt. Es mögen diverse Konzepte existieren, doch werden diese im Code auch widerspiegelt?

[[right]]
|![Review](review-analyse.png)

4.  Schliesslich werden die Ergebnisse aus den vorhergehenden Punkten zusammengeführt. Es werden die Risiken ermittelt und die wichtigsten Erkenntnisse formuliert. Dies passiert wiederum unter der Berücksichtigung der Qualitätsziele.
