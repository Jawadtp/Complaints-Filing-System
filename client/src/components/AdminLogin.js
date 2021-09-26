import '../login.css'
import {IoIosArrowBack} from 'react-icons/io'

function AdminLogin(props)
{

    function onUserAuthentication(result)
    {
        console.log('Login successful: '+result.access_token)
        localStorage.setItem('token', result.access_token)
        props.setView(0)
    }
    
    function logUserIn()
    {

        console.log('Attempting to log user in..')
        const userInfo = 
        {
            'username': document.getElementById('login').value,
            'password': document.getElementById('password').value
        }

        fetch('http://localhost:5000/admin', {
            method: 'POST',
            
            body: JSON.stringify(userInfo),
            })
            .then(response => response.json())
            .then(result => {
                onUserAuthentication(result)
            })
            .catch(error => {
            console.error('Error:', error);
            });
    }    

    function onBackBtnClick()
    {
        console.log('Backbutton clicked')
        window.location.reload()
    }
    return(
        <>
            <div className="backBtn adminPage" onClick={onBackBtnClick}>
                <IoIosArrowBack size='40px'/>
            </div>

            <div className="wrapper adminLogin">
                
                <div id="formContent">
                    <h2 className="active"> Sign In </h2>
                    <form>
                        <input type="text" id="login" className="second" name="login" placeholder="login" />
                        <input type="text" id="password" className="third" name="login" placeholder="password" />
                        <input type="button" className="fourth" value="Log In" onClick={logUserIn}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin