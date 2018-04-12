import React from 'react'
import { Testimonial } from '../../components/Testimonials'

const TestimonialPreview = ({ entry, getAsset }) => (
  <Testimonial
    name={entry.getIn(['data', 'name'])}
    statement={entry.getIn(['data', 'statement'])}
    position={entry.getIn(['data', 'position'])}
    company={entry.getIn(['data', 'company'])}
    avatar={getAsset(entry.getIn(['data', 'avatar']))}
  />
)

export default TestimonialPreview
