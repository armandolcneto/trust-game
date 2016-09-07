package br.com.trustgame.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import br.com.trustgame.model.Usuario;

@Repository
public class UsuarioRepository{
	
	@PersistenceContext
	private EntityManager em;
	
	public Usuario loadUserByUsername(String username) {
		
		TypedQuery<Usuario> query = em.createQuery("select usuario from Usuario usuario "
				+ "inner join fetch usuario.telas telas where usuario.username = :username", Usuario.class);
		query.setParameter("username", username);
		
		List<Usuario> usuarios = query.getResultList();
		if (!CollectionUtils.isEmpty(usuarios)) {
			return usuarios.iterator().next();			
		}
		
		return null;
	}
		
}
