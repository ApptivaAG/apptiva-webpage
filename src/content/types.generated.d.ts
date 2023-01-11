declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		typeof entryMap[C][keyof typeof entryMap[C]] & Render;

	type BaseCollectionConfig<S extends import('astro/zod').ZodRawShape> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<import('astro/zod').ZodObject<S>>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends import('astro/zod').ZodRawShape>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	export function getEntry<C extends keyof typeof entryMap, E extends keyof typeof entryMap[C]>(
		collection: C,
		entryKey: E
	): Promise<typeof entryMap[C][E] & Render>;
	export function getCollection<
		C extends keyof typeof entryMap,
		E extends keyof typeof entryMap[C]
	>(
		collection: C,
		filter?: (data: typeof entryMap[C][E]) => boolean
	): Promise<(typeof entryMap[C][E] & Render)[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		import('astro/zod').ZodObject<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			injectedFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"2015-07-08-der-digitale-wandel.md": {
  id: "2015-07-08-der-digitale-wandel.md",
  slug: "2015-07-08-der-digitale-wandel",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-07-22-warum-apptiva.md": {
  id: "2015-07-22-warum-apptiva.md",
  slug: "2015-07-22-warum-apptiva",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-07-29-anwender-im-vordergrund.md": {
  id: "2015-07-29-anwender-im-vordergrund.md",
  slug: "2015-07-29-anwender-im-vordergrund",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-10-29-eine-moderne-ui-architektur.md": {
  id: "2015-10-29-eine-moderne-ui-architektur.md",
  slug: "2015-10-29-eine-moderne-ui-architektur",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-11-06-qualitaetsziele.md": {
  id: "2015-11-06-qualitaetsziele.md",
  slug: "2015-11-06-qualitaetsziele",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2015-12-03-geschaeftsprozesse-beschleunigen.md": {
  id: "2015-12-03-geschaeftsprozesse-beschleunigen.md",
  slug: "2015-12-03-geschaeftsprozesse-beschleunigen",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-01-15-stakeholder-interviews.md": {
  id: "2016-01-15-stakeholder-interviews.md",
  slug: "2016-01-15-stakeholder-interviews",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-03-03-digitale-kluft.md": {
  id: "2016-03-03-digitale-kluft.md",
  slug: "2016-03-03-digitale-kluft",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-04-15-mehr-ueberblick-mit-storymap.md": {
  id: "2016-04-15-mehr-ueberblick-mit-storymap.md",
  slug: "2016-04-15-mehr-ueberblick-mit-storymap",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-04-22-it-landschaft-einer-organisation-langfristig-positiv-beeinflussen.md": {
  id: "2016-04-22-it-landschaft-einer-organisation-langfristig-positiv-beeinflussen.md",
  slug: "2016-04-22-it-landschaft-einer-organisation-langfristig-positiv-beeinflussen",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-07-29-1-jahr-apptiva.md": {
  id: "2016-07-29-1-jahr-apptiva.md",
  slug: "2016-07-29-1-jahr-apptiva",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-10-14-mwst-startups.md": {
  id: "2016-10-14-mwst-startups.md",
  slug: "2016-10-14-mwst-startups",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-10-28-bot-entwicklung.md": {
  id: "2016-10-28-bot-entwicklung.md",
  slug: "2016-10-28-bot-entwicklung",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-11-03-chatbot-entwickeln-mit-react-redux-wit-ai-und-slack-teil-1.md": {
  id: "2016-11-03-chatbot-entwickeln-mit-react-redux-wit-ai-und-slack-teil-1.md",
  slug: "2016-11-03-chatbot-entwickeln-mit-react-redux-wit-ai-und-slack-teil-1",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-11-16-react-komponenten-mit-chrome-timeline-analysieren.md": {
  id: "2016-11-16-react-komponenten-mit-chrome-timeline-analysieren.md",
  slug: "2016-11-16-react-komponenten-mit-chrome-timeline-analysieren",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2016-11-28-suva-schneesport-check.md": {
  id: "2016-11-28-suva-schneesport-check.md",
  slug: "2016-11-28-suva-schneesport-check",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2017-07-20-allianz-cinema-chatbot.md": {
  id: "2017-07-20-allianz-cinema-chatbot.md",
  slug: "2017-07-20-allianz-cinema-chatbot",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2017-07-27-amazon-lambda-zusammen-mit-dem-serverless-framework.md": {
  id: "2017-07-27-amazon-lambda-zusammen-mit-dem-serverless-framework.md",
  slug: "2017-07-27-amazon-lambda-zusammen-mit-dem-serverless-framework",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-01-04-jest-test-debuggen-mit-visual-studio-code.md": {
  id: "2018-01-04-jest-test-debuggen-mit-visual-studio-code.md",
  slug: "2018-01-04-jest-test-debuggen-mit-visual-studio-code",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-02-01-bots-holzoepfel-ond-zipfelchappe.md": {
  id: "2018-02-01-bots-holzoepfel-ond-zipfelchappe.md",
  slug: "2018-02-01-bots-holzoepfel-ond-zipfelchappe",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2018-02-06-wir-sind-in-die-startup-station-umgezogen.md": {
  id: "2018-02-06-wir-sind-in-die-startup-station-umgezogen.md",
  slug: "2018-02-06-wir-sind-in-die-startup-station-umgezogen",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-10-vr-anwendungsbeispiele/vr-anwendungsbeispiele.md": {
  id: "2020-10-vr-anwendungsbeispiele/vr-anwendungsbeispiele.md",
  slug: "2020-10-vr-anwendungsbeispiele/vr-anwendungsbeispiele",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-11-erste-schritte-in-der-informatik/erste-schritte-in-der-informatik.md": {
  id: "2020-11-erste-schritte-in-der-informatik/erste-schritte-in-der-informatik.md",
  slug: "2020-11-erste-schritte-in-der-informatik/erste-schritte-in-der-informatik",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2020-12-03-vivanco/blogpost.md": {
  id: "2020-12-03-vivanco/blogpost.md",
  slug: "2020-12-03-vivanco/blogpost",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-05-native-vs-web-app/vor-und-nachteile-apple-ios-google-android-app-webapp-pwa.md": {
  id: "2021-05-native-vs-web-app/vor-und-nachteile-apple-ios-google-android-app-webapp-pwa.md",
  slug: "2021-05-native-vs-web-app/vor-und-nachteile-apple-ios-google-android-app-webapp-pwa",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-08-23-solarify/solarify.md": {
  id: "2021-08-23-solarify/solarify.md",
  slug: "2021-08-23-solarify/solarify",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-09-22-wissensaustausch/wissensaustausch.md": {
  id: "2021-09-22-wissensaustausch/wissensaustausch.md",
  slug: "2021-09-22-wissensaustausch/wissensaustausch",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-11-18-konfigurierbare-event-packages/konfigurierbare-event-packages.md": {
  id: "2021-11-18-konfigurierbare-event-packages/konfigurierbare-event-packages.md",
  slug: "2021-11-18-konfigurierbare-event-packages/konfigurierbare-event-packages",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2021-12-01-slope-track-update-2022/slope-track-update-2022.md": {
  id: "2021-12-01-slope-track-update-2022/slope-track-update-2022.md",
  slug: "2021-12-01-slope-track-update-2022/slope-track-update-2022",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-02-21-vorgehen-vermitteln/vorgehen-vermitteln.md": {
  id: "2022-02-21-vorgehen-vermitteln/vorgehen-vermitteln.md",
  slug: "2022-02-21-vorgehen-vermitteln/vorgehen-vermitteln",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-05-30-apptiva-team-event/apptiva-team-event-mai-2022.md": {
  id: "2022-05-30-apptiva-team-event/apptiva-team-event-mai-2022.md",
  slug: "2022-05-30-apptiva-team-event/apptiva-team-event-mai-2022",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-07-25-apptiva-neuer-standort/apptiva-neuer-standort.md": {
  id: "2022-07-25-apptiva-neuer-standort/apptiva-neuer-standort.md",
  slug: "2022-07-25-apptiva-neuer-standort/apptiva-neuer-standort",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"2022-08-30-workation/workaction.md": {
  id: "2022-08-30-workation/workaction.md",
  slug: "2022-08-30-workation/workaction",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"app-store-eintrag-inhalte/app-store-eintrag-inhalte.md": {
  id: "app-store-eintrag-inhalte/app-store-eintrag-inhalte.md",
  slug: "app-store-eintrag-inhalte/app-store-eintrag-inhalte",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"apptiva-5/apptiva-5.md": {
  id: "apptiva-5/apptiva-5.md",
  slug: "apptiva-5/apptiva-5",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"bubble-chat-release/bubble-chat-release.md": {
  id: "bubble-chat-release/bubble-chat-release.md",
  slug: "bubble-chat-release/bubble-chat-release",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"bubble-chat/bubble-chat.md": {
  id: "bubble-chat/bubble-chat.md",
  slug: "bubble-chat/bubble-chat",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"datenmodell-eines-chatbots-testen/datenmodell-eines-chatbots-testen.md": {
  id: "datenmodell-eines-chatbots-testen/datenmodell-eines-chatbots-testen.md",
  slug: "datenmodell-eines-chatbots-testen/datenmodell-eines-chatbots-testen",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"die-apptiva-waechst/die-apptiva-waechst.md": {
  id: "die-apptiva-waechst/die-apptiva-waechst.md",
  slug: "die-apptiva-waechst/die-apptiva-waechst",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"drei-jahre-apptiva/drei-jahre-apptiva.md": {
  id: "drei-jahre-apptiva/drei-jahre-apptiva.md",
  slug: "drei-jahre-apptiva/drei-jahre-apptiva",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"electron-webview-oder-iframe/electron-webview-oder-iframe.md": {
  id: "electron-webview-oder-iframe/electron-webview-oder-iframe.md",
  slug: "electron-webview-oder-iframe/electron-webview-oder-iframe",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"fleet-assistant/fleet-assistant.md": {
  id: "fleet-assistant/fleet-assistant.md",
  slug: "fleet-assistant/fleet-assistant",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"g-kraefte-teammitglied/2020-03-06-die-dynamik-von-G-kräften-betriebssystemen-und-neuen-teammitgliedern.md": {
  id: "g-kraefte-teammitglied/2020-03-06-die-dynamik-von-G-kräften-betriebssystemen-und-neuen-teammitgliedern.md",
  slug: "g-kraefte-teammitglied/2020-03-06-die-dynamik-von-g-kräften-betriebssystemen-und-neuen-teammitgliedern",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"home-office/home-office.md": {
  id: "home-office/home-office.md",
  slug: "home-office/home-office",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"mit-chatbot-rapportieren/mit-chatbot-rapportieren.md": {
  id: "mit-chatbot-rapportieren/mit-chatbot-rapportieren.md",
  slug: "mit-chatbot-rapportieren/mit-chatbot-rapportieren",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"partyplaner-fuer-schuerch-getraenke.md": {
  id: "partyplaner-fuer-schuerch-getraenke.md",
  slug: "partyplaner-fuer-schuerch-getraenke",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"postfinance-e-payment-einbinden/postfinance-e-payment-einbinden.md": {
  id: "postfinance-e-payment-einbinden/postfinance-e-payment-einbinden.md",
  slug: "postfinance-e-payment-einbinden/postfinance-e-payment-einbinden",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"pwa-apps/pwa-apps.md": {
  id: "pwa-apps/pwa-apps.md",
  slug: "pwa-apps/pwa-apps",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"sacralis-app/sacralis-app.md": {
  id: "sacralis-app/sacralis-app.md",
  slug: "sacralis-app/sacralis-app",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"screenimage-pro/screenimage-pro.md": {
  id: "screenimage-pro/screenimage-pro.md",
  slug: "screenimage-pro/screenimage-pro",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"serverless/serverless.md": {
  id: "serverless/serverless.md",
  slug: "serverless/serverless",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"slope-track-update-2021/slope-track-update-2021.md": {
  id: "slope-track-update-2021/slope-track-update-2021.md",
  slug: "slope-track-update-2021/slope-track-update-2021",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"slope-track/slope-track.md": {
  id: "slope-track/slope-track.md",
  slug: "slope-track/slope-track",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"softwareentwicklung-unter-nixos/blogpost.md": {
  id: "softwareentwicklung-unter-nixos/blogpost.md",
  slug: "softwareentwicklung-unter-nixos/blogpost",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"trial-store/trial-store.md": {
  id: "trial-store/trial-store.md",
  slug: "trial-store/trial-store",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"usability-audit.md": {
  id: "usability-audit.md",
  slug: "usability-audit",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"vsponse/vsponse.md": {
  id: "vsponse/vsponse.md",
  slug: "vsponse/vsponse",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"werkausstellung/werkausstellung.md": {
  id: "werkausstellung/werkausstellung.md",
  slug: "werkausstellung/werkausstellung",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},
"data": {
"employees/david-decker/david-decker.md": {
  id: "employees/david-decker/david-decker.md",
  slug: "employees/david-decker/david-decker",
  body: string,
  collection: "data",
  data: any
},
"employees/linus-huesler/linus-huesler.md": {
  id: "employees/linus-huesler/linus-huesler.md",
  slug: "employees/linus-huesler/linus-huesler",
  body: string,
  collection: "data",
  data: any
},
"employees/mariana-barbosa/mariana-barbosa.md": {
  id: "employees/mariana-barbosa/mariana-barbosa.md",
  slug: "employees/mariana-barbosa/mariana-barbosa",
  body: string,
  collection: "data",
  data: any
},
"employees/markus-tanner/markus-tanner.md": {
  id: "employees/markus-tanner/markus-tanner.md",
  slug: "employees/markus-tanner/markus-tanner",
  body: string,
  collection: "data",
  data: any
},
"employees/patrik-stutz/patrik-stutz.md": {
  id: "employees/patrik-stutz/patrik-stutz.md",
  slug: "employees/patrik-stutz/patrik-stutz",
  body: string,
  collection: "data",
  data: any
},
"employees/philip-schoenholzer/philip-schoenholzer.md": {
  id: "employees/philip-schoenholzer/philip-schoenholzer.md",
  slug: "employees/philip-schoenholzer/philip-schoenholzer",
  body: string,
  collection: "data",
  data: any
},
"employees/robin-geissmann/robin-geissmann.md": {
  id: "employees/robin-geissmann/robin-geissmann.md",
  slug: "employees/robin-geissmann/robin-geissmann",
  body: string,
  collection: "data",
  data: any
},
"employees/roman-schaller/roman-schaller.md": {
  id: "employees/roman-schaller/roman-schaller.md",
  slug: "employees/roman-schaller/roman-schaller",
  body: string,
  collection: "data",
  data: any
},
"partners/digital-enterprise/digital-enterprise.md": {
  id: "partners/digital-enterprise/digital-enterprise.md",
  slug: "partners/digital-enterprise/digital-enterprise",
  body: string,
  collection: "data",
  data: any
},
"partners/dox42/dox42.md": {
  id: "partners/dox42/dox42.md",
  slug: "partners/dox42/dox42",
  body: string,
  collection: "data",
  data: any
},
"partners/flm/flm.md": {
  id: "partners/flm/flm.md",
  slug: "partners/flm/flm",
  body: string,
  collection: "data",
  data: any
},
"partners/swisscom/swisscom.md": {
  id: "partners/swisscom/swisscom.md",
  slug: "partners/swisscom/swisscom",
  body: string,
  collection: "data",
  data: any
},
"testimonials/andres-quandt.md": {
  id: "testimonials/andres-quandt.md",
  slug: "testimonials/andres-quandt",
  body: string,
  collection: "data",
  data: any
},
"testimonials/brigit-fischer.md": {
  id: "testimonials/brigit-fischer.md",
  slug: "testimonials/brigit-fischer",
  body: string,
  collection: "data",
  data: any
},
"testimonials/carl-ehrhardt.md": {
  id: "testimonials/carl-ehrhardt.md",
  slug: "testimonials/carl-ehrhardt",
  body: string,
  collection: "data",
  data: any
},
"testimonials/daniel-portmann.md": {
  id: "testimonials/daniel-portmann.md",
  slug: "testimonials/daniel-portmann",
  body: string,
  collection: "data",
  data: any
},
"testimonials/francesco-marinelli.md": {
  id: "testimonials/francesco-marinelli.md",
  slug: "testimonials/francesco-marinelli",
  body: string,
  collection: "data",
  data: any
},
"testimonials/marc-menz.md": {
  id: "testimonials/marc-menz.md",
  slug: "testimonials/marc-menz",
  body: string,
  collection: "data",
  data: any
},
"testimonials/samuli-aegerter.md": {
  id: "testimonials/samuli-aegerter.md",
  slug: "testimonials/samuli-aegerter",
  body: string,
  collection: "data",
  data: any
},
"testimonials/simon-infanger.md": {
  id: "testimonials/simon-infanger.md",
  slug: "testimonials/simon-infanger",
  body: string,
  collection: "data",
  data: any
},
"testimonials/tobias-stahel.md": {
  id: "testimonials/tobias-stahel.md",
  slug: "testimonials/tobias-stahel",
  body: string,
  collection: "data",
  data: any
},
},
"services": {
"architektur-review/architektur-review.md": {
  id: "architektur-review/architektur-review.md",
  slug: "architektur-review/architektur-review",
  body: string,
  collection: "services",
  data: any
},
"bargeldlos-bezahlen/bargeldlos-bezahlen.md": {
  id: "bargeldlos-bezahlen/bargeldlos-bezahlen.md",
  slug: "bargeldlos-bezahlen/bargeldlos-bezahlen",
  body: string,
  collection: "services",
  data: any
},
"chatbots/chatbots.md": {
  id: "chatbots/chatbots.md",
  slug: "chatbots/chatbots",
  body: string,
  collection: "services",
  data: any
},
"dashboard-notaufnahme/dashboard-notaufnahme.md": {
  id: "dashboard-notaufnahme/dashboard-notaufnahme.md",
  slug: "dashboard-notaufnahme/dashboard-notaufnahme",
  body: string,
  collection: "services",
  data: any
},
"dashboard/dashboard.md": {
  id: "dashboard/dashboard.md",
  slug: "dashboard/dashboard",
  body: string,
  collection: "services",
  data: any
},
"digitalisierung-unternehmen/digitalisierung-unternehmen.md": {
  id: "digitalisierung-unternehmen/digitalisierung-unternehmen.md",
  slug: "digitalisierung-unternehmen/digitalisierung-unternehmen",
  body: string,
  collection: "services",
  data: any
},
"einsatzplanung/einsatzplanung.md": {
  id: "einsatzplanung/einsatzplanung.md",
  slug: "einsatzplanung/einsatzplanung",
  body: string,
  collection: "services",
  data: any
},
"future-hack/future-hack.md": {
  id: "future-hack/future-hack.md",
  slug: "future-hack/future-hack",
  body: string,
  collection: "services",
  data: any
},
"guest-counter/guestcounter.md": {
  id: "guest-counter/guestcounter.md",
  slug: "guest-counter/guestcounter",
  body: string,
  collection: "services",
  data: any
},
"impressum/impressum.md": {
  id: "impressum/impressum.md",
  slug: "impressum/impressum",
  body: string,
  collection: "services",
  data: any
},
"individuelle-entwicklung/individuelle-entwicklung.md": {
  id: "individuelle-entwicklung/individuelle-entwicklung.md",
  slug: "individuelle-entwicklung/individuelle-entwicklung",
  body: string,
  collection: "services",
  data: any
},
"mobile-apps/mobile-apps.md": {
  id: "mobile-apps/mobile-apps.md",
  slug: "mobile-apps/mobile-apps",
  body: string,
  collection: "services",
  data: any
},
"payflink/payflink.md": {
  id: "payflink/payflink.md",
  slug: "payflink/payflink",
  body: string,
  collection: "services",
  data: any
},
"persona-workshop/persona-workshop.md": {
  id: "persona-workshop/persona-workshop.md",
  slug: "persona-workshop/persona-workshop",
  body: string,
  collection: "services",
  data: any
},
"produktkonfiguratoren/produktkonfiguratoren.md": {
  id: "produktkonfiguratoren/produktkonfiguratoren.md",
  slug: "produktkonfiguratoren/produktkonfiguratoren",
  body: string,
  collection: "services",
  data: any
},
"support/support.md": {
  id: "support/support.md",
  slug: "support/support",
  body: string,
  collection: "services",
  data: any
},
"telefonverkauf-showcase/telefonverkauf-showcase.md": {
  id: "telefonverkauf-showcase/telefonverkauf-showcase.md",
  slug: "telefonverkauf-showcase/telefonverkauf-showcase",
  body: string,
  collection: "services",
  data: any
},
"unsere-kompetenzen/unsere-kompetenzen.md": {
  id: "unsere-kompetenzen/unsere-kompetenzen.md",
  slug: "unsere-kompetenzen/unsere-kompetenzen",
  body: string,
  collection: "services",
  data: any
},
"user-centered-design/user-centered-design.md": {
  id: "user-centered-design/user-centered-design.md",
  slug: "user-centered-design/user-centered-design",
  body: string,
  collection: "services",
  data: any
},
"web-apps/web-apps.md": {
  id: "web-apps/web-apps.md",
  slug: "web-apps/web-apps",
  body: string,
  collection: "services",
  data: any
},
"webshops/webshops.md": {
  id: "webshops/webshops.md",
  slug: "webshops/webshops",
  body: string,
  collection: "services",
  data: any
},
"weiterentwicklung-apps-produkte/weiterentwicklung-apps-produkte.md": {
  id: "weiterentwicklung-apps-produkte/weiterentwicklung-apps-produkte.md",
  slug: "weiterentwicklung-apps-produkte/weiterentwicklung-apps-produkte",
  body: string,
  collection: "services",
  data: any
},
"zusammenarbeit/zusammenarbeit.md": {
  id: "zusammenarbeit/zusammenarbeit.md",
  slug: "zusammenarbeit/zusammenarbeit",
  body: string,
  collection: "services",
  data: any
},
},

	};

	type ContentConfig = typeof import("./config");
}
