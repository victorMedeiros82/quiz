const questions = [
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
    {
        question: "Qual é o líquido responsável pela lubrificação do motor?",
        options: ["Óleo do motor", "Água do radiador", "Combustível", "Fluido de freio"],
        correct: 0
    },
    {
        question: "Qual é a maior floresta tropical do mundo?",
        options: ["Floresta Amazônica", "Floresta Negra", "Taiga", "Floresta Boreal"],
        correct: 0
    },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;
let helpUsed = false;
let remainingHelps = 4;
//função que carrega a proxima pergunta
function loadQuestion() {
    helpUsed = false;
    const q = questions[currentQuestion];
    document.getElementById("currentQuestion").textContent = currentQuestion + 1;
    document.getElementById("totalQuestions").textContent = questions.length;
    document.getElementById("question").textContent = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = ""; // Limpa as opções anteriores

    // Criação do layout em grade
    const grid = document.createElement("div");
    grid.classList.add("grid-container");

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("btn", "btn-primary", "grid-item");
        btn.dataset.index = index;
        btn.onclick = () => selectOption(index);
        grid.appendChild(btn);
    });

    optionsDiv.appendChild(grid);
    resetTimer();
}
//função que seleciona a resposta do jogador
function selectOption(index) {
    const buttons = document.querySelectorAll("#options button");

    const correctIndex = questions[currentQuestion].correct;
    buttons.forEach((btn) => (btn.disabled = true)); // Desabilita os botões

    // Define as cores de acordo com a resposta
    if (index === correctIndex) {
        buttons[index].classList.add("btn", "btn-success");
        buttons[index].classList.remove("btn-primary");
        score += 10;
    } else {
        buttons[index].classList.add("btn", "btn-danger");
        buttons[index].classList.remove("btn-primary");
        buttons[correctIndex].classList.add("btn", "btn-success");
        buttons[correctIndex].classList.remove("btn-primary");
    }

    setTimeout(nextQuestion, 2000); // Aguarda 2 segundos antes de avançar
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const modal = new bootstrap.Modal(document.getElementById("endGame-modal"));
    modal.show()
    // document.getElementById("question-container").innerHTML = `
    // <h2>Fim de Jogo</h2>
    // <p>Sua pontuação: ${score}</p>`;
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 60;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            nextQuestion();
        }
    }, 1000);
}

function eliminateOptions(count) {
    const options = Array.from(document.querySelectorAll("#options button"));
    const incorrect = options.filter(
        (btn) => parseInt(btn.dataset.index) !== questions[currentQuestion].correct
    );

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * incorrect.length);
        const btn = incorrect[randomIndex];
        btn.disabled = true;
        btn.classList.add("eliminated");
        incorrect.splice(randomIndex, 1);
    }
}

document.getElementById("skip-btn").onclick = () => {
    if (confirm("Tem certeza que deseja pular?")) {
        nextQuestion();
    }
};

// document.getElementById("help-btn").onclick = () => {
//     if (helpUsed || remainingHelps <= 0) {
//         alert(
//             "Você já usou a ajuda nesta pergunta ou não tem mais ajudas disponíveis."
//         );
//         return;
//     }
//     const modal = new bootstrap.Modal(document.getElementById("help-modal"));
//     modal.show();

//     document.querySelectorAll(".help-option").forEach((btn) => {
//         btn.onclick = () => {
//             const eliminations = Math.floor(Math.random() * 3) + 1;
//             eliminateOptions(eliminations);
//             helpUsed = true;
//             remainingHelps--;
//             modal.hide();
//         };
//     });
// };
document.getElementById("help-btn").onclick = () => {
    console.log(helpUsed)
    console.log(remainingHelps)
    // currentQuestion++;


    if (helpUsed || remainingHelps <= 0) {
        alert(
            "Você já usou a ajuda nesta pergunta ou não tem mais ajudas disponíveis."
        );
    } else {
        const modal = new bootstrap.Modal(document.getElementById("help-modal"));
        modal.show();

        document.querySelectorAll(".help-option").forEach((btn) => {
            btn.classList.add('p-5');
            btn.onclick = () => {
                const eliminations = Math.floor(Math.random() * 3) + 1;
                console.log(eliminateOptions(eliminations));
                remainingHelps--;
                // modal.hide();
            };
            // btn.disabled = true;
        });
    }
    if (questions[currentQuestion]) {
        helpUsed = true;
    } else {
        helpUsed = false;
    }
};

// Inicializa o jogo
loadQuestion();
