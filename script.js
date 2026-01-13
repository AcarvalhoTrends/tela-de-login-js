$(document).ready(function() {
    const credencial = $('#credencial');
    const password = $('#password');

    // Mostrar/Esconder Senha
    $('#btn-senha').click(function() {
        const type = password.attr('type') === 'password' ? 'text' : 'password';
        password.prop('type', type);
        $(this).toggleClass('bi-eye-fill bi-eye-slash-fill');
    });

    // Ação do Botão Login
    $("#btn-login").click(function(event) {
        event.preventDefault();

        const login = new LoginVerification($("#credencial"), $("#password"));

        // Se passar em ambos os testes da classe
        if (login.isValid() && login.isPasswordvalid()) {
            window.location.assign('bem_vindo.html');
        } 
        // Se falhar em qualquer um
        else {
            $('#mensagem-erro')
                .css('color', 'rgb(226, 22, 22)') 
                .text('Verifique novamente as credenciais (E-mail/CPF ou Senha fraca).');
            
            // Dica: faz o erro sumir após 4 segundos
            setTimeout(() => {
                $('#mensagem-erro').text('');
            }, 4000);
        }
    });
});

class LoginVerification {
    constructor(credencial, password) {
        this.credencial = credencial;
        this.password = password;
        this.typeUser = credencial.val().includes('@') ? 'email' : 'cpf';
    }

    isValid() {
        if (this.typeUser === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(this.credencial.val());
        } else if (this.typeUser === "cpf") {
            // Aceita 11122233344 ou 111.222.333-44
            const cpfRegex = /^(\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/;
            return cpfRegex.test(this.credencial.val());
        }
        return false;
    }

    isPasswordvalid() {
        // Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 especial
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(this.password.val());
    }
}