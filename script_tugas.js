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
    const codingSkillContainer = document.getElementById('codingSkillContainer');
    let currentPage = 0; // Menentukan halaman saat ini (0 berdasarkan index)
    const itemsPerPage = 4; // Menampilkan 4 gambar per halaman
    const totalItems = data.skill.length; // Total gambar yang tersedia

    // Fungsi untuk menampilkan gambar-gambar pada halaman
    function renderSkills() {
      // Menghapus konten lama sebelum menampilkan yang baru
      codingSkillContainer.querySelectorAll('.box').forEach(box => box.remove());
      
      const start = currentPage * itemsPerPage;
      const end = Math.min(start + itemsPerPage, totalItems);

      // Menambahkan gambar baru berdasarkan halaman
      for (let i = start; i < end; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = `<img src="${data.skill[i].codingSkill}" alt="Coding Skill">`;
        codingSkillContainer.insertBefore(box, document.getElementById('rightArrow')); // Menambahkan sebelum tombol kanan
      }
    }

    // Fungsi untuk tombol navigasi kiri
    document.getElementById('leftArrow').addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--; // Menurunkan halaman
        renderSkills(); // Menampilkan gambar sesuai halaman
      }
    });

    // Fungsi untuk tombol navigasi kanan
    document.getElementById('rightArrow').addEventListener('click', () => {
      if (currentPage < Math.floor(totalItems / itemsPerPage)) {
        currentPage++; // Menambah halaman
        renderSkills(); // Menampilkan gambar sesuai halaman
      }
    });

    // Menampilkan gambar pertama kali saat halaman dimuat
    renderSkills();
  })
  .catch(error => {
    console.error('Gagal mengambil data:', error);
  });
