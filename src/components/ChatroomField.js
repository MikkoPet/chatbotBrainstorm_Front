import { useNavigate } from 'react-router-dom';
import './ChatroomField.css';


export default function ChatroomField(data) {

    let navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/xatroom/' + data.data.id);
    };

    return (
        <div className="item">
            <button className="white" onClick={handleRedirect}> {data.data.title} </button> 
            <button className="red"> X </button>
        </div>
    );
}