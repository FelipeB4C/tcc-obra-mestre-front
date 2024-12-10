import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/Input/TextArea';
import { useParams } from 'react-router-dom';

export const RegisterProject = () => {
  const navigate = useNavigate();

  const [request, setRequest] = useState({});

  // Selecionar estado e cidade
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  useEffect(() => {
    // Buscar estados na API do IBGE
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstados(data))
      .catch((error) => console.error('Erro ao buscar estados:', error));
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      // Buscar cidades com base no ID do estado selecionado
      const estado = estados.find(
        (estado) => estado.nome === estadoSelecionado,
      );
      if (estado) {
        fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`,
        )
          .then((response) => response.json())
          .then((data) => setCidades(data))
          .catch((error) => console.error('Erro ao buscar cidades:', error));
      }
    }
  }, [estadoSelecionado]);

  const { id } = useParams();
  const token = localStorage.getItem('token');

  function registerProject(projectBuild) {
    console.log(projectBuild);
    fetch(
      `http://localhost:8080/projeto/usuario/${id}/cadastrar`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectBuild),
      },
      [],
    )
      .then((resp) => {
        navigate('/projects', {
          message: 'Projeto criado com sucesso!',
        });
      })
      .catch((err) => console.log(err));
  }

  const [projeto, setProjeto] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const projectBuild = {
      nomeProjeto: projeto.nomeProjeto,
      descTrabalho: projeto.descTrabalho,
      ocupacao: projeto.ocupacao,
      dataInicio: data,
      estado: estadoSelecionado,
      cidade: cidadeSelecionada,
    };
    registerProject(projectBuild);
  };

  function handleChange(e) {
    setProjeto({ ...projeto, [e.target.name]: e.target.value });
  }

  const [data, setData] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setData(formattedDate);
  };

  return (
    <Container>
      <div className="form-field-projeto">
        <h1>Cadastro de Projeto</h1>
        <form onSubmit={submit}>
          <div className='projeto-data'>
            <Input
              className="form-nome-projeto"
              label={'Título do projeto'}
              type={'text'}
              name="nomeProjeto"
              placeholder={'Um breve resumo'}
              handleOnChange={handleChange}
              required
            />
            <Input
              label={'Data de início da obra'}
              type={'date'}
              handleOnChange={handleDateChange}
            />

            <div className="form-ocupacao-projeto">
              <label htmlFor="ocupacao">Profissional necessário</label>
              <select
                id="ocupacao"
                name="ocupacao"
                onChange={handleChange}
                required
              >
                <option value="">Selecione um profissional...</option>
                <option value="0">Pedreiro</option>
                <option value="1">Eletricista</option>
                <option value="2">Designer de Interiores</option>
                <option value="3">Arquiteto</option>
                <option value="4">Engenheiro</option>
              </select>
            </div>
          </div>

          <TextArea
            label={'Descrição do projeto'}
            type={'text'}
            name="descTrabalho"
            length={15}
            placeholder={'Nos conte mais o que precisa ser feito...'}
            handleOnChange={handleChange}
          />

          <div className="select-estado">
            <div className="option-cidade">
              <label htmlFor="">Escolha o estado:</label>
              <select
                onChange={(e) => setEstadoSelecionado(e.target.value)}
                value={estadoSelecionado}
              >
                <option value="">Selecione...</option>
                {estados.map((estado) => (
                  <option key={estado.id} value={estado.nome}>
                    <div>
                      {estado.nome}
                    </div>
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="">Escolha uma cidade:</label>
              <select
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                value={cidadeSelecionada}
                className='cidade-cidade'
              >
                <option value="">Selecione...</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    <div>
                      {cidade.nome}
                    </div>
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" variant="primary">
            ENVIAR
          </Button>
        </form>
      </div>
    </Container>
  );
};
