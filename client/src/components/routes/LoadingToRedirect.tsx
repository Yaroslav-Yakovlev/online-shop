import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const LoadingToRedirect: React.FC = () => {
    const [count, setCount] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        count === 0 && navigate('/');

        return () => clearInterval(interval);
    }, [count]);

    return (
        <div className='container p-5 text-center'>
            <p>Redirecting you in {count} seconds</p>
        </div>
    );
};

export default LoadingToRedirect;
