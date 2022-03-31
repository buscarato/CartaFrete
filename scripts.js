
// só para já preenhcer os daods facilitar o trampo 
document.getElementById('pesoInicial').value = 45000
document.getElementById('pesoFinal').value = 44450
document.getElementById('valorTonelada').value = 22
document.getElementById('valorMercadoria').value = 15000
document.getElementById('tolerancia').value = 1


let botao = document.getElementById('btnCalcular')


function calcular() {

    let PesoIncialKG = Number(document.getElementById('pesoInicial').value)
    let PesoFinalKG = Number(document.getElementById('pesoFinal').value)
    let ValorTonelada = Number(document.getElementById('valorTonelada').value)
    let ValorMercadoria = Number(document.getElementById('valorMercadoria').value)
    let Tolerancia = Number(document.getElementById('tolerancia').value)
    let Adiantamento = Number(document.getElementById('adiantamento').value)
    let Pedagio = Number(document.getElementById('pedagio').value)
    let Premio = Number(document.getElementById('premios').value)
    let INSS = Number(document.getElementById('inss').value)
    let IR = Number(document.getElementById('ir').value)
    let SEST_SENAT = Number(document.getElementById('sestSenat').value)
    let Outros = Number(document.getElementById('outros').value)

    let tipoQuebraExcedente = document.getElementById('tipoQuebraExcedente').checked
    let TotalQuebra = 0
    //console.log(tipoQuebraExcedente + '  ---> Verdadei ou falso')

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
    let TotalBrutoFrete = (ValorTonelada * PesoFinalKG) / 1000
    let TotalLiquido = TotalBrutoFrete - TotalQuebra - Adiantamento + Pedagio + Premio - INSS - IR - SEST_SENAT - Outros

    document.getElementById('quebra').value = TotalQuebra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })// ok 
    document.getElementById('totalBruto').value = TotalBrutoFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('totalReceber').value = TotalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


}


botao.addEventListener('click', calcular)


// function calculoQuebra() {

//     info = document.getElementById('tipoQuebraExcedente').checked
//     console.log(info + ' teste')

// }


// botao.addEventListener('click', calculoQuebra)

