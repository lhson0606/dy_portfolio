---
layout: nav-layout
---

<div class="wrapper">
  <div class="avatar-container" style="text-align: center; margin: 2em 0;">
    <img src="{{ '/assets/img/avatar.jpg' | relative_url }}" 
         alt="Profile Avatar" 
         style="border-radius: 50%; width: 200px; height: 200px; object-fit: cover;">
  </div>
  
  <div class="intro-text" style="text-align: center; max-width: 600px; margin: 2em auto;">
    {{ site.data.strings.intro }}
  </div>
  {{ site.intro }}
</div>