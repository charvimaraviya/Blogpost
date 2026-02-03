import './Confirmationmodel.css';

const Confirmationmodal = ({
    title,
    desc,
    onConfirm,
    onClose,
    confirmBtnText,
}) => {
    return(
        <div className='model-backdrop'>
            <div className='model'>
                <h2> {title} </h2>
                <p className='confirmation-desc'> {desc} </p>

                <div className='model-actions'>
                    <button className='btn btn-cancle' onClick={onClose}>Cancel</button>
                    <button className='btn btn-delete' onClick={onConfirm}>{confirmBtnText}</button>

                </div>
            </div>
        </div>

    )
}
export default Confirmationmodal;