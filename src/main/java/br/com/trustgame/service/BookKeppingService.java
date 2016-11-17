package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.trustgame.model.BookKepping;
import br.com.trustgame.model.TransferenciaJogo;
import br.com.trustgame.repository.BookKeppingRepository;
import br.com.trustgame.repository.TransferenciaJogoRepository;



@Service
public class BookKeppingService {

	@Autowired
	private BookKeppingRepository bookKeppingRepository;

	public List<BookKepping> getAll() {
		return bookKeppingRepository.findAll();
	}	
	
	public void bookKepping(BookKepping bookKepping){ 
		bookKeppingRepository.save(bookKepping);
	}
}