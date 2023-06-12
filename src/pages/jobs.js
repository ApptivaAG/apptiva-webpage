import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { MainTitle, Container, Button, Section } from '../style'
import SEO from '../components/SEO'
import config from '../config'
import Layout from '../components/Layout'

const jobs = [
  {
    title: 'Marketing- und Akquise-Manager:in',
    subtitle: '40-60%, ab sofort',
    description: [
      'Wir sind ein junges Software-Unternehmen und suchen Unterstützung.',
      'Bei uns findest du spannende und abwechslungsreiche Arbeit vor. Hilf uns dabei, unsere Bekanntheit zu steigern und neue Kunden zu gewinnen. Es würde uns freuen, dich schon bald kennen zu lernen!',
    ],
    strengthsTitle: 'Deine Aufgaben',
    strengths: [
      'Erstellen und Umsetzen von Marketingstrategien und -kampagnen für unsere Produkte und Dienstleistungen',
      'Pflegen und Erweitern unserer Online-Präsenz auf verschiedenen Kanälen (Website, Social Media, Newsletter, etc.)',
      'Generieren und Qualifizieren von Leads durch gezielte Ansprache potenzieller Kunden',
      'Planen und Durchführen von Verkaufsgesprächen und Präsentationen',
      'Aufbauen und Pflegen von langfristigen Kundenbeziehungen',
    ],
    skillsTitle: 'Dein Profil',
    skills: [
      'Ausbildung oder Studium im Bereich Marketing, Kommunikation oder verwandten Fachgebieten.',
      'Berufserfahrung im Bereich Marketing & Akquise.',
      'Kenntnisse der schweizerischen Marktbedingungen und Branchentrends.',
      'Ausgeprägte Kommunikations- und Verhandlungsfähigkeiten',
      'Hohe Eigeninitiative, Kreativität und Ergebnisorientierung.',
      'Sehr gute Deutschkenntnisse in Wort und Schrift, gute Englischkenntnisse.',
    ],
    benefitsTitle: 'Wir bieten Dir',
    benefits: [
      '&quot;Work From Home&quot;. Wir arbeiten normalerweise von zu Hause aus.',
      'Du entscheidest über deine Tätigkeiten, deine Arbeitszeiten, deine Ferienzeit und deinen Lohn.',
      'Du arbeitest an spannenden Produkten wie z.B. Chatbots.',
      'Du hast die Chance, dich bei uns zu entfalten.',
      'Du erlebst ein selbstorganisierendes Unternehmen am eigenen Leibe.',
    ],
    callToAction:
      'Haben wir Dein Interesse geweckt? Dann freuen wir uns auf Deine Bewerbung mit Lebenslauf, Zeugnissen und Gehaltsvorstellung per E-Mail an info@apptiva.ch. Willst du mehr erfahren? Dann ruf uns an! Wir freuen uns, von dir zu hören.',
  },
  {
    title: 'Fullstack Software-Entwickler:in und Unternehmer:in*',
    subtitle: '60% - 100%, ab sofort',
    description: [
      'Wir sind ein junges Software-Unternehmen und suchen Verstärkung.',
      'Du findest bei uns spannende und abwechslungsreiche Arbeit vor. Wir möchten mit dir gemeinsam Herausforderungen meistern und Spass an der Arbeit haben. Es würde uns freuen, dich schon bald kennen zu lernen!',
      '* Was hat es mit &quot;Unternehmer:in&quot; auf sich? <br /> Bei uns haben alle die Möglichkeit — im kleinen und grossen Still — auf das Unternehmen Einfluss zu nehmen. Egal ob Projektumsetzung, Produktidee, Vorgehen, neue Mitarbeiter:innen oder Organisation, bei uns setzt du deine Visionen um! Entsprechend sind wir an Personen interessiert, die diese Chance nutzen und auf das Unternehmen Einfluss nehmen.',
    ],
    strengthsTitle: 'Deine Stärken',
    strengths: [
      'Du bist teamfähig und selbständig.',
      'Du bist entscheidungsfreudig.',
      'Du verfügst über eine schnelle Auffassungsgabe.',
      'Du hast Freude, in unterschiedlichen Tätigkeitsgebieten zu wirken.',
      'Du willst dich als Mensch und Entwickler:in weiterentwickeln.',
      'Dein Team mag es mit dir zusammenzuarbeiten.',
    ],
    skillsTitle: 'Deine fachlichen Fähigkeiten',
    skills: [
      'Dein Programmier-Beitrag führt schnell zum gewünschten Outcome.',
      'Dir ist Software Craftsmanship wichtig.',
      'Du magst mit HTML, CSS, JS ansprechende Oberflächen entwickeln.',
      'Du möchtest mit Node.js, React und Java entwickeln.',
      'Du weisst, wie man mit Git in einem Team arbeitet.',
    ],
    benefitsTitle: 'Deine Vorteile',
    benefits: [
      '&quot;Work From Home&quot;. Wir arbeiten normalerweise von zu Hause aus.',
      'Du entscheidest über deine Tätigkeiten, deine Arbeitszeiten, deine Ferienzeit und deinen Lohn.',
      'Du arbeitest an spannenden Projekten wie Chatbots oder einer digitalen Speisekarte.',
      'Du verwendest moderne Tools und Libraries.',
      'Du hast die Chance, dich bei uns zu entfalten.',
      'Du erlebst ein selbstorganisierendes Unternehmen am eigenen Leibe.',
    ],
    callToAction:
      'Blut geleckt? Dann überzeug uns mit deiner Bewerbung! Willst du mehr erfahren? Dann ruf uns an! Wir freuen uns, von dir zu hören.',
  },
]

const metadata = {
  title: 'Jobs',
  description: `Jobs bei Apptiva. 
    ${jobs.map((job) => job.title).join(' - ')}`,
  slug: 'jobs',
}

const Center = styled.div`
  text-align: center;
  padding-top: 1em;
`

const Jobs = () => (
  <Layout>
    <main>
      <Helmet title={`Jobs - ${config.company}`} />
      <SEO metaData={metadata} />
      <Container>
        <MainTitle css="margin-bottom: 0;">Jobs</MainTitle>
      </Container>
      {jobs.map((job) => (
        <JobPosting key={job.title} data={job} />
      ))}
    </main>
  </Layout>
)

const JobPosting = ({ data }) => {
  return (
    <Section>
      <Container>
        <h2 style={{ marginBottom: 0 }}>{data.title}</h2>
        <small>{data.subtitle}</small>
        {data.description.map((paragraph) => (
          <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
        <h3>{data.strengthsTitle}</h3>
        <ul>
          {data.strengths.map((strength) => (
            <li key={strength}>{strength}</li>
          ))}
        </ul>
        <h3>{data.skillsTitle}</h3>
        <ul>
          {data.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <h3>{data.benefitsTitle}</h3>
        <ul>
          {data.benefits.map((benefit) => (
            <li key={benefit} dangerouslySetInnerHTML={{ __html: benefit }} />
          ))}
        </ul>
        <p>{data.callToAction}</p>
        <Center>
          <Button
            href={`mailto:info@apptiva.ch?subject=Bewerbung für ${data.title}`}
          >
            Bewirb dich
          </Button>
        </Center>
      </Container>
    </Section>
  )
}

export default Jobs
