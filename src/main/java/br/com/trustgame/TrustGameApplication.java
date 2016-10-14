package br.com.trustgame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;

@Controller
@EnableAutoConfiguration
@ComponentScan
@SpringBootApplication
public class TrustGameApplication {
	 public static void main(String[] args) {
	        SpringApplication.run(TrustGameApplication.class, args);
	    }
	
//	 @Override
//	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//	        return application.sources(TrustGameApplication.class);
//	    }
}

   
