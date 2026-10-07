import { useState } from 'react';
import api from '../../services/api'; // Importa a configuração do Axios
import './style.css'; // Importa o visual moderno

function Cadastro() {
  // 1. O nosso "cesto" que guarda os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    username: '',
    email: '',
    senha: '',
    telefone: ''
  });

  // 2. O "vigia" que atualiza o estado a cada tecla pressionada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 3. A função que intercepta o botão e envia tudo para o Java via Axios
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede a tela de piscar/recarregar

    try {
      // Dispara o POST para http://localhost:8080/usuarios enviando o JSON do formData
      const resposta = await api.post('/usuarios', formData);
      
      console.log("Salvo no banco de dados:", resposta.data);
      
      // Limpa os campos da tela instantaneamente após o sucesso
      setFormData({ 
        nome: '', 
        username: '',
        email: '', 
        senha: '', 
        telefone: '' 
      });
      
      alert("Cadastro enviado com sucesso!");

    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Falha ao enviar os dados. Verifique se o backend Java está rodando.");
    }
  };

  // 4. A interface JSX (nosso antigo HTML, agora controlado pelo React)
  return (
    <div className="box">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="nome" 
          placeholder="Nome" 
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
         type="text"
         name="username"
         placeholder='Nome de usuário'
         value={formData.username}
         onChange={handleChange}
         required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          name="senha" 
          placeholder="Senha" 
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="telefone" 
          placeholder="Telefone" 
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;