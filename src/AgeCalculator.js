import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net';
import 'datatables.net-dt';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBars, FaShoppingCart } from 'react-icons/fa';
import './Carrito.css';
import logo from "./imagenes/New_iPhone_7_Plus_128GB_Red_Edition.jpg";
import logso from "./imagenes/tv-curvas-1.jpg";
import iphone from "./imagenes/Iphone-12-Pro-Max.jpg";



function AgeCalculator() {

  const menu = useRef();

  function evento() {

    menu.current.classList.add('active')
    //  document.body.classList.add('opacity')

  }


  function quitar() {

    menu.current.classList.remove('active')
    document.body.classList.remove('opacity')
  }

  const miBotonRef = useRef(null);


  useEffect(() => {

    const ver = (e) => {

      var x, y, x1, x2, y1, y2;
      let fact = 800 / 400;
      let opp = 100;

      if (e == null) e = window.event;
      x = e.clientX
      y = e.clientY;

      x1 = - opp + (x) * fact;
      y1 = - opp + (y) * fact;
      x2 = + opp + (x) * fact;
      y2 = + opp + (y) * fact;


      document.images.grande.style.display = "inline";
      document.images.grande.style.left = (x) * (1 - fact);
      document.images.grande.style.top = (y) * (1 - fact);
      document.images.grande.style.clip = "react(" + y1 + "px," + x2 + "px," + y2 + "px," + x1 + "px)";


    };

    document.addEventListener('mousemove', ver);

    return () => {
      document.removeEventListener('mousemove', ver);
    };
  }, []);


  // ...

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };


  // 
  //<img src={iphone} className='img1' />
  // <img name="grande" src={iphone} className='img2' />
  return (

    <div >


      <input type="file" onChange={handleImageChange} />



      <div className='iamgenSelecionada'>
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        )}
      </div>



      {/*
      <div className='cont-padre-detalle'>
      
        <div className='cont-img-detalle'>
          <div className='contImgDetalle'>
            <img src={iphone} className='img-detalle' />
          </div>


          <div className='cont-detalle'>
            <div>
              <p><b>Pulsera Xiaomi Mi Smart Band 5 negra</b></p>
            </div>
            <hr></hr>

            <p>Estado: <b>Nuevo: Otro (ver detalles)</b></p>
            <p>“Producto de exposición revisado por nuestros técnicos y que funciona perfectamente, con 1 año de ”.</p>

            <hr></hr>
            <div className='cont-footer-detalle'>
              <p>Precio:<b> 23,95 EUR</b></p>
              <div className='cont-btn-detalle'>
                <button className='agregarcarrito detalle'>Agregar carrito</button>
                <a className='detalleProducto detalle'>Agregar carrito</a>
              </div>
            </div>

            <div className='footerdetalle'>

              <p>Este artículo es popular. 1.056 ya se han vendido.</p>
            </div>

          </div>
        </div>
 </div>
  */}


      {/*


        {
          producto.map(item => [

            <div className='cont-tikes'>

              <div className='boxTikes'>
                <img src={item.imagen} className='rounded' />
              </div>

              <div className='box-2-tikes'>
                <div className='cont-nombre-producto'>
                  <span className=''>{item.nombre}</span>
                </div>
                <div className='cont-precio-producto'>
                  <span>${item.precio} USD</span>
                </div>
                <div className='cont-btn-tikes'>
                  <button className='agregarcarrito'>Agregar carrito</button>
                  <a className='detalleProducto'>Agregar carrito</a>
                </div>
              </div>

            </div>

          ])

        }

 <header className='headers'>

        <nav className='menu'>

          <FaBars className='icoBarra' id='icoBarra' onClick={evento} />
          <p className='txtNombre'>Cyber Plaza</p>

          <div className='cont-menu' id='icono-menu' ref={menu}>
            <div className='cont-titu-menu'>
              <p>Hola Yankis</p>
              <p onClick={quitar} className='quitar'>X</p>
            </div>
            <ul>
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
              <li>Home</li>
            </ul>
          </div>

          <input className='busqueda' placeholder='Buscar un producto' />

          <span className='span2'>
            <a>Inicia sesion</a>
            <a className='cont-card'>
              <FaShoppingCart className='txtcard' />
              <span class="badge bg-dark text-white ms-1 rounded-pill" id="cantidadcarrito">0</span>
            </a>
          </span>

        </nav>

        <nav className='nav-menu' >
          <ul className='menu-horizontal'>
            <li><a>Categoria</a>
              <ul className='menu-vertical'>
                <li>Tecnologia</li>
                <li>Deportes</li>
                <li>Dormitorio</li>
              </ul>
            </li>
          </ul>
        </nav>

      </header>





      <div className='headerLogin'>
        <p className='txtNombre'>Cyber Plaza</p>
      </div>

      <div className='cont-padreIndex'>

        <div className='prev'>


          <div className='mensaje-error'>
            <div className='sub-box-mensaje-error'>
              <p>No pudimos encontrar un conreo electronico</p>
            </div>
          </div>

          <form className='cont-login'>

            <div className='sub-login'>
              <label>Correo</label>
              <input />
            </div>

            <div className='sub-login'>
              <label>Contraseñas</label>
              <input />
            </div>
            <div className='cont-btn-login'>
              <button >Iniciar Sesion</button>
            </div>
            <div className='cont-mensaje-login'>
              <a>¿Perdiste tu contraseña?</a>
              <a>¿No tienes un Cuenta? Resgistrate</a>
            </div>


            <div class="linea-con-circulo"></div>

            <div className='cont-btn-login '>
              <button className='google'>Continuar con Google</button>
            </div>

          </form>
        </div>


      </div>
 */}

    </div >

  );
}

export default AgeCalculator;

/*             <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="data:imagen/@Html.DisplayTextFor(m => m.Extension);base64,@Html.DisplayTextFor(m => m.Base64)" alt="..." /></div>
            <div class="col-md-6">
                <div class="small mb-1">Marca: @Html.DisplayTextFor(m => m.oMarca.Descripcion)</div>
                <h1 class="display-5 fw-bolder"> @Html.DisplayTextFor(m => m.Nombre)</h1>
                <div class="fs-5 mb-5">
                    @*<span class="text-decoration-line-through">$45.00</span>*@
                    <span>@Html.DisplayTextFor(m => m.Precio) USD</span>
                </div>
                <p class="lead">@Html.DisplayTextFor(m => m.Descripcion)</p>
                <div class="d-flex">
                    <a href="@Url.Action("Index","Tienda")" class="btn btn-danger w-50 text-center">atras </a>

                    @if (Session["Cliente"] != null)
                    {
                        <button class="btn btn-success agregarcarrito flex-shink-0 w-50" type="button" data-idproducto="@Html.DisplayTextFor(m => m.IdProducto)">
                            <i class="bi-cart-fill me-1"></i>
                            agregar al carrito
                        </button>
                    }


                </div>





            </div> */