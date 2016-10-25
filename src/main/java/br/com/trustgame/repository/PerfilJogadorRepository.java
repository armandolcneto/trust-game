package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.PerfilJogador;
import br.com.trustgame.model.TransferenciaJogo;



@Repository
public interface PerfilJogadorRepository extends JpaRepository<PerfilJogador, Integer> {
	
	@Query("select pj from PerfilJogador pj order by pj.id")
	List<PerfilJogador> findAll();

} 
 