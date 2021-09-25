import '../login.css'

function AdminLogin(){
    return(
        <div class="wrapper adminLogin">
            <div id="formContent">
                
                <h2 class="active"> Sign In </h2>
                <form>
                    <input type="text" id="login" class="second" name="login" placeholder="login" />
                    <input type="text" id="password" class="third" name="login" placeholder="password" />
                    <input type="submit" class="fourth" value="Log In" />
                </form>
            </div>
        </div>
    )
}

export default AdminLogin