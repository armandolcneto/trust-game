package br.com.trustgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.trustgame.model.ConfigJogo;
import br.com.trustgame.repository.ConfigJogoRepository;


@Service
public class ConfigJogoService {

	@Autowired
	private ConfigJogoRepository configJogoRepository;

	public List<ConfigJogo> getAll() {
		return configJogoRepository.findAll();
	}	

	public void criarJogo(ConfigJogo data) {
		configJogoRepository.save(data);
	}
}