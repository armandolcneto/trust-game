//package br.com.trustgame.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import br.com.trustgame.model.Usuario;
//import br.com.trustgame.repository.UsuarioRepository;
//
//@Service
//public class CurrentUserDetailsService implements UserDetailsService {
//
//	@Autowired
//	private UsuarioRepository usuarioRepository;
//	
//	@Override
//	public Usuario loadUserByUsername(String name) throws UsernameNotFoundException {
//		
//		Usuario usuario = usuarioRepository.loadUserByUsername(name);
//		
//		if (usuario != null) {
//			return usuario;
//		} else {
//			throw new UsernameNotFoundException(name);
//		}
//		
//	}
//	
//}