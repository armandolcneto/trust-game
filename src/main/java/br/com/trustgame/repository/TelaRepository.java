//package br.com.trustgame.repository;
//
//import java.util.List;
//
//import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import br.com.trustgame.model.Tela;
//import br.com.trustgame.model.Usuario;
//
//public class TelaRepository {
//	
////	@PersistenceContext
////	private EntityManager em;
//	
//	public List<Tela> loadPermissionsByUser(Usuario usuario) {
//		
////		TypedQuery<Tela> query = em.createQuery("select tela from Tela tela "
////													+ " inner join Usuario_x_Tela usuarioTela on tela.id = usuarioTela.idTela"
////													+ "where usuarioTela.fk_x_usr = :id",
////													Tela.class);
////		
////		query.setParameter("id", usuario.getId());
////		
////		List<Tela> telas = query.getResultList();
////		if (!CollectionUtils.isEmpty(telas)) {
////			return telas;
////		}
//		
//		return null;
//	}
//	
//	@Autowired
//    private SessionFactory sessionFactory;
//     
//    private Session getCurrentSession() {
//        return sessionFactory.getCurrentSession();
//    }
// 
//    public Tela getTela(int id) {
//        Tela tela = (Tela) getCurrentSession().load(Tela.class, id);
//        return tela;
//    }
//
//}
