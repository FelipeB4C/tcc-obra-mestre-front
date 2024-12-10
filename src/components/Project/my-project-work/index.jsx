// import { useEffect, useState } from 'react';
// import { Container } from 'react-bootstrap';
// import { Link, useParams } from 'react-router-dom';
// import './styles.css';
// import { Button } from '../../Button';

// export const MyProjects = () => {
//   const { id } = useParams(); // Captura o userId da URL
//   const [projetos, setProjetos] = useState({ content: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch projetos do endpoint
//   useEffect(() => {
//     const fetchProjetos = async () => {
//       try {
//         console.log(id); // Verifica se o userId está correto
//         const response = await fetch(
//           `http://localhost:8080/projeto/listarProjCli/${id}`
//         );
//         if (!response.ok) {
//           throw new Error('Erro ao buscar os projetos');
//         }
//         const data = await response.json();
//         setProjetos({ content: data });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjetos();
//   }, [id]);

//   if (loading) {
//     return <p>Carregando projetos...</p>;
//   }

//   if (error) {
//     return <p>Erro: {error}</p>;
//   }

//   return (
//     <Container>
//       {projetos.content && projetos.content.length > 0 ? (
//         projetos.content.map((proj) => (
//           <Link
//             className="go-to-project"
//             key={proj.id}
//             to={`/project/${proj.id}`}
//             aria-label={`Ir para o projeto ${proj.nomeProjeto}`}
//           >
//             <div className="project-field">
//               <div className="project-info">
//                 <div className="project-name">
//                   <h2>{proj.nomeProjeto}</h2>
//                 </div>
//                 <div className="project-desc">
//                   <p>{proj.descTrabalho}</p>
//                 </div>
//                 <div className="project-location">
//                   {proj.estado} - {proj.cidade}
//                 </div>
//               </div>
//               <div className="contact-client-info">
//               <Button
//                   label={'Editar'}
//                   srcIcon={'/src/img/whatsapp.svg'}
//                 />
//                 <Button
//                   label={'Cancelar'}
//                   srcIcon={'/src/img/whatsapp.svg'}
//                 />
//                 <Button
//                   label={'Deletar'}
//                   srcIcon={'/src/img/whatsapp.svg'}
//                 />
//               </div>
//               <div className="button-mobile-display">
//                 <Button
//                   label={'Fale comigo!'}
//                   srcIcon={'/src/img/whatsapp.svg'}
//                 />
//               </div>
//             </div>
//           </Link>
//         ))
//       ) : (
//         <p>Nenhum projeto disponível.</p>
//       )}
//     </Container>
//   );
// };


import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import './styles.css';

export const MyProjectsWork = () => {
  const { id } = useParams(); // Captura o userId da URL
  const [projetos, setProjetos] = useState({ content: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch projetos do endpoint
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        console.log(id); // Verifica se o userId está correto
        const response = await fetch(
          `http://localhost:8080/projeto/listarProjProf/${id}`
        );
        if (!response.ok) {
          throw new Error('Erro ao buscar os projetos');
        }
        const data = await response.json();
        setProjetos({ content: data });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, [id]);

  const handleCancelProject = async (projectId) => {
    console.log(`DEu certo? 2 ${projectId}`)
    try {
        console.log(`DEu certo? ${projectId}`)
      const response = await fetch(
        `http://localhost:8080/projeto/${projectId}/cancelado`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao cancelar o projeto');
      }
      alert('Projeto cancelado com sucesso!');
      setProjetos((prevState) => ({
        content: prevState.content.map((proj) =>
          proj.id === projectId ? { ...proj, statusProjeto: 'CANCELADO' } : proj
        ),
      }));
    } catch (error) {
      alert(`Erro ao cancelar o projeto: ${error.message}`);
    }
  };

  const handleDeleteProject = async (projectId) => {
    console.log(`DEu certo? 2 ${projectId}`)
    try {
      const response = await fetch(
        `http://localhost:8080/projeto/deletarProjeto/${projectId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Erro ao deletar o projeto');
      }
      alert('Projeto deletado com sucesso!');
      setProjetos((prevState) => ({
        content: prevState.content.filter((proj) => proj.id !== projectId),
      }));
    } catch (error) {
      alert(`Erro ao deletar o projeto: ${error.message} e ${projectId}`);
    }
  };

  if (loading) {
    return <p>Carregando projetos...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <Container>
      {projetos.content && projetos.content.length > 0 ? (
        projetos.content.map((proj) => (
          <div key={proj.id} className="project-field">
            <Link
              className="go-to-project"
              to={`/project/${proj.id}`}
              aria-label={`Ir para o projeto ${proj.nomeProjeto}`}
            >
              <div className="project-info">
                <div className="project-name">
                  <h2>{proj.nomeProjeto}</h2>
                </div>
                <div className="project-desc">
                  <p>{proj.descTrabalho}</p>
                </div>
                <div className="project-location">
                  {proj.estado} - {proj.cidade}
                </div>
              </div>
            </Link>
            <div className="contact-client-info">
              <Button
                onClick={() => {
            
                    console.log(`Clique detectado no botão cancelar para o projeto ${proj.id}`);
                    handleCancelProject(proj.id)
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() =>
                  window.confirm(`Tem certeza que deseja deletar este projeto? ${proj.id}`) &&
                  handleDeleteProject(proj.id)
                }
              >
                Deletar
              </Button>
            </div>
            <div className="button-mobile-display">
              <Button>Fale comigo!</Button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum projeto disponível.</p>
      )}
    </Container>
  );
};
