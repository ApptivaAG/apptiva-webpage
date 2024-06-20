---
title: Softwareentwicklung unter NixOS - Mein Erfahrungsbericht
source: apptiva
slug: softwareentwicklung-unter-nixos
templateKey: blog-post
image:
  src: /assets/blog/softwareentwicklung-unter-nixos/image.jpg
  base64Placeholder: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoUlEQVR4nAGWAGn/AKKvr2lmXj4nHHZsZqevtmVqb4OMjr/S2QCswseGgnx0Sz2WiYeLlZojLDWGk5rt+v8AXXKFSEpPbVBJSUlYRUtZTEpJp62t8f7/AAAEFQADFBcfMxIcNUw6PJ5yW41+bXyDhwAqNkMEDyAlQlclO1FjWVlzamZlbXNVYGkAdYibAAUTHTlKHzxVBgUJNzxAnKivucjSl5I5inlZ/yIAAAAASUVORK5CYII=
  height: 869
  width: 1159
date: 2020-03-24T16:24:00.000Z
author: Patrik Stutz
description: 'Vor über 9 Monaten startete ich meine Arbeit bei der Apptiva. Und gleichzeitig auch mein Experiment mit NixOS.'
categories:
  - Linux
  - Nix
  - NixOS
---

Gleich beim Antritt meiner Arbeit bei der Apptiva im letzten Juni machte ich Gebrauch von einer der vielen Freiheiten, die den Mitarbeitern geboten werden: Die Wahl des Computers, Betriebssystems & der Entwicklungstools. Nach vielen Jahren der Entwicklung unter Windows bei meinem vorherigen Arbeitgeber nutzte ich diese einmalige Gelegenheit, um komplett auf Linux umzusteigen, nachdem ich dies privat schon länger getan hatte.

## Mein Weg zu Apptiva & Linux

Softwareentwicklung macht mir Spass. So viel Spass, dass ich auch privat immer wieder kleine Projekte für eigene Zwecke realisiere. Gerade für private Projekte, wo man kein Geld für teure Softwarelizenzen ausgeben kann (oder will), ist die riesige Anzahl an kostenloser und quelloffener Software einfach genial. Und wenn man schon überall, wo es möglich ist, mit frei verfügbarer Software arbeitet, dann führt natürlich auch an Linux kein Weg vorbei.

Dies war mein Motiv, als ich vor ca. 3 Jahren auf all meinen privaten Computern Arch Linux installiert habe. Das war zu Beginn nicht leicht. Doch durch das exzellente Wiki habe ich schnell & viel gelernt, sodass plötzlich alles ganz leicht von der Hand ging. Da die meisten Server-Anwendungen ohnehin unter Linux betrieben werden und ich nun auch zum Entwickeln Linux verwendete, fühlte es sich immer komischer an, wenn ich dann im Büro plötzlich wieder Windows benutzen musste.

Dann wechselte ich zu Apptiva. Hier wurde mir bei der Wahl des Betriebssystems freie Wahl gelassen. Dies war meine Gelegenheit, um auszuprobieren, ob sich Linux auch bei der Arbeit bewähren kann. Da all meine Teamkollegen aber zufrieden & problemlos mit ihren MacBooks entwickeln, wollte ich mich natürlich nicht blamieren. Ich konnte es mir also nicht leisten, dass mein Notebook nach einem Update nicht mehr hochfährt, was bei Arch Linux schon mal vorkommen konnte. Ich machte mich also auf die Suche nach einer Linux-Distribution, bei der das nicht passiert, und wurde fündig.

## NixOS

NixOS ist eine Linux-Distribution wie keine andere: So gut wie jeder Aspekt des Computers kann über eine einzige Konfigurationsdatei eingestellt werden. Dazu gehören die installierten Programme, die Benutzer, Zeitzone, Format, Sprache, Desktopumgebung und vieles, vieles mehr. Diese Konfigurationsdatei wird in der Sprache "Nix" geschrieben und erlaubt es, das System reproduzierbar zu konfigurieren & wiederherzustellen. Wenn man eine Änderung an der Systemkonfiguration macht und einem diese nicht gefällt, oder das System danach erst gar nicht mehr hochfährt, kann man in Sekundenschnelle wieder zur vorherigen Version zurückwechseln, welche garantiert wieder funktioniert.

Die Systemkonfiguration kann auch kinderleicht mit Git getrackt werden. Auf diese Weise weiss man immer genau was wann und warum geändert wurde. Kauft man sich nach ein paar Jahren wiedermal ein neues Notebook, könnte dies nicht einfacher sein. Man nimmt einfach die Konfigurationsdatei, und richtet damit das neue Notebook genau so ein, wie es das alte war. Wenn man nicht mehr benötigte Software entfernt, hat man auch immer die Garantie, dass diese restlos entfernt wird. Ein NixOS-System muss also nicht von Zeit zu Zeit neu installiert werden. Das aktivieren einer Konfiguration resultiert in exakt demselben Ergebnis, wie ein Neu-Aufsetzen des Systems.

Mein System verhält sich nun also ähnlich wie meine Software-Projekte. Ich kann unbekümmert Änderungen machen, im Wissen, dass ich jederzeit zu einem alten Stand zurückkehren kann. Allein diese Eigenschaft machte NixOS für mich als Entwickler zur idealen Wahl.

