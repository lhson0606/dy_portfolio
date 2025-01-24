---
layout: nav-layout
title: Projects
permalink: /projects/
---

<div class="projects-container">
  <h1 class="section-header">{{ page.title }}</h1>
  
  <div class="filter-controls">
    <div class="filter-group">
      <label for="sort-date">Sort by:</label>
      <select id="sort-date">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    <div class="filter-group">
      <label>Tags:</label>
      <div class="tag-filters">
        {% assign all_tags = site.data.projects | map: "tags" | flatten | uniq | sort %}
        {% for tag in all_tags %}
          <label class="tag-checkbox">
            <input type="checkbox" value="{{ tag }}">
            <span>{{ tag }}</span>
          </label>
        {% endfor %}
      </div>
    </div>

    <div class="filter-group">
      <label class="game-filter">
        <input type="checkbox" id="game-only">
        <span>Show Game Projects Only</span>
      </label>
    </div>

  </div>

  <div class="projects-grid" data-items-per-page="{{site.number_of_projects_per_page}}">
    {% assign sorted_projects = site.data.projects | sort: "date" | reverse %}
    {% for project in sorted_projects %}
      <div class="project-card" 
           data-tags="{{ project.tags | join: ',' }}"
           data-is-game="{{ project.isGameProject }}"
           data-project-id="{{ forloop.index }}"
           data-date="{{ project.date }}">
        <div class="project-thumbnail">
          <img src="{{ project.thumbnail | relative_url }}" 
               alt="{{ project.name }}"
               loading="lazy">
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ project.name }}</h3>
          <div class="project-tags">
            {% for tag in project.tags %}
              <span class="tag-chip">{{ tag }}</span>
            {% endfor %}
          </div>
          <p class="project-description">{{ project.description | truncate: 150 }}</p>
          <div class="project-footer">
            <span class="project-date">{{ project.date | date: "%B %Y" }}</span>
            {% if project.linkDemo %}
              <a href="{{ project.linkDemo }}" class="demo-link" target="_blank">Demo</a>
            {% endif %}
          </div>
        </div>
      </div>
    {% endfor %}
  </div>

  <div class="no-results" style="display: none;">
    <p>No projects match your filters</p>
  </div>

{% include pagination.html %}

</div>

<div id="project-modal" class="modal">
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <div class="modal-header">
      <h2 class="modal-title"></h2>
      <div class="modal-tags"></div>
    </div>
    <div class="modal-body">
      <img class="modal-image" alt="">
      <div class="project-details">
        <p class="modal-description"></p>
        <div class="project-metadata">
          <p><strong>Type:</strong> <span class="project-type"></span></p>
          <p><strong>Team:</strong> <span class="project-team"></span></p>
          <p><strong>Role:</strong> <span class="project-role"></span></p>
          <p><strong>Duration:</strong> <span class="project-duration"></span></p>
        </div>
        <div class="project-links">
          {% if project.linkDemo %}
            <a class="demo-link" target="_blank">View Demo</a>
          {% endif %}
          {% if project.linkRepo %}
            <a class="repo-link" target="_blank">View Code</a>
          {% endif %}
          {% if project.deployment %}
            <a class="live-link" target="_blank">Live Site</a>
          {% endif %}
        </div>
      </div>
    </div>
  </div>
</div>
