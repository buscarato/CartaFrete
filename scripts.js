
// só para já preenhcer os daods facilitar o trampo 
document.getElementById('tbPesoIncialKG').value = 45000
document.getElementById('tbPesoFinalKG').value = 44450
document.getElementById('tbValorTonelada').value = 22
document.getElementById('tbValorMercadoria').value = 15000
document.getElementById('tbTolerancia').value = 1


let botao = document.getElementById('btnAdd')


function calcular() {

    let PesoIncialKG = Number(document.getElementById('tbPesoIncialKG').value)
    let PesoFinalKG = Number(document.getElementById('tbPesoFinalKG').value)
    let ValorTonelada = Number(document.getElementById('tbValorTonelada').value)
    let ValorMercadoria = Number(document.getElementById('tbValorMercadoria').value)
    let Tolerancia = Number(document.getElementById('tbTolerancia').value)
    let Adiantamento = Number(document.getElementById('tbAdiantamento').value)
    let Pedagio = Number(document.getElementById('tbPedagio').value)
    let Premio = Number(document.getElementById('tbPremio').value)
    let INSS = Number(document.getElementById('tbINSS').value)
    let IR = Number(document.getElementById('tbIR').value)
    let SEST_SENAT = Number(document.getElementById('tbSEST_SENAT').value)
    let Outros = Number(document.getElementById('tbOutros').value)


    //1° Calcula peso perdido na estrada 
    //2° Quanto a transportadora aceita perder % de perca do kg inicial
    // Ex. carga 45.000 KG a trasnportadora aceitar perder 1% = 450 KG na estrada 
    let SaldoTolerancia = (PesoIncialKG - PesoFinalKG) - (PesoIncialKG * Tolerancia / 100)

    let TotalQuebra = (ValorMercadoria / PesoIncialKG) * SaldoTolerancia


    //Validação para caso não tenha quebra o sistema não adicione valores negativos
    if (TotalQuebra < 0) {
        TotalQuebra = 0
    }


    if (document.getElementById("radioExcedente").checked) {
        //1° Calcula valor Mercadoria em KG
        //2° Calcula campo1 vezes o SaldoTolerancia para descobrir a perca
        //3° Ex R$ 15.000,00 X 45.000 KG = R$ 0,333  Neste exemplo ele podia ter pedido 450kg
        // mais ele perdeu 550 kg logo perdeu 100kg a mais  100(KG) * R$ 0,33 = R$ 33,33 total quebra    
        // let TotalQuebra = (ValorMercadoria / PesoIncialKG) * SaldoTolerancia
        console.log('radioExcedente')

        // //Validação para caso não tenha quebra o sistema não adicione valores negativos
        // if (TotalQuebra < 0) {
        //     TotalQuebra = 0
    }
    else if (document.getElementById("radioTotal").checked) {
        //1° A transportadora combra o valor total não tem tolerancia
        //let TotalQuebra = (ValorMercadoria / PesoIncialKG) * (PesoIncialKG - PesoFinalKG)
        console.log('radioTotal')
    }



    //Calculos valores finais 
    let TotalBrutoFrete = (ValorTonelada * PesoFinalKG) / 1000
    let TotalLiquido = TotalBrutoFrete - TotalQuebra - Adiantamento + Pedagio + Premio - INSS - IR - SEST_SENAT - Outros

    document.getElementById('tbQuebra').value = TotalQuebra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })// ok 
    document.getElementById('tbTotalCartaFrete').value = TotalBrutoFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('tbTotalReceber').value = TotalLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


}

botao.addEventListener('click', calcular)


