---
layout: nav-layout
---

<div class="wrapper">
  <div class="avatar-container" style="text-align: center; margin: 2em 0;">
    <img src="{{ '/assets/img/avatar.jpg' | relative_url }}" 
         alt="Profile Avatar" 
         style="border-radius: 50%; width: 200px; height: 200px; object-fit: cover;">
  </div>

  <div class="cv-button-container">
    <a href="https://drive.google.com/uc?export=view&id={{ site.my_cv }}" 
      class="btn-outline" 
      target="_blank" 
      rel="noopener">
      View my CV
    </a>
  </div>
  
  <div class="intro-text" style="text-align: center; max-width: 600px; margin: 2em auto;">
    {{ site.intro }}
  </div>

  <h2 class="section-header">Programming Languages</h2>
  <div class="tech-grid">
    {% for lang in site.data.programming_languages %}
      <div class="tech-chip" 
           title="{{ lang.description }}"
           style="background: {{ lang.background }};">
        <i class="{{ lang.icon }}" style="color: {{ lang.foreground }}"></i>
        <span style="color: {{ lang.foreground }}">{{ lang.name }}</span>
      </div>
    {% endfor %}
  </div>

  <h2 class="section-header">Game Engines</h2>
  <div class="tech-grid">
    {% for engine in site.data.game_engines %}
      <div class="tech-chip" 
           title="Experience: {{ engine.experience }}"
           style="background: {{ engine.background }};">
        <i class="{{ engine.icon }}" style="color: {{ engine.foreground }}"></i>
        <span style="color: {{ engine.foreground }}">{{ engine.name }}</span>
      </div>
    {% endfor %}
  </div>

  <h2 class="section-header">Rendering APIs</h2>
  <div class="tech-grid">
    {% for api in site.data.rendering_APIs %}
      <div class="tech-chip" 
           title="Experience: {{ api.experience }}"
           style="background: {{ api.background }};">
        <i class="{{ api.icon }}" style="color: {{ api.foreground }}"></i>
        <span style="color: {{ api.foreground }}">{{ api.name }}</span>
      </div>
    {% endfor %}
  </div>

  <h2 class="section-header">Backend Technologies</h2>
  <div class="tech-grid">
    {% for tech in site.data.backend %}
      <div class="tech-chip" 
           title="Experience: {{ tech.experience }}"
           style="background: {{ tech.background }};">
        <i class="{{ tech.icon }}" style="color: {{ tech.foreground }}"></i>
        <span style="color: {{ tech.foreground }}">{{ tech.name }}</span>
      </div>
    {% endfor %}
  </div>

  <h2 class="section-header">Tools</h2>
  <div class="tech-grid">
    {% for tool in site.data.tools %}
      <div class="tech-chip" 
           title="Experience: {{ tool.experience }}"
           style="background: {{ tool.background }};">
        <i class="{{ tool.icon }}" style="color: {{ tool.foreground }}"></i>
        <span style="color: {{ tool.foreground }}">{{ tool.name }}</span>
      </div>
    {% endfor %}
  </div>
</div>