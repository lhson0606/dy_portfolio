---
layout: nav-layout
title: Education
permalink: /education/
---

<div class="education-container">
  <h1 class="section-header">{{ page.title }}</h1>

  <div class="education-list">
    {% assign sorted_education = site.data.education | sort: "from" | reverse %}
    {% for edu in sorted_education %}
      {% include education-card.html edu=edu %}
    {% endfor %}
  </div>
</div>

{% include education-modal.html %}
{% include snackbar.html %}