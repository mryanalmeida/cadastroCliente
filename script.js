/**
 * Cadastro de Usuário
 * @author Marcos Almeida
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
                    mostrarMensagemErro('CEP não encontrado.');
                }
            })
            .catch(error => console.error('Erro ao buscar o endereço:', error));
    } else {
        mostrarMensagemErro('CEP inválido.');
    }
}

// Função de busca de DDD com base na cidade
function buscarDDD(cidade) {
    const ddds = {
        "Acre": "68",
        "Alagoas": "82",
        "Amapá": "96",
        "Amazonas": "92",
        "Bahia": "71",
        "Ceará": "85",
        "Distrito Federal": "61",
        "Espírito Santo": "27",
        "Goiás": "62",
        "Maranhão": "98",
        "Mato Grosso": "65",
        "Mato Grosso do Sul": "67",
        "Minas Gerais": "31",
        "Pará": "91",
        "Paraíba": "83",
        "Paraná": "41",
        "Pernambuco": "81",
        "Piauí": "86",
        "Rio de Janeiro": "21",
        "Rio Grande do Norte": "84",
        "Rio Grande do Sul": "51",
        "Rondônia": "69",
        "Roraima": "95",
        "Santa Catarina": "48",
        "São Paulo": "11",
        "Sergipe": "79",
        "Tocantins": "63",
        "São Luís": "98",
        "Fortaleza": "85",
        "Salvador": "71",
        "Belo Horizonte": "31",
        "Brasília": "61",
        "Curitiba": "41",
        "Manaus": "92",
        "Porto Alegre": "51",
        "Recife": "81",
        // Adicione mais cidades conforme necessário
    };

    return ddds[cidade] || ''; // Retorna o DDD ou uma string vazia se a cidade não for encontrada
}


// Função para mostrar mensagens de erro de forma amigável
function mostrarMensagemErro(mensagem) {
    const mensagemErroDiv = document.getElementById('mensagem-erro');
    mensagemErroDiv.textContent = mensagem;
    mensagemErroDiv.style.display = 'block'; // Mostra a mensagem
}
