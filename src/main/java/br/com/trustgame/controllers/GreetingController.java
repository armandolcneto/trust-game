package br.com.trustgame.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import br.com.trustgame.model.Greeting;
import br.com.trustgame.model.Menssagem;

@Controller
public class GreetingController {
	

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        String msg = "{\"valor\":" + message.getValorEnviado() +","+"\"id_perfil\":"+ message.getId_perfil() + ","+"\"nome\":\"" +message.getNome()+"\"" + ","+"\"grupo\":\"" +message.getGrupo()+"\""+ ","+"\"destino\":\"" +message.getDestino()+"\""+ ","+"\"book\":\"" +message.getBook()+"\""+"}";
        return new Greeting(msg);
    }
    @MessageMapping("/hello2")
    @SendTo("/topic/greetings2")
    public Greeting greeting2(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        String  msg = "{\"valor\":" + message.getValorEnviado() +","+"\"id_perfil\":"+ message.getId_perfil() + ","+"\"nome\":\"" +message.getNome()+"\"" + ","+"\"grupo\":\"" +message.getGrupo()+"\""+ ","+"\"destino\":\"" +message.getDestino()+"\""+"}";
        return new Greeting(msg);
    }
    @MessageMapping("/hello3")
    @SendTo("/topic/greetings3")
    public Greeting greeting3(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("{\"valor\":" + message.getValorEnviado() +","+"\"id_perfil\":"+ message.getId_perfil() + ","+"\"nome\":\"" +message.getNome()+"\"" + ","+"\"grupo\":\"" +message.getGrupo()+"\""+ ","+"\"destino\":\"" +message.getDestino()+"\""+"}");
    }
    
    @MessageMapping("/hello4")
    @SendTo("/topic/greetings4")
    public Greeting greeting4(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("{\"valor\":" + message.getValorEnviado() +","+"\"id_perfil\":"+ message.getId_perfil() + ","+"\"nome\":\"" +message.getNome()+"\"" + ","+"\"grupo\":\"" +message.getGrupo()+"\""+ ","+"\"destino\":\"" +message.getDestino()+"\""+"}");
    }


}