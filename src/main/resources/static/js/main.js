$('document').ready(function(){
	 $('body').click(function(element) {
		// if(this != $('#msgDiv'))  
		 $('#msgDiv').css( "display", "none" )
	 });
	 
	 
});
function retrieveAssuntos(setor){
	$.post('http://'+window.location.host+'/retrieveAssuntos',{ id : setor.value }, function (assuntoList) {
		var htmlBody = "";
		$.each( assuntoList, function( key, val ) {
			htmlBody += ( "<option value='" + val.id + "'>" + val.nme_assunto + "</option>" );
		});
		$('#assunto').html(htmlBody);
	}, 'json');
}

var flag; 

function msgDelivery(id, tipo, msg) 
 {
	$('#msgDiv').css("display", "block");
	flag = 0;
	 if (tipo == 'S'){
		$('#msgDiv').removeClass("bg-danger")
		$('#msgDiv').addClass("bg-success");
	 }	
	 else{
		$('#msgDiv').removeClass("bg-success");
		$('#msgDiv').addClass("bg-danger");
		 document.getElementById('msg').innerHTML = msg;
	 }
		 
}

function fechar()
{
	$('#msgDiv').css("display", "none");
	flag = 1;
}

//adiciona mascara ao telefone
function mascaraTelefone( campo ) {
    
    function trata( valor,  isOnBlur ) {
       
       valor = valor.replace( /[^\d]/g, '' );                      
       valor = valor.replace( /^(\d\d)(\d)/, '($1) $2' );       
       
       if( isOnBlur ) {
          
          valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");   
       } else {

          valor = valor.replace(/(\d)(\d{3})$/,"$1-$2"); 
       }
       return valor;
    }
    
    campo.onkeypress = function (evt) {
        
       var code = (window.event)? window.event.keyCode : evt.which;   
       var valor = this.value
       
       if(code > 57 || (code < 48 && code != 8 ))  {
          return false;
       } else {
          this.value = trata(valor, false);
       }
    }
    
    campo.onblur = function() {
       
       var valor = this.value;
       if( valor.length < 14 && valor != "" ) {
          this.value = ""
          var id = "telefone";
      	  var tipo = "N";
      	  var msg = "Telefone inválido!";
          msgDelivery(id, tipo, msg);
       }else {      
          this.value = trata( this.value, true );
       }
    }
    
    campo.maxLength = 15;
 }
 
//Validar email
 function validacaoEmail(email){
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    
     if(!filter.test(email.value)){
         if(email.value!=''){
        	 var id = "email";
        	 var tipo = "N";
        	 var msg = "E-mail inválido!";
             msgDelivery(id, tipo, msg);
             email.value= '';
         }
         return false
     }
 }
 
 //Fechamento automático da div de mensagem
 $('html').click(function() {
	   $('#msgDiv').css( "display", "none" )
	});

 function checkDiv(element)
 {    if(flag==1)
      {    divHide(element);
           flag=0;
           exit;
      }
 if(document.getElementById('msgDiv').style.display=="block")
      {flag=1;}
 }

 function divHide(element)
 {document.getElementById('msgDiv').style.display = "none";}
 

 
 
 