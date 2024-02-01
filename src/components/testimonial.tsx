const Testimonial = ({ testimonial }: { testimonial: any }) => {
    return (
        <>
            <div>
                {testimonial.statement}
            </div>
            <div>
                <p>{testimonial.name}</p>
                <p>{testimonial.position}</p>
                <p>{testimonial.company}</p>
            </div>
        </>

    )
}

export default Testimonial