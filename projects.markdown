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
      {% include project-card.html 
         project=project 
         index=forloop.index %}
    {% endfor %}
  </div>

  <div class="no-results" style="display: none;">
    <p>No projects match your filters</p>
  </div>

  {% include pagination.html %}

</div>

{% include project-modal.html%}
