function Ingresar() {
    let Usuario = $('#InputUsuario').val();
    let Password = $('#InputPassword').val();

    if (Usuario == '' || Usuario == null || Usuario == undefined) {
        $('#InputUsuario').focus();
        Swal.fire({
            title: `<span style="font-size:18px; font-weight:bold; color:#3b5998;">Mensaje del Sistema</span>`,
            html: `<p style="font-size:14px; color:#444; margin:0; line-height:1.2;">
                      Por favor ingrese el <strong>nombre de Usuario</strong>
                   </p>`,
            icon: 'info',
            position: 'top',
            width: '420px',
            padding: '1em',
            confirmButtonText: '<i class="bi bi-person"></i> Aceptar',
            confirmButtonColor: '#3b5998',
            background: '#f9f9f9',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            customClass: {
                popup: 'rounded-4 shadow-lg',
                confirmButton: 'px-3 py-1 rounded-pill fw-semibold',
                icon: 'swal2-icon-custom'
            }
        });
    }
    else if (Password == '' || Password == null || Password == undefined) {
        $('#InputPassword').focus();
        Swal.fire({
            title: `<span style="font-size:18px; font-weight:bold; color:#3b5998;">Mensaje del Sistema</span>`,
            html: `<p style="font-size:14px; color:#444; margin:0; line-height:1.2;">
                      Por favor ingrese la <strong>Contraseña</strong>
                   </p>`,
            icon: 'info',
            position: 'top',
            width: '420px',
            padding: '1em',
            confirmButtonText: '<i class="bi bi-key"></i> Aceptar',
            confirmButtonColor: '#3b5998',
            background: '#f9f9f9',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            customClass: {
                popup: 'rounded-4 shadow-lg',
                confirmButton: 'px-3 py-1 rounded-pill fw-semibold',
                icon: 'swal2-icon-custom'
            }
        });
    }
    else {
        $.ajax({
            type: 'POST',
            dataType: 'Json',
            url: '/Login/IniciarSesion',
            data: { Usuario: Usuario, Password: Password },
            success: function (resultado) {
                valor = resultado.split('*');
                if (valor[0] == 'OK') {
                    Cookies.set('TokenUser', valor[1]);
                    window.location.href = '/Home';
                } else {
                    Swal.fire({
                        title: `<span style="font-size:18px; font-weight:bold; color:#d9534f;">Mensaje del Sistema</span>`,
                        html: `<p style="font-size:14px; color:#444; margin-top:8px;">
                                  ${valor[1]}
                               </p>`,
                        icon: 'error',
                        position: 'top',
                        //width: '420px',
                        //padding: '1em',
                        confirmButtonText: '<i class="bi bi-x-circle"></i> Entendido',
                        confirmButtonColor: '#d9534f',
                        background: '#f9f9f9',
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                        customClass: {
                            popup: 'rounded-4 shadow-lg',
                            confirmButton: 'px-3 py-1 rounded-pill fw-semibold',
                            //icon: 'swal2-icon-custom'
                        }
                    });



                    //Swal.fire({
                    //    title: `<span style="font-size:18px; font-weight:bold; color:#3b5998;">${TituloSwal}</span>`,
                    //    html: `<p style="font-size:14px; color:#444; margin-top:8px;">${texto}</p>`,
                    //    icon: 'info',
                    //    position: 'top',
                    //    showClass: {
                    //        popup: 'animate__animated animate__fadeInDown'
                    //    },
                    //    hideClass: {
                    //        popup: 'animate__animated animate__fadeOutUp'
                    //    },
                    //    confirmButtonText: '<i class="bi bi-check-circle"></i> Aceptar',
                    //    confirmButtonColor: '#3b5998',
                    //    background: '#f9f9f9',
                    //    customClass: {
                    //        popup: 'rounded-4 shadow-lg',
                    //        confirmButton: 'px-3 py-1 rounded-pill fw-semibold'
                    //    },
                    //});

                }
            },
        });
    }
}
