var _cFabricantes = $('#div-collapse-1');
var _cVeiculos = $('#div-collapse-2');
var _cModelos = $('#div-collapse-3');
var _cModal = $('#modalResultado');

$(document).ready(function () {	
	carregarFabricantes();
});

$('#fabricantes').on('change', function(){
	var fabricante = $('#fabricantes').val();
	carregarVeiculos(fabricante);	
})

$('#veiculos').on('change', function(){
	var fabricante = $('#fabricantes').val();
	var veiculo = $('#veiculos').val();
	carregarModelos(fabricante, veiculo);
})

$('#modelos').on('change', function(){
	var fabricante = $('#fabricantes').val();
	var veiculo = $('#veiculos').val();
	var modelo = $('#modelos').val();
	carregarInfoVeiculo(fabricante, veiculo, modelo);
})


function carregarFabricantes(){
	$.get( "http://fipeapi.appspot.com/api/1/carros/marcas.json", function(result) {
		if (result != null) {							
			var selectbox = $('#fabricantes');	
			selectbox.find('option').remove();
			selectbox.append($('<option>', {value:0, text:'Selecione'}));
			$.each(result, function (i, d) {
				$('<option>').val(d.id).text(d.name).appendTo(selectbox);
			});
			
			_cFabricantes.attr("class", "show");
			_cVeiculos.attr("class", "collapse");
			_cModelos.attr("class", "collapse");
		}
	});
}

function carregarVeiculos(fabricante){
	$.get( "http://fipeapi.appspot.com/api/1/carros/veiculos/" + fabricante + ".json", function(result) {
		if (result != null) {							
			var selectbox = $('#veiculos');		
			selectbox.find('option').remove();
			selectbox.append($('<option>', {value:0, text:'Selecione'}));
			$.each(result, function (i, d) {
				$('<option>').val(d.id).text(d.name).appendTo(selectbox);
			});
			
			_cVeiculos.attr("class", "show");
		}
	});
}

function carregarModelos(fabricante, veiculo){
	$.get( "http://fipeapi.appspot.com/api/1/carros/veiculo/" + fabricante + "/" + veiculo + ".json", function(result) {
		if (result != null) {							
			var selectbox = $('#modelos');		
			selectbox.find('option').remove();
			selectbox.append($('<option>', {value:0, text:'Selecione'}));
			$.each(result, function (i, d) {
				$('<option>').val(d.id).text(d.name).appendTo(selectbox);
			});
			
			_cModelos.attr("class", "show");
		}
	});
}

function carregarInfoVeiculo(fabricante, veiculo, modelo){
	/*http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828/2013-1.json*/
	
	$.get( "http://fipeapi.appspot.com/api/1/carros/veiculo/" + fabricante + "/" + veiculo + "/" + modelo + ".json", function(result) {
		if (result != null) {											
			_cModal.modal('show');
			
			$('#resMarca').val(result.marca);
			$('#resVeiculo').val(result.name);
			$('#resAno').val(result.ano_modelo);
			$('#resPreco').val(result.preco);
			$('#resCombustivel').val(result.combustivel);
			$('#resReferencia').val(result.referencia);
		}
	});
}

function jsNovaConsulta(){
	$('#veiculos').find('option').remove();
	$('#modelos').find('option').remove();		
	$('#fabricantes').val('0');
	_cVeiculos.attr("class", "collapse");
	_cModelos.attr("class", "collapse");
	
}