package br.com.trustgame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.trustgame.model.BookKepping;
import br.com.trustgame.model.TransferenciaJogo;



@Repository
public interface BookKeppingRepository extends JpaRepository<BookKepping, Integer> {
	
	@Query("select bk from BookKepping bk order by bk.id")
	List<BookKepping> findAll();

} 
 