## Vorteile

### Reproduzierbar & stabil

Ich kann das System auf jeden beliebigen Zustand zurücksetzen, und das auf jedem beliebigen Computer.

### Deklarativ & übersichtlich

Ich habe die komplette Konfiguration meines Computers immer genau im Blick. Ich brauche mich nicht länger daran zu erinnern, wo ich was verstellt habe.

### Nix-Shell

Die Nix-Shell ist unter NixOS natürlich bestens integriert. Dabei handelt es sich um ein Entwicklungstool, mit dem man, genau wie bei NixOS das System, für ein Softwareprojekt eine eigene Umgebung mit klar definierten Abhängigkeiten erzeugen kann. Braucht also ein Projekt das JDK8 und ein anderes das JDK12, ist dies überhaupt kein Problem. Dasselbe gilt für Node.JS, Python und alle anderen erdenklichen Abhängigkeiten. Die Nix-Shell ist allerdings auch für alle anderen Linux-Distributionen und sogar für Mac verfügbar! Nix kann also auch ohne einen kompletten Wechsel auf NixOS sehr hilfreich sein. Für mich ist die Nix-Shell jedenfalls nicht mehr wegzudenken.

## Nachteile

Ziemlich schnell nachdem ich begonnen habe mit NixOS zu arbeiten, wurde ich mit folgenden Nachteilen konfrontiert:

### Komplett anders

Bei NixOS ist kaum etwas so wie auf anderen Distributionen. Allein schon der Aufbau des Dateisystems. Ist man sich von anderen Distributionen die Verzeichnisse /bin, /etc, /lib usw. gewohnt, so gibt es unter NixOS im Prinzip nur einen Ordner: /nix.
Da viele Softwares aber darauf aufbauen, dass diese Verzeichnisse existieren, müssen sie diesen vorgegaukelt werden. Bei allen Softwarepaketen aus dem riesigen **nixpkgs**-Repository wird das automatisch gemacht. Möchte man aber eine Software benutzen, die dort noch nicht vorhanden ist, muss man zu Tricks greifen.

### Lernkurve

Da für die Konfigurationsdatei die eigens entwickelte Sprache **Nix** zum Einsatz kommt, muss man diese natürlich erst lernen. Dies ist leider nicht so einfach, wie zu Beginn gedacht. Die Sprache ist zum Teil komplex, dafür aber auch sehr mächtig.
Im Endeffekt hat sich für mich der Aufwand aber ganz klar gelohnt.

### Entwicklertools zum Teil noch nicht gut integriert

Obwohl die Nix-Shell ein geniales Entwicklertool ist, gestaltet sich die Nutzung mit anderen Entwicklertools teils gar nicht so einfach. Ich hoffe, dies wird sich in Zukunft noch ändern.

## Arbeiten unter Linux

Viele hochwertige, kommerzielle Softwarepakete sind nicht für Linux erhältlich. Dies ist natürlich eine grosse Herausforderung, wenn trotzdem produktiv gearbeitet werden soll. Zum Glück ist Linux aber gerade bei Softwareentwicklern sehr beliebt, weshalb auch der Grossteil der unverzichtbaren Entwicklertools wie git, docker, VSCode oder IntelliJ unter Linux verfügbar sind. Die Entwicklung selbst ist hier also äusserst angenehm und es fehlt einem an nichts.

Die Arbeit bei der Apptiva besteht aber natürlich nicht nur aus Softwareentwicklung. Ab und zu müssen wir auch mal eine Rechnung schreiben oder ein paar schöne Grafiken erstellen. Erst hier hat für mich die eigentliche Herausforderung begonnen. Da bei Apptiva sonst jeder mit einem Macbook arbeitet, werden Dokumente und Präsentationen meist mit **Pages** oder **Keynote** erstellt. Diese Software ist unter Linux leider nicht verfügbar, weshalb ich auf **LibreOffice** ausweichen muss. Das funktioniert zwar sehr gut, bestehende Dokumente meiner Teamkollegen kann ich aber auch damit nicht editieren.

Ebenfalls etwas problematisch gestaltet sich das Erstellen von Grafiken. Weder die Adobe- noch die Affinity- Produkte werden für Linux angeboten. Es gibt hier zwar alternative Applikationen, diese spielen aber bei weitem nicht in der gleichen Liga. Ein Glück, dass sich Philip Schönholzer auch gerne der Grafiken annimmt.

Zur Kommunikation innerhalb der Firma verwenden wir glücklicherweise Slack, welches auch einen Linux-Client anbietet. Viele andere Tools sind Web-Apps, welche unter Linux ebenfalls problemlos zu verwenden sind.

## Fazit

![Patrik Stutz](patrik-stutz-prev.jpg)

NixOS macht sehr vieles richtig, aber auch anders. Dies will zuerst gelernt werden. Ist diese Hürde aber erstmal genommen, wird es schwierig, sich wieder von den Vorteilen loszureissen. Deshalb beabsichtige ich auch weiterhin NixOS zu benutzen und irgendwann vielleicht auch den einen oder anderen Team-Kollegen zu überzeugen. Vielleicht werde ich aber auch plötzlich durch fehlende Software zurück zu Windows oder einem Mac verbannt.
