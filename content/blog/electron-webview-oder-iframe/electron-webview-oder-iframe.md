---
title: 'Unsere Erfahrungen mit Electron und Webview'
slug: unsere-erfahrungen-mit-electron-webview
templateKey: blog-post
image: electron-webview.png
date: 2020-05-18
author: Renato Wasescha
description: >-
  In einigen Projekten, die wir für unsere Kunden realisieren durften, haben wir wertvolle Erfahrungen mit dem Electron Framework gemacht.
categories:
  - Allgemein
---

Folgende Kriterien für eine Desktop Applikation wurden von unseren Kunden in Auftrag gegeben:

- Navigation von mehreren Tabs müssen flexibel und editierbar sein
  <br>Drag'n'Drop</br>
- Automatisches Login für basic authentifizierte Seiten
- Globale Tastenkombinationen erstellen und eigene Befehle ausführen können
  - Beispiel für eine Hausautomation
    <br>Ctrl + 1, https://apptiva.ch/?lightOn=true</br>
  - Aus markierten Telefonnummern einen Webservice auslösen können
    <br>F8, https://apptiva.ch/?tel=+413222626</br>
- Applikation im Kiosk-Modus oder Vollbildmodus starten können
- Applikation per Konfiguration (config.json) starten und diese während der Installation in den vorrausgesehen Pfad kopieren können. Dies ermöglicht dem Herausgeber eine vorkonfigurierte Applikation.
- Automatische Updates
- EV Code Signing Certificates
- Für Windows und Linux bereitstellen

Eines der grössten Herausforderungen war wohl die Navigation von mehreren Seiten. Da die Applikation mit mehreren Tabs, wie in einem Browser klar kommen sollte, haben wir die Electron Dokumentation zur Hilfe genommen. Auf der offiziellen Electron-Webview Dokumentation erscheint zu Beginn folgende Warnung:

> ### Warnung
>
> Der Webview-Tag von Electron basiert auf dem Webview von Chromium, dessen Architektur dramatischen Veränderungen unterworfen ist. Dies wirkt sich auf die Stabilität der Webansichten aus, einschliesslich Rendering, Navigation und Ereignis-Routing. Wir empfehlen derzeit, das Webview-Tag nicht zu verwenden und Alternativen wie iframe, Electron's BrowserView oder eine Architektur in Betracht zu ziehen, die ganz auf eingebettete Inhalte verzichtet.
> <br></Auf>
> Quelle: [electronjs.org/Docs/API/Webview-Tag](https://www.electronjs.org/docs/api/webview-tag)

Aufgrund dieser aktuellen Entwicklungen müsste man eigentlich auf Webview in Electron Apps verzichten. Jedenfalls haben iframe oder BrowserView ebenfalls ihre Nachteile, die dann wieder eher für den Einsatz von Webview sprechen.

## Nachteile iframe

Ein iframe kennt wohl jeder Entwickler und hat höchstwahrscheinlich Erfahrungen damit. Der Vorteil liegt eigentlich nur darin, dass diese schnell eingebunden werden können und man schnell an Ergebnisse kommt. In einer Electron Applikation würden alle Frames im gleichen Prozess laufen. Bei Gebrauch von mehreren iframes könnte dies zu Problemen führen. Eine einzelne Webseite, die abstürzt, könnte somit die ganze Applikation zum Absturz bringen.

## Nachteile BrowserView

Das Hauptfenster wird in Electron in einer BrowserView gestartet. Meistens reicht dies aus und ist wohl die beste Wahl, Inhalte darzustellen. Wenn jedoch in diesem Hauptfenster andere Inhalte von anderen Webseiten dargestellt werden sollen, geht kaum ein Weg an iframes oder Webview vorbei.

## Nachteile Webview

Der einzige Nachteil ist, dass die Webview unter Electron aktuell einschneidenden Veränderungen unterworfen ist. Dies fordert vom Entwickler mehr Aufwand und viel Flexibilität. Dennoch sind wir von der Apptiva überzeugt, dass Webview nach wie vor die qualitativ beste Lösung ist und wir diesen Mehraufwand gerne auf uns nehmen.

## Vorteile Webview

Abgesehen davon, hat Webview immer noch zahlreiche überzeugende Vorteile. Einer davon ist wohl, dass jede Webseite, die in einer Webview geladen wird, in einem separaten isolierten Prozess läuft. Die Interaktionen zwischen ihrer Anwendung und dem eingebetteten Inhalt erfolgen asynchron. Dies sollte sich auf die Stabilität der Applikation positiv auswirken, falls eine eingebundene Webseite abstürzen sollte. Ihre Anwendung ist vor dem eingebetteten Inhalt geschützt. Ausserdem laufen gewisse Webseiten, die in iframes nicht alle Funktionalitäten haben, in Webview reibungslos.

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

Mit Electron ist es auch möglich, authentifizierte Seiten anzuzeigen, ohne dass sich der Benutzer anmelden muss. Auch wenn ein Proxy dazwischen steht, ist es möglich, sich per Electron anzumelden. Dies wird folgendermassen realisiert:

```typescript
// Basic-Authentifizierung Login
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

[[right]]
|[[avatar]]
||![Renato Wasescha](./renato-wasescha.jpg)

Electron ist ein sehr mächtiges Framework, das eine Plattform-unabhängige Programmierung zulässt. Ausserdem ist die Dokumentation einfach und übersichtlich, und lässt schnelle Ergebnisse zu. In Verbindung mit React und Typescript, macht es richtig Spass, damit zu arbeiten. Gerne können Sie auf uns zukommen, wenn Sie einen ähnlichen Use Case, wie bei unseren anderen Kunden haben. Egal ob Windows, Mac oder Linux. Unser Team hat für jedes dieser Betriebsysteme die geeignete Person, da jeder von uns auf eines dieser Betriebsysteme spezialisiert ist.
