package br.com.trustgame.controllers;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import br.com.trustgame.model.AtuacaoProfissional;
import br.com.trustgame.model.FormacaoAcademica;
import br.com.trustgame.service.AtuacaoProfissionalService;
import br.com.trustgame.service.FormacaoAcademicaService;

@Controller
public class HomeController {
	
	@Autowired
	private FormacaoAcademicaService formacaoAcademicaService;
	
	@Autowired
	private AtuacaoProfissionalService atuacaoProfissionalService;
	
	private ModelAndView mav;
	
	@RequestMapping("/")
	public String root(Map<String, Object> model) {
		return "redirect:/admin";
	}

//	@RequestMapping("/home")
//	public ModelAndView home() {
//		mav = new ModelAndView("pages/home");
//		return mav;
//	}
	
	@RequestMapping("/admin")
	public ModelAndView admin() {
		mav = new ModelAndView("pages/admin");
		return mav;
	}
	
	@RequestMapping("/cadastroJogador")
	public ModelAndView cadastroJogador() {
		mav = new ModelAndView("pages/cadastroJogador");
		return mav;
	}
	
	@RequestMapping("/jogador")
	public ModelAndView jogador() {
		mav = new ModelAndView("pages/jogador");
		return mav;
	}
	
	@RequestMapping(value = "/todasFormacaoAcademica", method = { RequestMethod.GET})
	@ResponseBody
	public List<FormacaoAcademica> getAll(){
		return formacaoAcademicaService.getAll();
	}
	
	@RequestMapping(value = "/todasAtuacaoProfissional", method = { RequestMethod.GET})
	@ResponseBody
	public List<AtuacaoProfissional> getAllAtuacao(){
		return atuacaoProfissionalService.getAll();
	}
	
	/*@RequestMapping(value = "/", method = RequestMethod.GET)
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
	}*/
}
