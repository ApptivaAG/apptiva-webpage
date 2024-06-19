---
title: 'App, Web App oder gar PWA?'
source: apptiva
slug: vor-und-nachteile-apple-ios-google-android-app-webapp-pwa
templateKey: blog-post
image:
  src: /assets/blog/2021-05-native-vs-web-app/native-app-vs-web-app.png
  base64Placeholder: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUUlEQVR4nGNgYGA4d/fpmRtPGMDg0aNHT548+f//P4iz5emvg+/ALAaGmzdvnjt3Dipx+O6de49vQySuXr164cIFqERPdlFheiFEohUMGBgYAJ99LW/0E4QmAAAAAElFTkSuQmCC
  height: 949
  width: 1800
date: 2021-05-17
author: Philip Schönholzer
description: >-
  Steht die Entwicklung einer App für Apple iOS oder Google Android an, stellt sich oft die Frage, ob eine Web App oder eine PWA auch reicht. Hier zeigen wir die Vor- und Nachteile von nativen Apps, Web Apps und PWAs auf.
categories:
  - Allgemein
---

## Was sind native Apps, Web Apps und PWAs?

Um eine App auf einem Smartphone oder Tablet zu verwenden, gibt es mehrere Technologien. Diese unterscheiden sich nicht nur in den technischen Möglichkeiten der App, sondern auch _wo_ die App verfügbar ist. Grundsätzlich gibt es zwei Technologien, um eine App auf dem Smartphone einzusetzen: Native oder Web.

### Native App

Wenn von einer nativen App gesprochen wird, ist damit eine App gemeint, welche speziell für Apple iOS und/oder Google Android entwickelt wird. Der Code für die iOS-App läuft nur auf iOS und nutzt die Möglichkeiten von iOS voll aus. Dasselbe gilt bei einer Native App für Android. Eine native App wird ausserdem über den Store des entsprechenden Unternehmens (Apple oder Google) verteilt. Dies heisst aber auch, dass eine native App grundsätzlich zuerst heruntergeladen und installiert werden muss. Eine heruntergeladene App kann dann über ein Icon auf dem Start-Bildschirm immer wieder geöffnet werden. Updates werden auch über die Stores von Apple und Google verteilt.

### Web App

Wird von [Web App Entwicklung](/angebot/development/webentwicklung) gesprochen, so heisst dies, dass die App mit Web-Technologien entwickelt wurde. Dies sind dieselben Technologien, um Webseiten zu entwickeln: HTML, CSS und Javascript. Eine Web App kann alles, was eine Webseite auch kann und von Apple und Google in ihren Browsern zugelassen wird. Genau wie eine Webseite kann einen Web App irgendwo publiziert und ohne Installation genutzt werden. Auch das Update einer Web App passiert einfach mit jedem Aufruf der Web App, ohne dass ein Update im Store heruntergeladen werden muss. Das Icon für eine Web App erscheint nicht automatisch auf dem Startbildschirm des Smartphones. Dies müssen die Anwender explizit zulassen oder selber hinzufügen. Es ist möglich, eine Web App auch in den Stores von Apple und Google zu publizieren, was aber mit zusätzlichem Entwicklungsaufwand verbunden ist.

### PWA

Eine PWA ist eine spezielle Web App. PWA steht für Progressive Web App. Damit ist gemeint, dass die Web App spezielle Instruktionen für Google und Apple haben, damit die App einer nativen App ähnlicher sieht. Eine PWA lässt sich dadurch einfacher auf einem mobilen Gerät installieren als eine Web App. Ansonsten gilt dasselbe wie für eine Web App. (Siehe auch [PWA Apps](/blog/pwa-apps))

## Unterschiede von nativen und Web Apps

Native und Web Apps haben vieles gemeinsam, aber doch einige klare Unterschiede. In der folgenden Tabelle zeigen wir diese auf.

