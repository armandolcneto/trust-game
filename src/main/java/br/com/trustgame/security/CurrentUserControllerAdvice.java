//package br.com.trustgame.security;
//
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ModelAttribute;
//
//import br.com.trustgame.model.Usuario;
//
//@ControllerAdvice
//public class CurrentUserControllerAdvice {
//	
//	@ModelAttribute("currentUser")
//	public Usuario getCurrentUser(Authentication authentication) {
//		if (isAuthenticated(authentication) && authentication.getPrincipal() instanceof Usuario) {
//			Usuario usuario = (Usuario) authentication.getPrincipal();
//			usuario.setPassword("<secreto>");			
//			System.out.println("usuario logado: " + SecurityContextHolder.getContext()
//            .getAuthentication().getName());
//			return usuario;
//		}
//		return null;
//	}
//	
//	@ModelAttribute("isAuthenticated")
//	public boolean isAuthenticated(Authentication authentication) {
//		return authentication != null && authentication.getPrincipal() != null;
//	}
//}