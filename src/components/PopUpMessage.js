import { useEffect } from 'react';

const PopupMessage = ({ displayMessage, setIsShown }) => {
    useEffect(() => {
        setIsShown(true);
        const timer = setTimeout(() => {
            setIsShown(false);
        }, 4000)

        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={displayMessage.type === 'error' ? 'alertError' : 'alertSuccess'}>
            <h3>{displayMessage.message}</h3>
        </div>
    )
}
export default PopupMessage;