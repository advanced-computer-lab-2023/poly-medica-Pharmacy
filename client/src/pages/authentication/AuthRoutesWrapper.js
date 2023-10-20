import axios from 'axios';
import { useUserContext } from 'hooks/useUserContext';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from 'ui-component/Loader';


const AuthRoutesWrapper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { user, dispatch } = useUserContext();

    useEffect(() => {
		setIsLoading(true);
		if(user){
			navigate(`/${user.type}`);
		}else {
			axios.get('http://localhost:8004/check-user', { withCredentials: true }).then(async userData => {
				await dispatch({ auth: true, payload: userData.data });
				navigate(`/${userData.data.type}`);
			}).catch( () => {
				setIsLoading(false);
			});	
		}		
	}, []);

    return ( 
    <>
    { isLoading && <Loader /> }
    { !isLoading && <Outlet/> }
    </> 
    );
};
 
export default AuthRoutesWrapper;