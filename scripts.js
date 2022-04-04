
//#region informações 
var Transportadora = ''
var NrCartaFrete = ''
var PesoIncialKG = 0
var PesoFinalKG = 0
var ValorTonelada = 0
var ValorMercadoria = 0
var Tolerancia = 0
var Adiantamento = 0
var Pedagio = 0
var Premio = 0
var INSS = 0
var IR = 0
var SEST_SENAT = 0
var Outros = 0
var TotalQuebra = 0
var TotalBrutoFrete = 0
var TotalLiquido = 0
var MensagemCalculo = true
//#endregion

document.getElementById('btnCalcular').addEventListener('click', valida_form)
document.getElementById('btnImprimir').addEventListener('click', valida_impressao)
document.getElementById('btnRelase').addEventListener('click', release)

function calcular() {
    PesoIncialKG = Number(document.getElementById('pesoInicial').value)
    PesoFinalKG = Number(document.getElementById('pesoFinal').value)
    ValorTonelada = Number(document.getElementById('valorTonelada').value)
    ValorMercadoria = Number(document.getElementById('valorMercadoria').value)
    Tolerancia = Number(document.getElementById('tolerancia').value)
    Adiantamento = Number(document.getElementById('adiantamento').value)
    Pedagio = Number(document.getElementById('pedagio').value)
    Premio = Number(document.getElementById('premios').value)
    INSS = Number(document.getElementById('inss').value)
    IR = Number(document.getElementById('ir').value)
    SEST_SENAT = Number(document.getElementById('sestSenat').value)
    Outros = Number(document.getElementById('outros').value)

    let tipoQuebraExcedente = document.getElementById('tipoQuebraExcedente').checked


    //1° Calcula peso perdido na estrada 
    //2° Quanto a transportadora aceita perder % de perca do kg inicial
    // Ex. carga 45.000 KG a trasnportadora aceitar perder 1% = 450 KG na estrada 
    let SaldoTolerancia = (PesoIncialKG - PesoFinalKG) - (PesoIncialKG * Tolerancia / 100)

    if (tipoQuebraExcedente === true) {
        TotalQuebra = (ValorMercadoria / PesoIncialKG) * SaldoTolerancia
        //Validação para caso não tenha quebra o sistema não adicione valores negativos
        if (TotalQuebra < 0) {
            TotalQuebra = 0
        }
    }
    else {

        TotalQuebra = (PesoIncialKG - PesoFinalKG) * (ValorMercadoria / PesoIncialKG)
    }

    //Calculos valores finais 

    TotalBrutoFrete = (ValorTonelada * PesoFinalKG) / 1000
    TotalLiquido = TotalBrutoFrete - TotalQuebra - Adiantamento + Pedagio + Premio - INSS - IR - SEST_SENAT - Outros

    document.getElementById('quebra').value = TotalQuebra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })// ok 
    document.getElementById('totalBruto').value = TotalBrutoFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('totalReceber').value = TotalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    if (MensagemCalculo === true) {
        // aletar antigo de confirmação 
        // Swal.fire({
        //     position: 'top-center',
        //     icon: 'success',
        //     title: 'Cartar Frete Calculada com Sucesso',
        //     showConfirmButton: true,
        //     timer: 3000
        // })

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-center',
            showConfirmButton: true,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Cartar Frete calculada com sucesso'
        })



    }

}

function valida_form() {
    let validacao = ["pesoInicial", "pesoFinal", "valorTonelada", "valorMercadoria", "tolerancia"];
    for (let n = 0; n < validacao.length; n++) {

        if (document.getElementById(validacao[n]).value == '') {
            document.getElementById('quebra').value = ''
            document.getElementById('totalBruto').value = ''
            document.getElementById('totalReceber').value = ''
            document.getElementById(validacao[n]).focus()
            alerta('erro', false, 'Preencha o campo (' + validacao[n] + ')');
            return false
        }
    }

    calcular()

    function alerta(type, title, mensagem) {
        Swal.fire({
            icon: 'error',
            type: type,
            title: title,
            text: mensagem,
            showConfirmButton: true,
            timer: 4500
        });
    }
}

