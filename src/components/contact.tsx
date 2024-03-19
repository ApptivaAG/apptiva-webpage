import Heading from './heading'
import Section from './section'
import Button from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const Contact = () => {
  return (
    <Section intent={'light'} level={'one'}>
      <div className="content">
        <div className="pb-4">
          <Heading level={2} size={3} className={'pb-5'}>
            Kontakt
          </Heading>
          <p>
            Möchtest du uns <u>kennenlernen</u> oder hast du Fragen zu unseren
            Dienstleistungen? <u>Zögere nicht</u> und nimm mit uns Kontakt auf!
          </p>
        </div>
        {/* {module.content && (
          <div
            className={
              col1 ? 'mt-4 max-w-2xl lg:mt-6' : 'col-right max-lg:mt-4'
            }
          >
            <StyledPortableText content={module.content} />
          </div>
        )} */}
        <div className="col-left mt-4 max-w-2xl lg:mt-6">
          {/* <Heading level={4} size={4} className={''}>
            Kontakt
          </Heading> */}
          <Heading level={5} size={5} className={''}>
            Telefon
          </Heading>
          <p>041 322 26 26</p>
          <Heading level={5} size={5} className={'pt-3'}>
            Mail
          </Heading>
          <p>info@apptiva.ch</p>
          <Heading level={5} size={5} className={'pt-3'}>
            Adresse
          </Heading>
          <p>
            Apptiva AG
            <br />
            Eichweid 1 <br />
            6203 Sempach Station
          </p>
        </div>
        <div className=" col-right max-lg:mt-4">
          <div className="flex flex-col gap-2 pt-6 ">
            <Heading level={5} size={5} className={''}>
              Kontaktformular
            </Heading>

            <div>
              <Label>Name</Label>
              <Input intent="default" type="text" name="name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input intent="default" type="email" name="email" />
            </div>
            <div>
              <Label>Unternehmen</Label>
              <Input intent="default" type="text" name="name" />
            </div>
            <div>
              <Label>Deine Email-Adresse</Label>
              <Input intent="default" type="text" name="email" />
            </div>
            <div>
              <Label>Nachricht</Label>
              <textarea
                className="ring-offset-white file:font-medium bg-white flex h-full w-full rounded border border-primary px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="message"
                rows={5}
              />
            </div>
            <Button className="" intent="primary">
              Senden
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
