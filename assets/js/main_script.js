function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  if (!snackbar) return;

  snackbar.textContent = message;
  snackbar.className = 'snackbar show';
  setTimeout(() => {
    snackbar.className = 'snackbar';
  }, 3000);
}

function updatePagination(filteredCount) {
  const projectsGrid = document.querySelector('.projects-grid');
  const itemsPerPage = parseInt(projectsGrid?.dataset?.itemsPerPage || 8);
  const pageCount = Math.ceil(filteredCount / itemsPerPage);
  const currentPage = parseInt(projectsGrid?.dataset?.currentPage || 1);

  const prevBtn = document.querySelector('.prev-page');
  const nextBtn = document.querySelector('.next-page');
  const pageNumbers = document.querySelector('.page-numbers');

  if (!prevBtn || !nextBtn || !pageNumbers) return;

  // Update navigation buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === pageCount;

  // Create page numbers
  pageNumbers.innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    const pageNum = document.createElement('div');
    pageNum.className = `page-number ${i === currentPage ? 'active' : ''}`;
    pageNum.textContent = i;
    pageNum.onclick = () => {
      if (projectsGrid) {
        projectsGrid.dataset.currentPage = i.toString();
        updateProjectsDisplay();
      }
    };
    pageNumbers.appendChild(pageNum);
  }

  // Set up navigation handlers
  prevBtn.onclick = () => {
    if (currentPage > 1 && projectsGrid) {
      projectsGrid.dataset.currentPage = (currentPage - 1).toString();
      updateProjectsDisplay();
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < pageCount && projectsGrid) {
      projectsGrid.dataset.currentPage = (currentPage + 1).toString();
      updateProjectsDisplay();
    }
  };
}

function filterAndSortProjects() {
  const projects = Array.from(document.querySelectorAll('.project-card'));
  const selectedTags = Array.from(document.querySelectorAll('.tag-checkbox input:checked'))
    .map(cb => cb.value);
  const showGameOnly = document.getElementById('game-only')?.checked || false;
  const sortOrder = document.getElementById('sort-date')?.value || 'newest';

  // Apply filters
  const filteredProjects = projects.filter(project => {
    const tags = project.dataset.tags?.split(',') || [];
    const isGame = project.dataset.isGame === 'true';
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => tags.includes(tag));
    const matchesGameFilter = !showGameOnly || isGame;
    
    return matchesTags && matchesGameFilter;
  });

  // Sort projects
  filteredProjects.sort((a, b) => {
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return filteredProjects;
}

function updateProjectsDisplay() {
  const projectsGrid = document.querySelector('.projects-grid');
  const noResults = document.querySelector('.no-results');
  if (!projectsGrid || !noResults) return;

  const itemsPerPage = parseInt(projectsGrid.dataset.itemsPerPage || 8);
  const currentPage = parseInt(projectsGrid.dataset.currentPage || 1);

  const filteredProjects = filterAndSortProjects();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Update visibility
  document.querySelectorAll('.project-card').forEach(p => p.style.display = 'none');
  filteredProjects.slice(startIndex, endIndex).forEach((project, index) => {
    project.style.display = 'flex';
    project.style.order = index;
  });

  updatePagination(filteredProjects.length);
  noResults.style.display = filteredProjects.length === 0 ? 'block' : 'none';
}

function showProjectModal(projectCard) {
  const modal = document.getElementById('project-modal');
  const modalContent = modal?.querySelector('.modal-content');
  if (!modal || !modalContent) return;

  const data = projectCard.dataset;

  // Update modal content
  modalContent.querySelector('.modal-title').textContent = data.name;
  modalContent.querySelector('.modal-image').src = data.thumbnail;
  modalContent.querySelector('.modal-description').textContent = data.description;
  modalContent.querySelector('.project-type').textContent = data.projectType;
  modalContent.querySelector('.project-team').textContent = data.team;
  modalContent.querySelector('.project-role').textContent = data.myRole;
  modalContent.querySelector('.project-duration').textContent = data.duration;

  // Update tags
  const tagsContainer = modalContent.querySelector('.modal-tags');
  if (tagsContainer && data.tags) {
    const tags = data.tags.split(',');
    tagsContainer.innerHTML = tags
      .map(tag => `<span class="tag-chip">${tag.trim()}</span>`)
      .join('');
  }

  // Update links
  const links = {
    demo: { element: modalContent.querySelector('.demo-link'), url: data.linkDemo },
    repo: { element: modalContent.querySelector('.repo-link'), url: data.linkRepo },
    live: { element: modalContent.querySelector('.live-link'), url: data.deployment }
  };

  Object.values(links).forEach(({ element, url }) => {
    if (element) {
      if (url && url !== '') {
        element.href = url;
        element.style.display = 'inline-block';
      } else {
        element.style.display = 'none';
      }
    }
  });

  modal.style.display = 'block';
}

function showCertificationModal(certCard) {
  const modal = document.getElementById('certification-modal');
  const modalContent = modal?.querySelector('.modal-content');
  if (!modal || !modalContent) return;

  const data = certCard.dataset;

  modalContent.querySelector('.modal-title').textContent = data.name;
  modalContent.querySelector('.cert-result').textContent = data.result;
  modalContent.querySelector('.cert-description').textContent = data.description;
  modalContent.querySelector('.cert-date').textContent = new Date(data.date)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const modalImage = modalContent.querySelector('.modal-image');
  if (modalImage) {
    if (data.image && data.image !== '') {
      modalImage.src = data.image;
      modalImage.style.display = 'block';
    } else {
      modalImage.style.display = 'none';
      showSnackbar('No certification image available');
    }
  }

  modal.style.display = 'block';
}

function showEducationModal(eduCard) {
  const modal = document.getElementById('education-modal');
  const modalContent = modal?.querySelector('.modal-content');
  if (!modal || !modalContent) return;

  const data = eduCard.dataset;

  modalContent.querySelector('.modal-title').textContent = data.name;
  modalContent.querySelector('.edu-duration').textContent = 
    `${new Date(data.from).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${data.to}`;
  modalContent.querySelector('.edu-result').textContent = data.result;
  modalContent.querySelector('.edu-description').textContent = data.description;

  const modalImage = modalContent.querySelector('.modal-image');
  if (modalImage) {
    if (data.image && data.image !== 'null' && data.image !== '') {
      modalImage.src = data.image;
      modalImage.style.display = 'block';
    } else {
      modalImage.style.display = 'none';
      showSnackbar('No education image available');
    }
  }

  modal.style.display = 'block';
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.dataset.currentPage = '1';
    updateProjectsDisplay();
  }

  // Filter event listeners for projects
  document.querySelectorAll('.tag-checkbox input, #game-only, #sort-date')
    .forEach(el => el.addEventListener('change', updateProjectsDisplay));

  // Modal event listeners
  const modals = document.querySelectorAll('.modal');
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.modal').style.display = 'none');
  });

  // Close modals when clicking outside
  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Card click handlers
  document.addEventListener('click', e => {
    const projectCard = e.target.closest('.project-card');
    const certCard = e.target.closest('.certification-card');
    const eduCard = e.target.closest('.education-card');
    
    if (projectCard) showProjectModal(projectCard);
    if (certCard) showCertificationModal(certCard);
    if (eduCard) showEducationModal(eduCard);
  });
});