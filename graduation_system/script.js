document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gradeForm');
    const resultCard = document.getElementById('resultCard');
    const resetBtn = document.getElementById('resetBtn');

    // Inputs
    const nameInput = document.getElementById('name');
    const nimInput = document.getElementById('nim');
    const absencesInput = document.getElementById('absences');
    const assignmentInput = document.getElementById('assignment');
    const midtermInput = document.getElementById('midterm');
    const finalInput = document.getElementById('final');

    // Result Elements
    const resultName = document.getElementById('resultName');
    const resultNim = document.getElementById('resultNim');
    const finalScoreDisplay = document.getElementById('finalScore');
    const gradeDisplay = document.getElementById('grade');
    const statusDisplay = document.getElementById('status');

    // Typing Animation
    const text = "Sistem Penilaian Kelulusan";
    const typingElement = document.querySelector('.typing-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    if (typingElement) {
        typeWriter();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value;
        const nim = nimInput.value;
        const absences = parseInt(absencesInput.value);
        const assignment = parseFloat(assignmentInput.value);
        const midterm = parseFloat(midtermInput.value);
        const final = parseFloat(finalInput.value);

        // Validate inputs
        if (isNaN(absences) || absences < 0 || absences > 14) {
            alert('Jumlah ketidakhadiran harus antara 0 dan 14.');
            return;
        }

        if (!validateScore(assignment) || !validateScore(midterm) || !validateScore(final)) {
            alert('Nilai harus berada di antara 0 dan 100.');
            return;
        }

        // Calculate Score
        // Formula: 
        // Absensi: 35% (Calculated from 14 meetings)
        // Tugas: 15%
        // UTS: 25%
        // UAS: 25%

        const attendanceScore = ((14 - absences) / 14) * 100;
        const finalScore = (attendanceScore * 0.35) + (assignment * 0.15) + (midterm * 0.25) + (final * 0.25);

        // Determine Grade
        let grade = '';
        if (finalScore >= 85) grade = 'A';
        else if (finalScore >= 70) grade = 'B';
        else if (finalScore >= 55) grade = 'C';
        else if (finalScore >= 40) grade = 'D';
        else grade = 'E';

        // Determine Status
        const isPassed = ['A', 'B', 'C'].includes(grade);
        const statusText = isPassed ? 'LULUS' : 'TIDAK LULUS';

        // Update UI
        resultName.textContent = name;
        resultNim.textContent = `NIM: ${nim}`;
        finalScoreDisplay.textContent = finalScore.toFixed(2); // 2 decimal places
        gradeDisplay.textContent = grade;
        statusDisplay.textContent = statusText;

        // Styling based on status
        resultCard.classList.remove('status-lulus', 'status-gagal');
        resultCard.classList.add(isPassed ? 'status-lulus' : 'status-gagal');

        // Show result
        resultCard.classList.remove('hidden');
        resultCard.classList.add('show');

        // Scroll to result on mobile
        if (window.innerWidth < 600) {
            resultCard.scrollIntoView({ behavior: 'smooth' });
        }
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        resultCard.classList.remove('show');
        setTimeout(() => {
            resultCard.classList.add('hidden');
        }, 300); // Wait for animation
    });

    function validateScore(score) {
        return !isNaN(score) && score >= 0 && score <= 100;
    }
});
