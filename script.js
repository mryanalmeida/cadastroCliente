/**
 * Cadastro de Usuário
 * @author Andrew Dantas
 * @link
 * @version 1.0
 */

// Função para buscar endereço pelo CEP usando API ViaCEP
function buscarEndereco() {
    let cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(urlAPI)
            .then(response => response.json())
            .then(dados => {
                if (!dados.erro) {
                    document.getElementById('logradouro').value = dados.logradouro;
                    document.getElementById('bairro').value = dados.bairro;
                    document.getElementById('cidade').value = dados.localidade;
                    document.getElementById('uf').value = dados.uf;

                    // Define o DDD automaticamente no campo de telefone
                    const ddd = buscarDDD(dados.localidade);
                    const telefoneInput = document.getElementById('telefone');
                    telefoneInput.value = `(${ddd}) `; // Preenche com o DDD inicial
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => console.error('Erro ao buscar o endereço:', error));
    } else {
        alert('CEP inválido.');
    }
}

// Função de busca de DDD com base na cidade
function buscarDDD(cidade) {
    const ddds = {
        "São Paulo": "11",
        "Rio de Janeiro": "21",
        "Belo Horizonte": "31",
        "Brasília": "61",
        "Salvador": "71",
        "Fortaleza": "85",
        "Curitiba": "41",
        "Manaus": "92",
        "Porto Alegre": "51",
        "Recife": "81",
        // Adicionar mais cidades e seus respectivos DDDs conforme necessário
    };

    return ddds[cidade] || ''; // Retorna o DDD ou uma string vazia se a cidade não for encontrada
}
