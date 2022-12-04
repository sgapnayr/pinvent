import './Card.css'

const Card = ({ children, cardClass }) => {
    return (
        <div className='Card'>
            {children}
        </div>
    )
}

export default Card