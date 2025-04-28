fetch('data_tugas.json')
  .then(response => response.json())
  .then(data => {
    const teamGrid = document.getElementById('teamGrid');
    data.profile.forEach(member => {
        if (member.keanggotaan || member.sebagai) {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('team-member');

            memberDiv.innerHTML = `
                <div class="keanggotaan-box">
                    ${member.keanggotaan}
                </div>
                <div class="isi-box">
                    <div class="photo">
                        ${member.gambarProfile ? `<img src="${member.gambarProfile}" alt="${member.nama}">` : ''}
                    </div>
                    <p><strong>Nama:</strong><br>${member.nama}</p>
                    <p><strong>Sebagai:</strong><br>${member.sebagai}</p>
                </div>
            `;

            teamGrid.appendChild(memberDiv);
        }
    });

    const codingSkillContainer = document.getElementById('codingSkillContainer');
    let currentPage = 0;
    const itemsPerPage = 4;
    const totalItems = data.skill.length;

    function renderSkills(){
        codingSkillContainer.querySelectorAll('.box').forEach(box => box.remove());
        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, totalItems);
        for (let i = start; i < end; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `<img src="${data.skill[i].codingSkill}" alt="Coding Skill">`;
            codingSkillContainer.insertBefore(box, document.getElementById('rightArrow'));
        }
    }

    document.getElementById('leftArrow').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            renderSkills();
        }
    });

    document.getElementById('rightArrow').addEventListener('click', () => {
        if (currentPage < Math.floor(totalItems / itemsPerPage)) {
            currentPage++;
            renderSkills();
        }
    });
    renderSkills();
  })