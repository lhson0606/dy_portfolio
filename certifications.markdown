---
layout: nav-layout
title: Certifications
permalink: /certifications/
---

<div class="certifications-container">
  <h1 class="section-header">{{ page.title }}</h1>

  <div class="certifications-list">
    {% assign sorted_certs = site.data.certifications | sort: "date" | reverse %}
    {% for cert in sorted_certs %}
      {% include certification-card.html cert=cert %}
    {% endfor %}
  </div>
</div>

{% include certification-modal.html %}
{% include snackbar.html %}