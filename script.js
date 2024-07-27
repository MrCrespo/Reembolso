// Mapeamento das categorias para os ícones
const categoryIcons = {
    food: 'img/food.svg',
    accomodation: 'img/accommodation.svg',
    services: 'img/services.svg',
    transport: 'img/transport.svg',
    others: 'img/others.svg'
};

let totalAmount = 0;
let totalExpenses = 0; // Contador de despesas

// Função para adicionar despesa
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const expenseName = document.getElementById('expense').value;
    const category = document.getElementById('category').value;
    const amountValue = document.getElementById('amount').value.replace('R$', '').replace('.', '').replace(',', '.');
    const amount = parseFloat(amountValue);
    
    if (expenseName && category && !isNaN(amount)) {
        const expenseList = document.querySelector('aside ul');
        
        // Cria o item da lista com o ícone da categoria
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${categoryIcons[category]}" alt="${category}" class="icon" />
            ${expenseName} - R$ ${amount.toFixed(2)}
            <button onclick="removeExpense(this, ${amount})">
                <img src="img/remove.svg" alt="Remover" class="icon" />
            </button>
        `;
        
        expenseList.appendChild(listItem);
        
        // Atualiza o total e o contador de despesas
        totalAmount += amount;
        totalExpenses++;
        updateTotal();
        updateExpenseCount();

        // Limpa os campos do formulário
        document.getElementById('expense').value = '';
        document.getElementById('category').value = '';
        document.getElementById('amount').value = '';
    }
});

// Função para remover uma despesa
function removeExpense(button, amount) {
    const listItem = button.parentElement;
    listItem.remove();
    
    // Atualiza o total e o contador de despesas
    totalAmount -= amount;
    totalExpenses--;
    updateTotal();
    updateExpenseCount();
}

// Função para atualizar o total na interface
function updateTotal() {
    const totalElement = document.querySelector('aside header h2');
    totalElement.innerHTML = `<small>R$</small> ${totalAmount.toFixed(2)}`;
}

// Função para atualizar o contador de despesas na interface
function updateExpenseCount() {
    const countElement = document.querySelector('aside header p span');
    countElement.textContent = `${totalExpenses} despesas`;
}
