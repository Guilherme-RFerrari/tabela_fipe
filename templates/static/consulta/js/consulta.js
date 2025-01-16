function coleta_marcas(){
    tipo_veiculo_id = document.getElementById('tipo_veiculo_selecionado')
    
    tipo_veiculo_id = tipo_veiculo_id.value

    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

    div_marcas = document.getElementById('marca_selecionada')
    div_marcas.innerHTML = ""
    
    div_modelos = document.getElementById('modelo_selecionado')
    div_modelos.innerHTML = ""

    text_modelo = document.getElementById('text_modelo_selecionado')
    text_modelo.innerHTML = ""
    
    text_marca = document.getElementById('text_marca_selecionado')
    text_marca.innerHTML = ""

    text_referencia = document.getElementById('text_referencia')
    text_referencia.innerHTML = ""
    
    div_modelos_info = document.getElementById('modelo_info_selecionado')
    div_modelos_info.innerHTML = ""


    data = new FormData()
    data.append('tipo_veiculo_id', tipo_veiculo_id)

    fetch("/consulta/coleta_marcas",{
        method: "POST",
        headers: {
            'X-CSRFToken': csrf_token,
        },
        body: data
    }).then(function(result){
        return result.json()
    }).then(function(data){
        div_marcas.disabled = false;
        div_marcas.innerHTML += "<option value='' disabled selected>Selecione uma marca</option>";
        data.forEach(element => {
            div_marcas.innerHTML += "<option value='"+ element['id'] +"'>"+ element['brand'] +"</option>"
        });
    })
}

function coleta_modelos(){
    marca_id = document.getElementById('marca_selecionada')
    marca_id = marca_id.value

    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

    text_modelo = document.getElementById('text_modelo_selecionado')
    text_modelo.innerHTML = ""
    
    text_marca = document.getElementById('text_marca_selecionado')
    text_marca.innerHTML = ""

    text_referencia = document.getElementById('text_referencia')
    text_referencia.innerHTML = ""
    
    div_modelos = document.getElementById('modelo_selecionado')
    div_modelos.innerHTML = ""

    div_modelos_info = document.getElementById('modelo_info_selecionado')
    div_modelos_info.innerHTML = ""
    
    data = new FormData()
    data.append('marca_id', marca_id)

    fetch("/consulta/coleta_modelos",{
        method: "POST",
        headers: {
            'X-CSRFToken': csrf_token,
        },
        body: data
    }).then(function(result){
        return result.json()
    }).then(function(data){
        data.forEach(element => {
            div_modelos.innerHTML += "<tr onclick='coleta_modelos_info(this)'>\
                <td data-fipe-code='"+ element['fipe_code'] +"'>"+ element['model'] +"</td>\
                <td>"+ element['years'] +"</td>\
            </tr>"
        });
        
    })
}

function coleta_modelos_info(linha){
    modelo = linha.querySelectorAll('td')[0].textContent;
    fip_code = linha.querySelectorAll('td')[0].dataset.fipeCode;
    ano = linha.querySelectorAll('td')[1].textContent;
    marca = document.getElementById("marca_selecionada");
    marca = marca.options[marca.selectedIndex].text;

    csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

    div_modelos_info = document.getElementById('modelo_info_selecionado')
    div_modelos_info.innerHTML = ""

    text_modelo = document.getElementById('text_modelo_selecionado')
    text_modelo.innerHTML = modelo

    text_marca = document.getElementById('text_marca_selecionado')
    text_marca.innerHTML = marca

    data = new FormData()
    data.append('fip_code', fip_code)

    fetch("/consulta/coleta_modelos_info",{
        method: "POST",
        headers: {
            'X-CSRFToken': csrf_token,
        },
        body: data
    }).then(function(result){
        return result.json()
    }).then(function(data){

        console.log(data)
        data['years'].forEach(modelo => {
            div_modelos_info.innerHTML +="<tr>\
            <td>"+ modelo['model_year'] +"</td>\
            <td>"+ modelo['fuel'] +"</td>\
            <td>"+ modelo['price'].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) +"</td>\
        </tr>"
        });

        text_referencia = document.getElementById('text_referencia')
        text_referencia.innerHTML = data['reference']
        
    })
}