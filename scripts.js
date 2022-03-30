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
    let teste = document.getElementById('horaConsulta')


    //calcular total de KG de saida e de chegada para saber quando KG perdeu na estrada
    let TotalKG = PesoIncialKG - PesoFinalKG
    //Pega quantos KG ele perdeu e multipica pelo valor da Carga
    let TotalValorKG = TotalKG * ValorMercadoria
    //Descobre o valor do KG da mercadoria e calculca quanto em R$ se perdeu na estrada
    let TotalQuebra = (ValorMercadoria / PesoIncialKG) * TotalKG
    //descobre o tatol de kg que pode ser pedido no transporte (tolerancia q a transportadora aceita)
    let TotalExcedenteAceito = (Tolerancia / 100) * PesoIncialKG
    //calcula quanto passou da tolerancia KG inicial menos o que podia perder 
    let TotalExcedente = TotalKG - TotalExcedenteAceito
    let TotalREaisPesoFinal = ValorMercadoria / PesoIncialKG
    let Descobri = ValorTonelada * PesoFinalKG / 1000
    let TotalQuebraAdescontar = TotalExcedente * TotalREaisPesoFinal

    //let TotalFInal = TotalValorKG - Adiantamento + Pedagio - INSS - IR - SEST_SENAT - Outros - TotalQuebraAdescontar
    let TotalFInal = Descobri - TotalQuebraAdescontar



    console.log(TotalQuebraAdescontar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) // ok 
    console.log(Descobri.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    console.log(TotalFInal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))


    document.getElementById('tbQuebra').value = TotalQuebraAdescontar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })// ok 
    document.getElementById('tbTotalCartaFrete').value = Descobri.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    document.getElementById('tbTotalReceber').value = TotalFInal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })



}

botao.addEventListener('click', calcular)



//TotalKG = TotalKG
//ValorTotalKG = TotalValorKG
//QuebraTotal = TotalQuebra
//SaldoToleranciaExcedente = TotalExcedenteAceito
//ToleranciaExcedente = TotalExcedente
//TotalExcedente = TotalQuebraAdescontar