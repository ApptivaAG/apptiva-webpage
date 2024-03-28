---
title: 'Erfahrungen mit Electron und Webview'
source: apptiva
slug: erfahrungen-mit-electron-webview
templateKey: blog-post
image:
  src: /assets/blog/electron-webview-oder-iframe/electron-webview.png
  base64Placeholder: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAIAAAAhqtkfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARUlEQVR4nGPomzi9vXvS/////6ECBgZ2CQZ+mfv37z948ODtu3e379x98ODh8xcvGfqnzOrsm/r///+/f/78+/fvDwwAAD1POqjPCVt+AAAAAElFTkSuQmCC
  height: 600
  width: 1920
date: 2020-05-15
author: Renato Wasescha
description: >-
  In einigen Projekten konnten wir wertvolle Erfahrungen mit dem Electron Framework sammeln. In diesem Blogbeitrag gebe ich einen Überblick über meine Erkenntnisse.
categories:
  - Allgemein
---

## Anforderungen

Bei Anforderungen für eine Desktop Applikation werden oft folgende Punkte genannt:

- Navigation in mehreren Tabs muss flexibel und editierbar sein
- Drag & Drop
- Automatisches Login für Basic authentifizierte Seiten
- Globale Tastenkombinationen erstellen und eigene Befehle ausführen
- Applikation im Kiosk-Modus oder Vollbildmodus starten
- Applikation per Konfiguration (config.json) starten und diese während der Installation in den vordefinierten Pfad kopieren
- Automatische Updates
- EV Code Signing Certificates
- Für Windows und Linux bereitstellen

## Herausforderungen

Dabei ist eine der grössten Herausforderungen wohl die Navigation zwischen mehreren Seiten. Da die Applikation mit mehreren Tabs - wie in einem Browser - klarkommen sollte, haben wir zunächst mal etwas Recherche betrieben. Auf der offiziellen Electron-Webview Dokumentation erscheint zu Beginn dann aber leider folgende Warnung:

> ### Warnung
>
> Der Webview-Tag von Electron basiert auf dem Webview von Chromium, dessen Architektur dramatischen Veränderungen unterworfen ist. Dies wirkt sich auf die Stabilität der Webansichten aus, einschliesslich Rendering, Navigation und Ereignis-Routing. Wir empfehlen derzeit, das Webview-Tag nicht zu verwenden und Alternativen wie iframe, Electron's BrowserView oder eine Architektur in Betracht zu ziehen, die ganz auf eingebettete Inhalte verzichtet.
> <br />
> Quelle: [electronjs.org/Docs/API/Webview-Tag](https://www.electronjs.org/docs/api/webview-tag)

Aufgrund dieser aktuellen Entwicklungen müsste man eigentlich auf Webview in Electron Apps verzichten. Allerdings haben iframe oder BrowserView ebenfalls ihre Nachteile, die dann wieder eher für den Einsatz von Webview sprechen. Auf diese Vor- und Nachteile möchte ich nun kurz eingehen.

## Vor- und Nachteile

### iframe

Ein iframe kennt wohl jeder Entwickler und hat höchstwahrscheinlich Erfahrung damit. Der Vorteil liegt eigentlich nur darin, dass iframes schnell eingebunden werden können und man schnell zu Ergebnissen kommt. In einer Electron Applikation würden alle Frames im gleichen Prozess laufen. Bei der Verwendung von mehreren iframes könnte dies zu Problemen führen. Eine einzelne Webseite, die abstürzt, könnte somit die ganze Applikation zum Absturz bringen.

### BrowserView

Das Hauptfenster wird in Electron in einer BrowserView gestartet. Meistens reicht dies aus und ist wohl die beste Wahl, Inhalte darzustellen. Wenn jedoch in diesem Hauptfenster andere Inhalte von anderen Webseiten dargestellt werden sollen, geht kaum ein Weg an iframes oder Webviews vorbei.

### Webview

Der einzige Nachteil ist, dass die Webview unter Electron aktuell einschneidenden Veränderungen unterworfen ist. Dies fordert vom Entwickler mehr Aufwand und viel Flexibilität. Dennoch sind wir von der Apptiva überzeugt, dass Webview nach wie vor die qualitativ beste Lösung ist, und wir diesen Mehraufwand gerne auf uns nehmen.

Webview hat immer noch zahlreiche überzeugende Vorteile. Einer davon ist, dass jede Webseite, die in einer Webview geladen wird, in einem separaten isolierten Prozess läuft. Die Interaktionen zwischen der Anwendung und dem eingebetteten Inhalt erfolgen asynchron. Dies sollte sich auf die Stabilität der Applikation positiv auswirken, auch wenn eine eingebundene Webseite abstürzen sollte. Die Anwendung ist vor dem eingebetteten Inhalt geschützt. Ausserdem laufen gewisse Webseiten, die in iframes nicht alle Funktionalitäten haben, in Webview reibungslos.

## Wichtiges in der Entwicklung mit Electron

### Webview in Electron zulassen

Wenn wir mit der Electron Version >=5 arbeiten, müssen wir zuerst Webview zulassen. Dies können wir folgendermassen machen:

```javascript
  new BrowserWindow({
    ...
    webPreferences: {
      webviewTag: true
    },
  });
```

Anschliessend wird die eingebundene Webseite in unsere Electron Applikation geladen & angezeigt.

```html
<webview src="https://apptiva.ch/" />
```

### Basic-Authentifizierung

Mit Electron ist es auch möglich, authentifizierte Seiten anzuzeigen, ohne dass sich der Benutzer anmelden muss. Auch wenn ein Proxy dazwischensteht, ist es möglich, sich per Electron anzumelden. Dies wird folgendermassen realisiert:

```typescript
app.on(
  'login',
  async (
    event: Electron.Event,
    webContents: Electron.WebContents,
    authenticationResponseDetails: Electron.AuthenticationResponseDetails,
    authInfo: Electron.AuthInfo,
    callback
  ) => {
    event.preventDefault()
    const credentials = await getEncryptedLoginCredentials()
    callback(credentials.username, decrypt(credentials.password))
  }
)
```

## Fazit

![Renato Wasescha](./renato-wasescha.jpg)

Electron ist ein sehr mächtiges Framework, das eine Plattform-unabhängige Programmierung zulässt. Ausserdem ist die Dokumentation einfach und übersichtlich, und lässt schnelle Ergebnisse zu. In Verbindung mit React und Typescript macht es richtig Spass, damit zu arbeiten.

Gerne können Sie auf uns zukommen, wenn Sie einen ähnlichen Use Case wie unsere bisherigen Kunden haben. Egal ob Windows, Mac oder Linux - mit Electron können wir eine passgenaue Lösung bauen.