function valida_impressao() {
    let validacao = ["pesoInicial", "pesoFinal", "valorTonelada", "valorMercadoria", "tolerancia"];
    for (let n = 0; n < validacao.length; n++) {

        if (document.getElementById(validacao[n]).value == '') {
            document.getElementById('quebra').value = ''
            document.getElementById('totalBruto').value = ''
            document.getElementById('totalReceber').value = ''
            document.getElementById(validacao[n]).focus()

            alerta('erro', false, 'Preencha o campo (' + validacao[n] + ')');
            return false
        }
    }

    MensagemCalculo = false
    calcular();
    impri_form();
    MensagemCalculo = true

    function alerta(type, title, mensagem) {
        Swal.fire({
            icon: 'error',
            type: type,
            title: title,
            text: mensagem,
            showConfirmButton: true,
            timer: 4500
        });
    }
}

function impri_form() {
    valida_form()
    Transportadora = document.getElementById('transportadora').value
    NrCartaFrete = document.getElementById('nrCartaFrete').value

    var conteudo = document.getElementById('container').innerHTML,
        tela_impressao = window.open('about:blank');
    tela_impressao.document.write("<html><head><title>Impressão Carta Frete</title>");
    tela_impressao.document.write("</head><body bgcolor=white>");
    tela_impressao.document.write("<h1 align=center>Impressão Carta Frete</h1>");
    tela_impressao.document.write("<fieldset>")
    tela_impressao.document.write("<h2>Dados Gerais</h2>");
    tela_impressao.document.write("<form action=\"/cgi-local/inscricao.pl\">");
    tela_impressao.document.write("<ul style='text-transform: capitalize'><b>Transportardora: </b>" + Transportadora + " </ul>");
    tela_impressao.document.write("<ul><b>Número da Carta Frete: </b>" + NrCartaFrete + " </ul>");
    tela_impressao.document.write("</fieldset>")
    tela_impressao.document.write("<p> </p>")

    tela_impressao.document.write("<fieldset>")
    tela_impressao.document.write("<h2>Calculo de Frete</h2>");
    tela_impressao.document.write("<ul><li><b>Peso Inicial (Kg):</b> " + PesoIncialKG + "</li>");
    tela_impressao.document.write("<li><b>Peso Final (Kg):</b> " + PesoFinalKG + "</li>");
    tela_impressao.document.write("<li><b>Valor por Tonelada:</b> " + ValorTonelada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li><b>Valor Mercadoria:</b> " + ValorMercadoria.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li> ");
    tela_impressao.document.write("<li><b>% Tolerância:</b> " + Tolerancia + "</li>");
    tela_impressao.document.write("<p> </p>")

    tela_impressao.document.write("<li>(-) Adiantamento: " + Adiantamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(+) Pedágio: " + Pedagio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(+) Prêmios: " + Premio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(-) INSS: " + INSS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(-) IR: " + IR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(-) SEST/SENAT: " + SEST_SENAT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li>(-) Outros: " + Outros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");

    tela_impressao.document.write("<p> </p>")
    tela_impressao.document.write("<li><b>Quebra:</b> " + TotalQuebra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li><b>Total Bruto:</b> " + TotalBrutoFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</li>");
    tela_impressao.document.write("<li><b><h2>Total a Receber:</b> " + TotalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</h2></li>");
    tela_impressao.document.write("</fieldset>")
    tela_impressao.document.write('<p style="text-align: center;">&copy; 2011-2022 | <strong>Versatil Prime Software Do Parana Ltda</strong> | </p>')

    tela_impressao.window.print();
    tela_impressao.window.close();


};


function EnterTab(InputId, Evento) {

    if (Evento.keyCode == 13) {

        document.getElementById(InputId).focus();

    }
}

function release() {

    Swal.fire({
        imageUrl: 'https://versatilsistemas.com.br/cartafrete/release.png',
        imageHeight: 600,
        imageAlt: 'Release Carta Frete'
    })


}