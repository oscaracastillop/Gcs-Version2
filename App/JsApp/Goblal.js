var TokenUser = Cookies.get('TokenUser'); // Variable donde se almacena el Key del Usuario.
var TituloSwal = 'Mensaje del Sistema' // Titulo mensaje notificaciones.

var NombreEmpresa = 'E & G Construcciones SAS'; // nombre empresa


function ValidarSesion(Modulo) {
    if (TokenUser == '' || TokenUser == undefined || TokenUser == null) {
        Swal.fire({
            title: TituloSwal,
            text: "Su sesión ya expiró, por favor vuelva a ingresar",
            icon: 'info',
        }).then((result) => {
            window.location.href = '/Login';
        })
    } else {
        ListaSubMenu('/' + Modulo);
    }
}