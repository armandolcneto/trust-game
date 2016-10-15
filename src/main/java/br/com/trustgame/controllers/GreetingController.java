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
        return new Greeting("Valor Transferido: R$" + message.getvalorEnviado()+",00");
    }

}