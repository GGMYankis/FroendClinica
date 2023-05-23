

import '../pages/paginas';


export const Landing = () => <h1>Landing Page  </h1>

export const Home = () => {

    return  <h1>Pagina Home</h1>

}




export const Dashboard = () => <h1> Dashboard Page(Private)</h1>

export const Analytics = () => <h1> Analytics (Private , permission:'analize')</h1>

export const Admin = () => {


    return(

        <form className='needs-validation' novalidate>
  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label for="validationTooltip01">First name</label>
      <input type="text" class="form-control" id="validationTooltip01" placeholder="First name" value="Mark" required/>
      <div className="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label for="validationTooltip02">Last name</label>
      <input type="text" class="form-control" id="validationTooltip02" placeholder="Last name" value="Otto" required/>
      <div className="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div className="col-md-4 mb-3">
      <label for="validationTooltipUsername">Username</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
        </div>
        <input type="text" class="form-control" id="validationTooltipUsername" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required/>
        <div className="invalid-tooltip">
          Please choose a unique and valid username.
        </div>
      </div>
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-6 mb-3">
      <label for="validationTooltip03">City</label>
      <input type="text" class="form-control" id="validationTooltip03" placeholder="City" required/>
      <div className="invalid-tooltip">
        Please provide a valid city.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label for="validationTooltip04">State</label>
      <input type="text" class="form-control" id="validationTooltip04" placeholder="State" required/>
      <div className="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label for="validationTooltip05">Zip</label>
      <input type="text" class="form-control" id="validationTooltip05" placeholder="Zip" required/>
      <div className="invalid-tooltip">
        Please provide a valid zip.
      </div>
    </div>
  </div>
  <button className="btn btn-primary" type="submit">Submit form</button>
</form>
    )
}

export const Usuario = () => {

  
}
