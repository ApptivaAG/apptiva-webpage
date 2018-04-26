---
title: Qualitätsziele
path: qualitaetsziele
templateKey: blog-post
image: 'http://apptiva.ch/wp-content/uploads/2015/11/Qualitätsziele-A4.png'
date: 2015-11-06T09:48:05.000Z
author: linus-huesler
description: >-
  Qualitätsziele helfen, die für Ihr Vorhaben wichtigsten Qualitätsmerkmale bei
  Architekturentscheidungen zu berücksichtigen.
categories:
  - Softwarearchitektur
  - Apptiva kompakt
---

<h2 class="p1">Motivation</h2>
<p class="p1">Üblicherweise werden Anforderungen an ein System in Form von User Stories oder Anwendungsfällen beschrieben. Diese definieren, was das System fachlich können soll. Es gibt aber auch Anforderungen die über eine reine Funktionalität hinausgehen. Sie werden als nicht-funktionale Anforderungen oder immer öfter auch als Qualitätsmerkmale bezeichnet. In diesem “<a href="http://apptiva.ch/wichtige-hilfsmittel-in-kompakter-form/">Apptiva kompakt</a>” zeigen wir, wie Qualitätsziele helfen, die wichtigsten Qualitätsmerkmale bei Architekturentscheidungen zu berücksichtigen.</p>

<h2 class="p1">Qualitätsmerkmale</h2>
<p class="p1">Es gibt eine grosse Menge an möglichen Qualitätsmerkmalen. Die Norm ISO/IEC 92126 listet die oft verwendeten auf und verfeinert sie mittels beispielhaften Teilmerkmalen:</p>
<p class="p1"><img src="http://apptiva.ch/wp-content/uploads/2015/11/Softwarequalität.png" alt="Softwarequalität, Qualitätsziele" width="800" height="287" class="alignnone wp-image-1464 size-full" /></p>
<p class="p1">Dieser Überblick ist ein gutes Hilfsmittel beim Finden der für Ihre Softwarelösung relevanten Qualitätsmerkmale.</p>
<p class="p1">[sc:TaskBox fa-icon="fa-users" content="Schauen Sie die Qualitätsmerkmale in einem Workshop mit den Stakeholdern an und identifizieren Sie die für Sie wichtigsten drei bis maximal fünf." ]</p>

<h2 class="p1">Qualitätsziele</h2>
<p class="p1">Jetzt wo Sie die für Ihr Vorhaben wichtigsten Qualitätsmerkmale kennen, geht es darum diese etwas genauer zu beschreiben und als Qualitätsziele zu formulieren. Was ist zum Beispiel konkret mit Benutzbarkeit gemeint? Warum ist dies so wichtig und wo kommt die Anforderung her? Überlegen Sie sich auch was passieren könnte, wenn dieses Ziel verfehlt wird.</p>
<p class="p1">Leider ist es so, dass sich einzelne Qualitätsziele konkurrenzieren können (z.B. Anpassbarkeit und Performance). Legen Sie eine klare Priorisierung Ihrer Qualitätsziele fest, um im Zweifelsfall einfacher entscheiden zu können. Es hilft auch, die Priorisierung der Ziele zu begründen. Warum ist z.B. die Benutzbarkeit so wichtig und warum ist die Zuverlässigkeit weniger wichtig?</p>
<p class="p1">[sc:TaskBox fa-icon="fa-bullseye" content="Erläutern Sie Ihre topp Qualitätsmerkmale und formulieren Sie diese als Qualitätsziele. Priorisieren Sie diese und begründen Sie die Reihenfolge." ]</p>
<p class="p1">Beispiel:</p>
<p class="p1">Hohe Verfügbarkeit (Prio 1)
Die Mitarbeiter der Notfallabteilung sind auf eine ständige Verfügbarkeit der Patientendaten angewiesen um jederzeit alle relevanten Informationen im Zugriff zu haben. Fällt das System aus, entsteht durch die Informationslücke eine direkte Gefahr für den Patienten.</p>

<h2 class="p1">Qualitätsszenarien</h2>
<p class="p1">Um Architekturentscheide treffen oder eine bestehende Architektur bewerten zu können, reichen die Qualitätsziele alleine noch nicht aus. Diese müssen weiter konkretisiert und mit Messwerten versehen werden. Bei einigen Qualitätszielen geht dies einfacher (z.B. Antwortzeiten), bei anderen ist es schwieriger (z.B. Benutzbarkeit). Qualitätsszenarien helfen dieses Problem zu lösen. Sie beschreiben z.B. exemplarisch die Verwendung des Systems, sodass ein Qualitätsziel die Hauptrolle spielt. Eine grosse Stärke von Qualitätsszenarien ist, dass sie eine gute Basis bieten, worüber sich Stakeholder und Softwareentwickler austauschen können, denn oftmals sind bei solchen Diskussionen auch fachliche Entscheidungen betroffen.</p>
<p class="p1">[sc:TaskBox fa-icon="fa-bug" content="Definieren Sie für jedes Qualitätsziel mindestens ein bis maximal fünf Szenarien. Denken Sie neben Verwendungsszenerien auch an Änderungsszenarien (z.B. mehr Benutzer) und an Fehlerszenarien (z.B. Systemausfall)." ]</p>
<p class="p1">Szenario zu Benutzbarkeit:</p>

<ul>
	<li>Eine Pflegefachfrau ruft das Patientendossier eines Patienten auf. Das System zeigt alle relevanten Daten unter einer Sekunde an.</li>
</ul>
Szenario zu Verfügbarkeit:
<ul>
	<li>Das Netzwerk fällt komplett aus. Die Mitarbeiter der Notfallabteilung können auf speziell definierten Arbeitsstationen alle Funktionen des Dashboards für bereits angemeldete Patienten aufrufen und zusätzlich neue Patienten voranmelden.</li>
</ul>
<h2>Fazit</h2>
<p class="p1">Qualitätsziele und -szenarien helfen beim Fällen von Architekturentscheide und machen Softwarearchitektur nachvollziehbar. Wir nehmen sie bei all unseren Entwicklungsprojekten zur Hilfe und haben damit durchwegs gute Erfahrungen gemacht.</p>
<p class="p1">[button animation="fadeInUp" link_url="http://apptiva.ch/wp-content/uploads/2015/11/Qualitätsziele-A4.pdf" title="Download PDF" scroll="false" target="_blank" lightbox="false" color="#FFFFFF" background="#008FD7"]</p>

<h2 class="p1">Weitere Infos</h2>
<ul>
	<li class="li1"><a href="http://www.swadok.de" target="_blank">http://www.swadok.de</a> - das Buch über Architekturdokumentation, von Stefan Zörner</li>
	<li class="li1"><a href="http://www.arc42.de" target="_blank">http://www.arc42.de</a> - ein praktisches Template zur Dokumentation von Softwarearchitekturen</li>
	<li class="li1"><a href="https://de.wikipedia.org/wiki/ISO/IEC_9126" target="_blank">https://de.wikipedia.org/wiki/ISO/IEC_9126</a> - Beschreibung der Norm sowie der Teilmerkmale</li>
</ul>
