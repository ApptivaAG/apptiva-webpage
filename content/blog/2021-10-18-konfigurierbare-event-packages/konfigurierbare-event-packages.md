---
title: Konfigurierbare Event-Angebote verkaufen und per QR-Code einlösen
slug: konfigurierbare-event-angebote-verkaufen-und-per-qr-code-einloesen
templateKey: blog-post
image: hero.png
date: 2021-10-22
author: Philip Schönholzer
description: >-
  Das Grandcasino Bern nutzt seit über einem Jahr unseren Konfigurator, um Event-Packages online anzubieten und per QR-Code einzulösen. Da dies eine spannende Lösung ist, wollen wir diese her etwas genauer vorstellen.
categories:
  - Allgemein
---

Schon seit mehreren Jahren bietet das Grandcasino Bern unterschiedliche Event-Packages (z.B. "Fondue Chinoise & Casino") online zum Verkauf an. Diese konnten aber nur telefonisch bestellt werden und die Zahlung fand vor Ort statt. Die Administration musste zudem für jede Bestellung bei den involvierten Leistungserbringern (meistens Restaurants) nachfragen, ob sie noch genügend Platz hatten und eine Reservation platzieren.

Als das Casino uns vor über zwei Jahren kontaktierte, war ihre Hoffnung mehr Umsatz und weniger Aufwand über den Online-Shop zu machen. Dies wollten Sie wie folgt erreichen: 

- Die Kunden kaufen und bezahlen die Packages direkt im Onlineshop.
- Die Prüfung der Kapazität erfolgt automatisch.
- Bei der Buchung wird die Leistungen direkt beim Leistungserbringer reserviert.
- Die Gäste erhalten eine QR-Code, mit welchem alle Leistungen eingelöst werden können.
- Die Casino-Backoffice-Mitarbeiter:innen erfassen neue Angebote oder Angebotsanpassungen direkt im Konfigurator.
- Die Buchhaltung hat zugriff auf Verkaufs-, Einlöse-Daten und sehen welche Leistungen noch offen sind.

## Der Angebots-Konfigurator

Kernstück der neuen Lösung ist der Angebots-Konfigurator, welcher im Rahmen des Projekts meistens "Package-Konfigurator" genannt wird. Dieser erlaubt es dem Casino selbstständig bestehende Angebote anzupassen oder neue zu erfassen.

![Konfigurator](./konfigurator.png)

Die Mitarbeiter:innen des Casinos können hier neue Leistungserbringer und deren Leistungen erfassen. Diese können sie schliesslich in Packages einsetzen. Ein neuer Leistungserbringer (z.B. ein neues Restaurant) kann so innerhalb weniger Minuten ins Angebot aufgenommen werden.

## Schnittstelle zu den Leistungserbringern

Die Leistungserbringer werden z.Z entweder über Email über eine Reservation informiert oder über die Restaurant-Reservations-Schnittstelle von Aleno. Die Kapazität der Leistungserbringer speichern wir entsprechend der vereinbarten Quota bei uns in der Software oder prüfen die Kapazität ebenfalls über Aleno. Mit Email haben wir eine sehr einfache "Anbindung" von Leistungserbringer, welche in jedem Fall funktioniert. Bei Restaurants mit Aleno können wir die Kapazitätsprüfung und Reservation sehr genau vornehmen und entsprechend den administrativen Aufwand nochmals reduzieren.

## Kapazität prüfen

Damit die Gäste bei der Ankunft nicht vor einem ausgebuchten Restaurant stehen, muss beim Buchen für Event mit Kapazitätsgrenzen, ein Timeslot ausgewählt werden. Die angebotenen Timeslots haben noch Kapazität frei. Nach der Buchung wird im entsprechenden Timeslot die Kapazität reduziert.

![Kapazität auswählen](./kapazitaet.png)

Falls für ein Event am gewünschten Tag keine Kapazität vorhanden ist, schlagen wir alternative Tag oder Events mit genügend Kapazität vor.

## Eigenes Angebot konfigurieren

Falls das bestehende Angebot nicht genau den Geschmack einer Kundin oder eines Kunden treffen, ist es möglich aus den bestehenden Leistungen sich ein eigenes Package zusammen zu stellen.

