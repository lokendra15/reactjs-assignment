import './styledModal.scss';
const Modal = ({children}) => {
    return (
        <div className="modalWrap">
            <div className='modalBody'>
                {children}
            </div>
        </div>
    )
}

export default Modal