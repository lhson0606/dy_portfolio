---
layout: nav-layout
title: Work Experience
permalink: /work_experience/
---

<div class="work-container">
  <h1 class="section-header">{{ page.title }}</h1>

  <div class="work-list">
    {% assign sorted_work = site.data.working | sort: "from" | reverse %}
    {% for work in sorted_work %}
      {% include work-card.html work=work %}
    {% endfor %}
  </div>
</div>

{% include work-modal.html %}
{% include snackbar.html %}