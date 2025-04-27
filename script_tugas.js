fetch('data_tugas.json')
  .then(response => response.json())
  .then(data => {
    // Menampilkan data anggota tim
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

    // Menampilkan foto pada Coding Skill section
    const codingSkillContainer = document.querySelector('.coding-skill .skill-content');
    data.skill.forEach(skill => {
      const box = document.createElement('div');
      box.classList.add('box');
      box.innerHTML = `<img src="${skill.codingSkill}" alt="Coding Skill">`;
      codingSkillContainer.appendChild(box);
    });
  })
  .catch(error => {
    console.error('Gagal mengambil data:', error);
  });
