package br.com.trustgame.controllers;

import java.io.IOException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lowagie.text.DocumentException;

import br.com.trustgame.model.Usuario;
import net.sf.jasperreports.engine.JRException;

@Controller
@PreAuthorize("hasAuthority('daf/relatorios/rel_empenhos')") //Permissão de exemplo
public class HomeController {
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index() {
		return "pages/home";
	}
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(ModelMap model) {
		 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	       Usuario user=null;
	        if (principal instanceof Usuario) {
	        user = ((Usuario)principal);
	        }
	     
	    String name = user.getUsername();
	    model.addAttribute("username", name);
	    model.addAttribute("message", "Welcome to the secured page");
		return "pages/home";
	}	
}
