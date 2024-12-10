import './styles.css';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

export const ProjectFilter = ({ onFilter }) => {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  const [estadoSelecionado, setEstadoSelecionado] = useState(""); // Armazena o ID do estado
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  // Buscar estados ao carregar a página
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error("Erro ao buscar estados:", error));
  }, []);

  // Buscar cidades quando um estado for selecionado
  useEffect(() => {
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      )
        .then((response) => response.json())
        .then((data) => setCidades(data))
        .catch((error) => console.error("Erro ao buscar cidades:", error));
    } else {
      setCidades([]); // Limpa cidades caso o estado seja desmarcado
    }
  }, [estadoSelecionado]);

  const handleSubmit = (event) => {
    event.preventDefault();
        // Chama a função onFilter passando os valores do filtro
        onFilter({ nomeProjeto, estado, cidade });
    fetchProfessionals({
      estado: estadoSelecionado,
      cidade: cidadeSelecionada,
    });

  };

  return (
    <Form onSubmit={handleSubmit} className='form-filter-project'>
      <Form.Group controlId="formNomeProjeto">
        <div className='nome-projeto'>
          <Form.Label>Nome do Projeto</Form.Label>
          <Form.Control
            type="text"
            value={nomeProjeto}
            onChange={(e) => setNomeProjeto(e.target.value)}
            placeholder="Digite o nome do projeto"
          />
        </div>

      </Form.Group>
      <div className='cidade-estado-group'>
        <Form.Group controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Select
                  onChange={(e) => setEstadoSelecionado(e.target.value)} // Armazena o ID do estado
                  value={estadoSelecionado}
                >
                  <option value="">Selecione um estado...</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome}
                    </option>
                  ))}
                </Form.Select>
        </Form.Group>
        <Form.Group controlId="formCidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Select
                  onChange={(e) => setCidadeSelecionada(e.target.value)}
                  value={cidadeSelecionada}
                  disabled={!estadoSelecionado} // Desabilita se nenhum estado for selecionado
                >
                  <option value="">Selecione uma cidade...</option>
                  {cidades.map((cidade) => (
                    <option key={cidade.id} value={cidade.nome}>
                      {cidade.nome}
                    </option>
                  ))}
                </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Filtrar
        </Button>
      </div>

    </Form>
  );
};