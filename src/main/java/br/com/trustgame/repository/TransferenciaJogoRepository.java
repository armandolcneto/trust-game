package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.com.trustgame.model.TransferenciaJogo;



@Repository
public interface TransferenciaJogoRepository extends JpaRepository<TransferenciaJogo, Integer> {
	
	@Query("select tj from TransferenciaJogo tj order by tj.id")
	List<TransferenciaJogo> findAll();

} 
 