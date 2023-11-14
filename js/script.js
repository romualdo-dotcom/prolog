const url = 'http://localhost:3333/tasks'


const taskContainer = document.querySelector('.taskContainer')

async function getAllTasks() {
    try {
        // Obtenha as tarefas da API
        const response = await fetch(url);

        // Verifique se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();

        // Limpe o conteúdo do contêiner antes de adicionar as novas tarefas
        taskContainer.innerHTML = ''; // Corrigir o nome da variável

        // Adicione as novas tarefas
        data.forEach(task => {
            const div = document.createElement("div");
            div.classList.add('task');

            const linha = task.linha.toUpperCase();
            const solicitacao = task.solicitacao.toUpperCase();
            const status = task.status.toUpperCase();
            const created_at = task.created_at;

            const taskInnerHTML = `
                <div class="task">
                    <h1 class="linha">${linha}</h1>
                    <h2 class="solicitacao">${solicitacao}</h2>
                    <p class="status">${status}</p>
                    <h3 class="data">${created_at}</h3>
                </div>
            `;

            div.innerHTML = taskInnerHTML;

            taskContainer.appendChild(div); // Corrigir o nome da variável
        });
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
    }
}

// Chame getAllTasks a primeira vez que a página carregar
getAllTasks();

// Atualize automaticamente a cada 5 segundos
setInterval(getAllTasks, 5000);

