import React from 'react'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Intro = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 640px) {
    justify-content: flex-start;
  }
`

const Avatar = styled(GatsbyImage)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 0 50px #ccc;
`

const ContactPerson = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

const ContactName = styled.h3`
  text-align: center;
  margin-bottom: 0;
  margin-top: 0.5rem;

  @media (min-width: 640px) {
    text-align: left;
  }
`

const ContactRole = styled.div`
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`

const ContactData = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem 2rem;
  font-size: 1.25rem;
  margin-top: 1rem;

  @media (min-width: 640px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const Contact = ({ contactPerson }) => (
  <Wrapper>
    <Intro>
      <div>{contactPerson.text1}</div>
      <div>{contactPerson.text2}</div>
    </Intro>
    <ContactPerson>
      <AvatarWrapper>
        <Avatar
          image={contactPerson.image.childImageSharp.gatsbyImageData}
          alt={contactPerson.name}
        />
      </AvatarWrapper>
      <div>
        <ContactName>{contactPerson.name}</ContactName>
        <ContactRole>{contactPerson.role}</ContactRole>
        <ContactData>
          <a href={`mailto:${contactPerson.email}`}>{contactPerson.email}</a>
          <a href="tel:+41413222626">{contactPerson.phone}</a>
        </ContactData>
      </div>
    </ContactPerson>
  </Wrapper>
)

export default Contact
