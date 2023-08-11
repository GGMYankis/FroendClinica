
import axios from "axios";
import "./ForgotPassword.css"

  const ForgotPassword  = (props) => {

    const{setForgot} = props;
    function SubmitEmail (e){

    }

    return (
        <>

      <div className="header-forgot">
        <h1>Enfasis</h1>
          <button className="login" onClick={() => setForgot(false)}>Login</button>
      </div>

        <div className="cont_modal_forgot"> 
            <form onSubmit={SubmitEmail}>
              <div>
                 <h2>Recuperar contrasena</h2>                  
              </div>
              <hr></hr>

              <p>Ingrese su correo electrónico o número de teléfono móvil para buscar su cuenta.</p>

                <input placeholder="email"/>
                <hr></hr>
                <button className="btn enviar">Enviar</button>
              </form>
        </div>
          
        </>
    )  
  }

  export default ForgotPassword;