![Package Mixer](./package-mixer.png)

Diese Leistungen stellen die Kunden und Kundinnen nach belieben zusammen. Welche Leistungen in Frage kommen, kann das Casino ebenfalls konfigurieren. 

## Zahlung 

Die Zahlung der Leistungen erfolgt online direkt im Shop. Die Kundinnen und Kunden können in gewissen Situation aber auch erst "vor Ort" bezahlen. In diesem Fall sehen die Leistungserbringer beim Einscannen des QR-Codes (siehe unten), dass es noch offene Zahlungen gibt und diese entsprechen eingenommen werden müssen. Erst wenn dies der Fall ist, können Leistungen überhaupt eingelöst werden. So ist sicher gestellt, dass ab der ersten Station des Events jegliche ausstehende Zahlungen beglichen sind. 

Neben der Online-Zahlung und der Zahlung vor Ort gibt es für grössere Gruppen auch die Möglichkeit mit einer Rechnung zu bezahlen. Diese Rechnung wird ebenfalls im Admin-Panel des Angebots-Konfigurators erstellt. Bei der Rechnung gibt es noch die zusätzliche Herausforderung, dass die Zahlung des Spielgelds aufgrund der Gesetzeslage zwingende vor der Herausgabe stattfinden muss. In diesem Fall muss unsere Lösung den Leistungsbezug des Spielgelds verhindern, solange diese nicht per KK oder Bargeld geglichen ist.

## Tickets oder Gutscheine per Email erhalten

Bei Checkout wählen die Kundinnen und Kunden aus, ob sie direkt ein Ticket für den Event oder lieber einen Gutschein zum Schenken erhalten wollen. Nach der Bezahlung erhalten die Gäste per Email einen QR-Code mit welchem die Leistungen bezogen werden können.

<div style="max-width: 400px; margin-left: auto; margin-right: auto">

![Email](email.png)

</div>


## Per QR-Code Leistungen einlösen

Um die Leistungen beziehen zu können, müssen die Besucher:innen bloss ihr Handy mit dem QR-Code im Email zücken. Die Leistungserbringer sind in der Lage über unsere Lösung den QR-Code zu scannen, um zu prüfen ob der QR-Code gültig ist und um die Leistung schliesslich einzulösen. Die QR-Codes können pro Person oder pro Gruppe erstellt und eingelöst werden, damit bei grösseren Gruppen nicht jeder Gast das Handy hervornehmen muss.

<div style="max-width: 400px; margin-left: auto; margin-right: auto">

![QR-Code scannen](scanner.png)

</div>

## Integrierte Buchhaltung

Jede verkaufte und eingelöste Leistung, sowie alle Zahlungen werden bei uns im System für die Buchhaltung und das Management aufbereitet. So ist immer klar, wie sich der Umsatz entwickelt, welche Zahlungen wann eingegangen sind, wann die Leistungen erbracht wurden und welche Leistungen noch offen sind. 

Wer bereits einmal ein solches System umgesetzt hat, weiss dass dies mit teils grösseren Herausforderungen verbunden ist. So ist es z.B. möglich Teilzahlungen vorzunehmen, die Anzahl einer Buchung später anzupassen und entsprechend die Zahlungen vorzunehmen. Auch ist es möglich vor dem Event noch die Postionen des Events anzupassen oder ganz neue Position hinzuzufügen. Da dies alles über die Monatsgrenze hinaus passieren kann, und in einem abgeschlossenen Monat nie etwas angepasst werden darf, stellte uns dies vor ein paar Hürden, welche wir aber als gemeistert abhaken dürfen.

## Fazit

Mit dem neuen Konfigurator wurde der Verkauf vereinfacht und administrative Aufwand deutlich reduziert. Zudem ist das Grandcasino Bern nun viel dynamischer in der Angebotserstellung. Gibt es einen temporären, coolen Event in der Stadt, welche das Casino mit einem Besuch im Casino verknüpfen will, so können sie ein solches Angebot innerhalb von wenigen Minuten online schalten. Ob das Casino die Umsatzziele erreicht hat, kann ich hingegen nicht beantworten.
