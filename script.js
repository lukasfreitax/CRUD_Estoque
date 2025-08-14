let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
let editIndex = null;

function salvarEstoque (){
    localStorage.setItem('estoque', JSON.stringify(estoque));
}

function atualizarTabela(){
    const tbody = document.querySelector("#tabelaEstoque tbody");
    tbody.innerHTML = "";
    
    estoque.forEach((item, index) => {
        tbody.innerHTML += 
        `
        <tr>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            
            <td>
                <button onclick="editarItem(${index})"> Editar </button>
                <button onclick="excluirItem(${index})">Excluir</button>
            </td>
        </tr>
        `;

    });
}

document.getElementById("estoqueForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const nome = document.getElementById("nome").value;
    const quantidade = Number(document.getElementById("quantidade").value);

    if(editIndex !== null){
        estoque[editIndex] = { nome, quantidade };
        editIndex = null;   
    } else{
        estoque.push({ nome, quantidade });
    }

    salvarEstoque();
    atualizarTabela();
    this.reset();

});

function editarItem(index){
    
    document.getElementById("nome").value = estoque[index].nome;
    document.getElementById("quantidade").value = estoque[index].quantidade;
    editIndex = index;
}

function excluirItem(index){
    estoque.splice(index, 1);
    salvarEstoque();
    atualizarTabela();

}

atualizarTabela();

