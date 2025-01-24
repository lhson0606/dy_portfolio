function updatePagination(filteredCount) {
  const projectsGrid = document.querySelector('.projects-grid');
  const itemsPerPage = parseInt(projectsGrid.dataset.itemsPerPage);
  const pageCount = Math.ceil(filteredCount / itemsPerPage);
  const currentPage = parseInt(projectsGrid.dataset.currentPage || 1);

  const prevBtn = document.querySelector('.prev-page');
  const nextBtn = document.querySelector('.next-page');
  const pageNumbers = document.querySelector('.page-numbers');

  // Update pagination controls
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === pageCount;

  // Update page numbers
  pageNumbers.innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    const pageNum = document.createElement('div');
    pageNum.className = `page-number ${i === currentPage ? 'active' : ''}`;
    pageNum.textContent = i;
    pageNum.onclick = () => {
      projectsGrid.dataset.currentPage = i;
      updateProjectsDisplay();
    };
    pageNumbers.appendChild(pageNum);
  }

  // Update buttons
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      projectsGrid.dataset.currentPage = currentPage - 1;
      updateProjectsDisplay();
    }
  };

  nextBtn.onclick = () => {
    if (currentPage < pageCount) {
      projectsGrid.dataset.currentPage = currentPage + 1;
      updateProjectsDisplay();
    }
  };
}

function filterAndSortProjects() {
  const projects = Array.from(document.querySelectorAll('.project-card'));
  const selectedTags = Array.from(document.querySelectorAll('.tag-checkbox input:checked'))
    .map(cb => cb.value);
  const showGameOnly = document.getElementById('game-only').checked;
  const sortOrder = document.getElementById('sort-date').value;

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const tags = project.dataset.tags.split(',');
    const isGame = project.dataset.isGame === 'true';
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => tags.includes(tag));
    const matchesGameFilter = !showGameOnly || isGame;
    
    return matchesTags && matchesGameFilter;
  });

  // Sort filtered projects
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
  const itemsPerPage = parseInt(projectsGrid.dataset.itemsPerPage);
  const currentPage = parseInt(projectsGrid.dataset.currentPage || 1);

  const filteredProjects = filterAndSortProjects();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Hide all projects first
  document.querySelectorAll('.project-card').forEach(p => p.style.display = 'none');

  // Show filtered and paginated projects
  filteredProjects.slice(startIndex, endIndex).forEach((project, index) => {
    project.style.display = 'flex';
    project.style.order = index;
  });

  // Update pagination and no results message
  updatePagination(filteredProjects.length);
  noResults.style.display = filteredProjects.length === 0 ? 'block' : 'none';
}

function showProjectModal(projectData) {
  const modal = document.getElementById('project-modal');
  const modalContent = modal.querySelector('.modal-content');

  // Set modal content
  modalContent.querySelector('.modal-title').textContent = projectData.name;
  modalContent.querySelector('.modal-image').src = projectData.thumbnail;
  modalContent.querySelector('.modal-description').textContent = projectData.description;
  modalContent.querySelector('.project-type').textContent = projectData.projectType;
  modalContent.querySelector('.project-team').textContent = projectData.team;
  modalContent.querySelector('.project-role').textContent = projectData.myRole;
  modalContent.querySelector('.project-duration').textContent = projectData.duration;

  // Update links
  const demoLink = modalContent.querySelector('.demo-link');
  const repoLink = modalContent.querySelector('.repo-link');
  const liveLink = modalContent.querySelector('.live-link');

  if (demoLink) demoLink.href = projectData.linkDemo || '#';
  if (repoLink) repoLink.href = projectData.linkRepo || '#';
  if (liveLink) liveLink.href = projectData.deployment || '#';

  modal.style.display = 'block';
}

function showProjectModal(projectCard) {
  const modal = document.getElementById('project-modal');
  const modalContent = modal.querySelector('.modal-content');
  const data = projectCard.dataset;

  // Set modal content
  modalContent.querySelector('.modal-title').textContent = data.name;
  modalContent.querySelector('.modal-image').src = data.thumbnail;
  modalContent.querySelector('.modal-description').textContent = data.description;
  modalContent.querySelector('.project-type').textContent = data.projectType;
  modalContent.querySelector('.project-team').textContent = data.team;
  modalContent.querySelector('.project-role').textContent = data.myRole;
  modalContent.querySelector('.project-duration').textContent = data.duration;

  // Add tags
  const tagsContainer = modalContent.querySelector('.modal-tags');
  const tags = data.tags.split(',');
  tagsContainer.innerHTML = tags
    .map(tag => `<span class="tag-chip">${tag}</span>`)
    .join('');

  // Update links visibility and hrefs
  const demoLink = modalContent.querySelector('.demo-link');
  const repoLink = modalContent.querySelector('.repo-link');
  const liveLink = modalContent.querySelector('.live-link');

  if (demoLink && data.linkDemo && data.linkDemo !== '') {
    demoLink.href = data.linkDemo;
    demoLink.style.display = 'inline-block';
  } else if (demoLink) {
    demoLink.style.display = 'none';
  }

  if (repoLink && data.linkRepo && data.linkRepo !== '') {
    repoLink.href = data.linkRepo;
    repoLink.style.display = 'inline-block';
  } else if (repoLink) {
    repoLink.style.display = 'none';
  }

  if (liveLink && data.deployment && data.deployment !== '') {
    liveLink.href = data.deployment;
    liveLink.style.display = 'inline-block';
  } else if (liveLink) {
    liveLink.style.display = 'none';
  }

  // Show modal
  modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  // Initial setup
  const projectsGrid = document.querySelector('.projects-grid');
  projectsGrid.dataset.currentPage = 1;

  // Add event listeners
  document.querySelectorAll('.tag-checkbox input, #game-only, #sort-date')
    .forEach(el => el.addEventListener('change', updateProjectsDisplay));

  document.querySelector('.projects-grid').addEventListener('click', e => {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) showProjectModal(projectCard);
  });

  document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
  });

  // Close modal when clicking outside
  window.addEventListener('click', e => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) modal.style.display = 'none';
  });

  // Initial display
  updateProjectsDisplay();
});