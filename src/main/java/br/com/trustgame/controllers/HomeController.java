package br.com.trustgame.controllers;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import br.com.trustgame.model.AtuacaoProfissional;
import br.com.trustgame.model.BookKepping;
import br.com.trustgame.model.ConfigJogo;
import br.com.trustgame.model.DadosPessoais;
import br.com.trustgame.model.FormacaoAcademica;
import br.com.trustgame.model.PerfilJogador;
import br.com.trustgame.model.TransferenciaJogo;
import br.com.trustgame.service.AtuacaoProfissionalService;
import br.com.trustgame.service.BookKeppingService;
import br.com.trustgame.service.ConfigJogoService;
import br.com.trustgame.service.DadosPessoaisService;
import br.com.trustgame.service.FormacaoAcademicaService;
import br.com.trustgame.service.PerfilJogadorService;
import br.com.trustgame.service.TransferenciaJogoService;


@Controller
public class HomeController {
	
	@Autowired
	private FormacaoAcademicaService formacaoAcademicaService;
	
	@Autowired
	private AtuacaoProfissionalService atuacaoProfissionalService;
	
	@Autowired
	private ConfigJogoService configJogoService;
	
	@Autowired
	private TransferenciaJogoService transferenciaJogoService;
	
	@Autowired
	private PerfilJogadorService perfilJogadorService;
	
	@Autowired
	private BookKeppingService bookKeppingService;

	@Autowired
	private DadosPessoaisService dadosPessoaisService;
	
	
	private ModelAndView mav;
	
	@RequestMapping("/")
	public String root(Map<String, Object> model) {
		return "redirect:/admin";
	}

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
	
	@RequestMapping(value = "/jogador/{perfilJogador}/{jogoId}/{tipoJogador}")
	public ModelAndView jogador(Object perfilJogador,Object jogoId,Object tipoJogador) {
		mav = new ModelAndView("pages/jogador");
		mav.addObject("perfilJogador", perfilJogador);
		mav.addObject("jogoId", jogoId);
		mav.addObject("tipoJogador", tipoJogador);
		return mav;
	}
	
	@RequestMapping(value = "/gerenciador/{perfilJogador}/{jogoId}/{tipoJogador}")
	public ModelAndView gerenciador(Object perfilJogador,Object jogoId,Object tipoJogador) {
		mav = new ModelAndView("pages/gerenciador");
		mav.addObject("perfilJogador", perfilJogador);
		mav.addObject("jogoId", jogoId);
		mav.addObject("tipoJogador", tipoJogador);
		return mav;
	}
	
	@RequestMapping(value = "/todasFormacaoAcademica", method = { RequestMethod.GET })
	@ResponseBody
	
	public List<FormacaoAcademica> getAll(){
		return formacaoAcademicaService.getAll();
	}
	
	@RequestMapping(value = "/todasAtuacaoProfissional", method = { RequestMethod.GET })
	@ResponseBody
	public List<AtuacaoProfissional> getAllAtuacao(){
		return atuacaoProfissionalService.getAll();
	}
	
	@RequestMapping(value = "/buscarExperimentos", method = { RequestMethod.GET})
	@ResponseBody
	public List<ConfigJogo> getAllExperimentos(){
		return configJogoService.getAll();
	}
	
	@RequestMapping(value = "/transferencia", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus transferencia(@RequestBody TransferenciaJogo data){
		transferenciaJogoService.transferencia(data);
		return HttpStatus.OK;
	}	
	
	@RequestMapping(value = "/saldoAcumulado", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus saldoAcumulado(@RequestBody PerfilJogador data){
		perfilJogadorService.saldoAcumulado(data);
		return HttpStatus.OK;
	}	
	
	@RequestMapping(value = "/bookKepping", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus bookKepping(@RequestBody BookKepping data){
		bookKeppingService.bookKepping(data);
		return HttpStatus.OK;
	}
	
	@RequestMapping(value = "/novoexperimento", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus novoexperimento(@RequestBody ConfigJogo data){
		configJogoService.criarJogo(data);
		return HttpStatus.OK;
	}
	
	
	@RequestMapping(value = "/criarUsuario", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus criarPerfil(@RequestBody PerfilJogador data){
		perfilJogadorService.criarPerfil (data);

		
		return HttpStatus.OK;
	}
	
	@RequestMapping(value = "/cadastroJogador", method = { RequestMethod.POST})
	@ResponseBody
	public HttpStatus cadastroJogador(@RequestBody DadosPessoais data){
		dadosPessoaisService.cadastroJogador(data);
		return HttpStatus.OK;
	}
	
	
//	/*@RequestMapping(value = "/", method = RequestMethod.GET)
//	public String index() {
//		return "pages/home";
//	}
	
//	@RequestMapping(value = "/home", method = RequestMethod.GET)
//	public String home(ModelMap model) {
//		 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//	       Usuario user=null;
//	        if (principal instanceof Usuario) {
//	        user = ((Usuario)principal);
//	        }
//	     
//	    String name = user.getUsername();
//	    model.addAttribute("username", name);
//	    model.addAttribute("message", "Welcome to the secured page");
//		return "pages/home";
//	}
}
