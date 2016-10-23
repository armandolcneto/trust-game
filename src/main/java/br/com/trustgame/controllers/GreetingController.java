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
        return new Greeting("Valor Recebido do Jogador B: R$"+ message.getvalorEnviado()+",00");
    }
    @MessageMapping("/hello2")
    @SendTo("/topic/greetings2")
    public Greeting greeting2(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Valor Recebido do Jogador A: R$"+ message.getvalorEnviado()+",00");
    }
    @MessageMapping("/hello3")
    @SendTo("/topic/greetings3")
    public Greeting greeting3(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Valor Enviado para o Jogador B: R$"+ message.getvalorEnviado()+",00");
    }
    
    @MessageMapping("/hello4")
    @SendTo("/topic/greetings4")
    public Greeting greeting4(Menssagem message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Valor Enviado para o Jogador A: R$"+ message.getvalorEnviado()+",00");
    }


}