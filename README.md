<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RB Rocket MSCE English Paper 1 - Section A</title>
    <style>
        :root {
            --primary: #1e3a8a;
            --secondary: #f59e0b;
            --success: #10b981;
            --danger: #ef4444;
            --dark: #1f2937;
            --light: #f3f4f6;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: var(--light); color: var(--dark); line-height: 1.6; padding: 15px; }
        header { background: var(--primary); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        header h1 { font-size: 1.5rem; margin-bottom: 5px; }
        
        .container { max-width: 600px; margin: 0 auto; }
        .card { background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        
        /* Batch Selector */
        .batch-selector { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        select { padding: 12px; font-size: 1rem; border-radius: 6px; border: 1px solid #ccc; width: 100%; outline: none; background: white; }
        
        /* Question Layout */
        .question-text { font-size: 1.1rem; font-weight: 600; margin-bottom: 15px; }
        .options-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .option-btn { width: 100%; text-align: left; padding: 12px 15px; background: #fff; border: 2px solid #e5e7eb; border-radius: 6px; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
        .option-btn:hover { border-color: var(--primary); background: #f0f4ff; }
        
        /* Feedback Utilities */
        .correct { background: #d1fae5 !important; border-color: var(--success) !important; color: #065f46; font-weight: bold; }
        .incorrect { background: #fee2e2 !important; border-color: var(--danger) !important; color: #991b1b; }
        
        .explanation-box { background: #eff6ff; border-left: 4px solid var(--primary); padding: 15px; margin-top: 15px; border-radius: 0 6px 6px 0; display: none; }
        .explanation-title { font-weight: bold; color: var(--primary); margin-bottom: 5px; }
        
        .nav-buttons { display: flex; justify-content: space-between; margin-top: 20px; }
        .btn { padding: 12px 20px; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; font-weight: 600; background: var(--primary); color: white; transition: background 0.2s; }
        .btn:hover { background: #132b6b; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; background: var(--primary); }
        .btn-secondary { background: var(--secondary); color: var(--dark); }
        .btn-secondary:hover { background: #d98704; }
        
        /* Static Footer Info Area */
        .donation-box { background: linear-gradient(135deg, #fffbeb, #fef3c7); border: 2px dashed var(--secondary); border-radius: 8px; padding: 20px; text-align: center; margin-top: 30px; }
        .donation-title { font-size: 1.2rem; font-weight: bold; color: #92400e; margin-bottom: 8px; }
        .donation-methods { margin-top: 15px; display: flex; flex-direction: column; gap: 10px; text-align: left; font-size: 0.95rem; }
        .method-item { background: white; padding: 12px; border-radius: 6px; border: 1px solid #fde68a; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .method-item strong { color: var(--primary); }

        /* Pop-up Modal Styles */
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 1000; justify-content: center; align-items: center; padding: 20px; }
        .modal-content { background: white; max-width: 500px; width: 100%; border-radius: 12px; padding: 25px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: slideDown 0.3s ease-out; text-align: center; }
        .modal-header { font-size: 1.4rem; font-weight: bold; color: var(--primary); margin-bottom: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .modal-body { font-size: 1rem; margin-bottom: 20px; color: #4b5563; text-align: left; }
        .modal-buttons { display: flex; flex-direction: column; gap: 10px; }
        .close-modal-btn { background: #e5e7eb; color: var(--dark); padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; }
        .close-modal-btn:hover { background: #d1d5db; }

        @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>RB Rocket</h1>
        <p>MSCE English Paper 1 — Section A</p>
    </header>

    <div class="card">
        <label for="batchSelect" style="font-weight: bold; display:block; margin-bottom: 8px;">Select a Practice Batch:</label>
        <div class="batch-selector">
            <select id="batchSelect" onchange="loadNewBatch()">
                </select>
        </div>
        <p id="progress-text" style="font-size: 0.9rem; color: #666;"></p>
    </div>

    <div class="card" id="quiz-container">
        <div class="question-text" id="question-text">Loading question database...</div>
        <div class="options-list" id="options-container">
            </div>
        
        <div class="explanation-box" id="explanation-box">
            <div class="explanation-title">Explanation:</div>
            <div id="explanation-text"></div>
        </div>

        <div class="nav-buttons">
            <button class="btn" id="prev-btn" onclick="prevQuestion()" disabled>Previous</button>
            <button class="btn" id="next-btn" onclick="nextQuestion()">Next Question</button>
        </div>
    </div>

    <div class="donation-box">
        <div class="donation-title">💛 Support Open Education</div>
        <p style="font-size: 0.95rem; color: #78350f;">
            This platform is 100% free, powered by the <strong>RB Rocket</strong>. To help us keep it online and accessible for students across Malawi, please consider supporting our work.
        </p>
    </div>
</div>

<div class="modal-overlay" id="donationModal">
    <div class="modal-content">
        <div class="modal-header">
            <span>🎉 Batch Completed!</span>
        </div>
        <div class="modal-body">
            <p style="margin-bottom: 12px; text-align: center; font-weight: 600;">You've successfully finished this session of 20 questions!</p>
            <p style="margin-bottom: 12px;">This interactive quiz is provided entirely free by the <strong>RB Rocket</strong> to support Malawian students. However, keeping this platform active relies entirely on your generosity.</p>
            <p style="font-weight: 600; color: #92400e; margin-bottom: 10px;">If this page helped you today, please consider supporting the page maintenance:</p>
            
            <div class="donation-methods" style="margin-top: 5px;">
                               <div class="method-item" style="text-align: center;"> <a href="https://give.paychangu.com/dc-x8nfui" target="_blank" style="color: var(--primary); font-weight: bold; text-decoration: underline;">Support our efforts to make MSCE Success accessible to all</a></div>
            </div>
        </div>
        <div class="modal-buttons">
            <button class="btn btn-secondary" onclick="advanceToNextBatch()">Move to Next Batch</button>
            <button class="close-modal-btn" onclick="closeModal()">Close and Stay Here</button>
        </div>
    </div>
</div>

<script>
    let mcqDatabase = [];
    let currentBatchQuestions = [];
    let currentIndex = 0;
    const questionsPerBatch = 20;

    // Define the exact name of your JSON file here
    const jsonFileName = 'rb_rocket_eng_mcqs.json';

    window.onload = function() {
        // Fetch the native JSON file asynchronously
        fetch(jsonFileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Could not find the JSON file: " + jsonFileName);
                }
                return response.json();
            })
            .then(data => {
                mcqDatabase = data;
                buildBatchSelector();
                loadNewBatch();
            })
            .catch(error => {
                console.error(error);
                document.getElementById('question-text').innerText = "Database Error: Ensure '" + jsonFileName + "' is uploaded to the same folder on GitHub.";
            });
    };

    function buildBatchSelector() {
        const selector = document.getElementById('batchSelect');
        const totalBatches = Math.ceil(mcqDatabase.length / questionsPerBatch);
        selector.innerHTML = '';
        
        for(let i = 0; i < totalBatches; i++) {
            let start = i * questionsPerBatch + 1;
            let end = Math.min((i + 1) * questionsPerBatch, mcqDatabase.length);
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = `Batch ${i + 1} (Questions ${start} - ${end})`;
            selector.appendChild(opt);
        }
    }

    function loadNewBatch() {
        const batchIndex = parseInt(document.getElementById('batchSelect').value);
        const start = batchIndex * questionsPerBatch;
        const end = start + questionsPerBatch;
        
        currentBatchQuestions = mcqDatabase.slice(start, end);
        currentIndex = 0;
        showQuestion();
    }

    function showQuestion() {
        if(currentBatchQuestions.length === 0) return;
        
        const qData = currentBatchQuestions[currentIndex];
        document.getElementById('question-text').innerText = `${currentIndex + 1}. ${qData.question}`;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        document.getElementById('explanation-box').style.display = 'none';
        
        document.getElementById('prev-btn').disabled = (currentIndex === 0);
        
        if (currentIndex === currentBatchQuestions.length - 1) {
            document.getElementById('next-btn').innerText = "Finish Batch";
            document.getElementById('next-btn').classList.add('btn-secondary');
        } else {
            document.getElementById('next-btn').innerText = "Next Question";
            document.getElementById('next-btn').classList.remove('btn-secondary');
        }

        const currentBatchNum = parseInt(document.getElementById('batchSelect').value) + 1;
        document.getElementById('progress-text').innerText = `Viewing Question ${currentIndex + 1} of ${currentBatchQuestions.length} inside Batch ${currentBatchNum}`;

        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = function() { handleAnswerSelection(btn, opt.charAt(0), qData.correctAnswer, qData.explanation); };
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswerSelection(selectedButton, chosenLetter, correctLetter, explanation) {
        const allButtons = document.querySelectorAll('.option-btn');
        allButtons.forEach(btn => btn.disabled = true);

        if(chosenLetter === correctLetter) {
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            allButtons.forEach(btn => {
                if(btn.innerText.charAt(0) === correctLetter) {
                    btn.classList.add('correct');
                }
            });
        }

        document.getElementById('explanation-text').innerText = explanation;
        document.getElementById('explanation-box').style.display = 'block';
    }

    function nextQuestion() {
        if(currentIndex < currentBatchQuestions.length - 1) {
            currentIndex++;
            showQuestion();
        } else {
            openModal();
        }
    }

    function prevQuestion() {
        if(currentIndex > 0) {
            currentIndex--;
            showQuestion();
        }
    }

    /* Modal Controllers */
    function openModal() {
        document.getElementById('donationModal').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('donationModal').style.display = 'none';
    }

    function advanceToNextBatch() {
        closeModal();
        const selector = document.getElementById('batchSelect');
        if(selector.selectedIndex < selector.options.length - 1) {
            selector.selectedIndex += 1;
            loadNewBatch();
        } else {
            alert("Incredible work! Keep learning!");
        }
    }
</script>
</body>
</html>
