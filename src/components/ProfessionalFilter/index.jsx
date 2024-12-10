import './styles.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const occupations = [
  { id: 0, name: 'Pedreiro' },
  { id: 1, name: 'Eletricista' },
  { id: 2, name: 'Designer de Interiores' },
  { id: 3, name: 'Arquiteto' },
  { id: 4, name: 'Engenheiro' },
];


export const ProfessionalFilter = ({ onFilter }) => {
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [profissao, setProfissao] = useState([]);

  const handleCheckboxChange = (occupation) => {
    setSelectedOccupations((prevSelected) =>
      prevSelected.includes(occupation)
        ? prevSelected.filter((item) => item !== occupation)
        : [...prevSelected, occupation]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Chama a função onFilter passando os valores do filtro
    onFilter({ profissao, estado, cidade });
  };

  return (

    <Form onSubmit={handleSubmit} className='form-filter'>


      <div className="ocupacoes">
        <label htmlFor="">Filtre por Profissões</label>
        {occupations.map((occupation) => (
          <label key={occupation.id}>
            <input
              type="checkbox"
              value={occupation.name}
              checked={selectedOccupations.includes(occupation.name)}
              onChange={() => handleCheckboxChange(occupation.name)}
            />
            {occupation.name}
          </label>
        ))}
      </div>

    </Form>
  );

}