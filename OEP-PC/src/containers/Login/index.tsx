 import { useState, useEffect } from 'react';

 import style from './index.module.less';
 
 /**
 *login component
 */
 const Login = () => {
    const [state, setState] = useState();
    useEffect(() => {
        console.log(state, setState);
    }, []);
    return (<div className={style.container}>sss</div>);
 };
 
 export default Login;
 