| Faktor                  | Native App                          | Web App                           |
| ----------------------- | ----------------------------------- | --------------------------------- |
| Kosten                  | Höhere Kosten                       | Tiefere Kosten                    |
| Entwicklungsdauer       | Längere Entwicklung                 | Kürzere Entwicklung               |
| Aufwand                 | Je eine App für iOS und Android     | Selbe Web App für iOS und Android |
| App-Icon auf Homescreen | Automatisch nach der Installation   | Manuell durch die Anwender        |
| iOS/Android-Features    | Alle                                | Fast alle                         |
| App-Geschwindigkeit     | Nur abhängig vom Endgerät           | Aufwändige Darstellung langsamer  |
| Ort der Publikation     | Store (App-Store, Play-Store)       | Überall auf dem Web               |
| Eintrag im Store        | Automatisch mit Eintrag-Inhalt      | Nur mit zusätzlichem Aufwand      |
| Monetarisierung der App | Über den Store + Anteil an Store    | Aufwändiger, aber flexibler       |
| Review                  | Review durch Apple/Google zwingend  | Kein Review nötig                 |
| Installation            | Fast immer nötig                    | Keine Installation nötig          |
| Update                  | Über den Store                      | Durch Öffnen der Web App          |
| Deinstallation          | Zwingend über das Icon der App      | Nicht nötig                       |
| Updates verfügbar       | Tage / Wochen nach dem Einreichen   | Sofort                            |
| Sperren der App         | Sperrung durch Apple/Google möglich | Unmöglich                         |

### Unterschiede bei den Kosten und dem Aufwand

Kosten, Entwicklungsdauer und Aufwand hängen alle zusammen. Der Aufwand für eine Web App ist kleiner, da dieselbe App auf iOS und Android läuft und somit nur eine App entwickelt werden muss. Zudem ist das Veröffentlichen einer App im Store immer mit Aufwand verbunden. Einerseits muss die App durch das Review von Apple und Google kommen, was häufig nicht auf Anhieb klappt. Andererseits müssen die Inhalte für die jeweiligen Stores zusammengestellt werden.

### Features von nativen und Web Apps

Bei den Features gibt es einige Dinge, die nur mit einer nativen App möglich sind. Dies sind bei iOS die Notifikationen. Das ist nur bei einer nativen iOS-App möglich. Zudem ist es bei Android wie auch iOS nicht möglich, eine Web App im Hintergrund arbeiten zu lassen, während der Bildschirm ausgeschaltet ist oder eine andere App im Vordergrund ist. Falls dies möglich sein soll, muss zwingend eine native App bevorzugt werden.

Ein grosser Vorteil von nativen, installierten Apps aus den Stores ist zudem, dass die App jederzeit über das App-Icon auf dem Startbildschirm aufgerufen werden kann. Bei Web Apps müssen die Anwender selber daran denken die App auf den Startbildschirm hinzufügen, falls sie überhaupt wissen, wie dies möglich ist.

### Stores von Apple und Google

"Nur" native Apps gelangen in den Store von Apple und Google. Mit etwas Aufwand ist es zwar möglich, eine Web App im Store zu veröffentlichen, aber dann müssen gute Gründe vorhanden sein, weshalb man nicht gleich eine native App entwickelt. Die Stores bringen so einige Vor- und Nachteile mit sich. Zum einen schauen Apple und Google jede App und jedes Update mehr oder weniger genau an, bevor dieses im Store veröffentlicht wird. Falls ihnen etwas nicht passt, muss man den Wünschen von Apple und Google nachkommen. In einigen Fällen wird die Veröffentlichung durch Apple und Google sogar komplett verhindert. Andererseits ist es einfach möglich, eine App im Store zu monetarisieren. In diesem Fall beanspruchen Apple und Google aber einen Anteil jedes Verkaufs für sich.

## Richtig für iOS/Android-App oder Web App entscheiden

Nach den folgenden drei Fragen ist es vermutlich klarer, ob es eine native oder eine Web App werden soll.

1. **Ist ein Feature der App nur mit einer nativen App möglich?** Falls ein Feature der App nur native möglich ist, ist relativ klar, dass es eine native App sein muss.

1. **Wird die App von den Anwendern mehrmals pro Jahr eingesetzt?** Eine native App sollte von den Anwendern mindestens ein paar Mal pro Jahr eingesetzt werden, ansonsten scheuen sie die Installation.

1. **Fällt die App durch aufwändige Grafiken auf?** Eine native App ist leistungsfähiger und schont die Batterie eher bei aufwändigen Grafiken.

Falls bei keiner dieser Fragen klar mit "Ja" geantwortet werden kann, ist eine Web App wahrscheinlich zu Beginn der bessere Ansatz. Zudem ist es mit etwas Voraussicht immer möglich eine Web App später zu einer nativen App umzubauen.

Überlegen Sie, eine native oder eine Web App ins Leben zu rufen? Wir helfen gerne bei der Umsetzung. Mit unserer langjährigen Erfahrung mit nativen wie auch Web Apps können wir beurteilen, welcher Ansatz sich für Ihr Vorhaben besser eignet.
