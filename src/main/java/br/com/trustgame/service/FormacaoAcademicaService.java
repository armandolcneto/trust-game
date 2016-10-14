package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.trustgame.model.FormacaoAcademica;
import br.com.trustgame.repository.FormacaoAcademicaRepository;


@Service
public class FormacaoAcademicaService {

	@Autowired
	private FormacaoAcademicaRepository formacaoAcademicaRepository;

	public List<FormacaoAcademica> getAll() {
		return formacaoAcademicaRepository.findAll();
	}	
}