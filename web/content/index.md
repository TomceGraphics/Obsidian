---
title: "Personal Knowledge Vaults"
layout: page
---

<div class="portal-container">
  <div class="portal-header">
    <h1 class="portal-title">Knowledge Nexus</h1>
    <p class="portal-subtitle">Welcome to your secure, self-hosted read-only Obsidian space. Choose a vault below to start exploring your thoughts, university courses, and personal databases.</p>
  </div>

  <div class="portal-grid">
    <a href="Perosnal/Welcome" class="portal-card personal-card">
      <div class="portal-card-icon">🔐</div>
      <div class="portal-card-body">
        <h2 class="portal-card-title">Personal Vault</h2>
        <p class="portal-card-desc">Private logs, career development, life goals, and daily journals. Kept secure and fully isolated.</p>
        <span class="portal-card-btn">Enter Vault &rarr;</span>
      </div>
    </a>

    <a href="Univercity/UNI hub" class="portal-card university-card">
      <div class="portal-card-icon">🎓</div>
      <div class="portal-card-body">
        <h2 class="portal-card-title">University Vault</h2>
        <p class="portal-card-desc">Course lecture notes, study guides, database structures, and interactive learning boards.</p>
        <span class="portal-card-btn">Enter Vault &rarr;</span>
      </div>
    </a>
  </div>
</div>

<style>
.portal-container {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  font-family: inherit;
}
.portal-header {
  text-align: center;
  margin-bottom: 4rem;
}
.portal-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--secondary) 0%, var(--tertiary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}
.portal-subtitle {
  font-size: 1.1rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
.portal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
@media (max-width: 768px) {
  .portal-grid {
    grid-template-columns: 1fr;
  }
}
.portal-card {
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none !important;
  color: var(--dark) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.portal-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  transition: all 0.3s ease;
}
.personal-card::before {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}
.university-card::before {
  background: linear-gradient(90deg, #10b981, #34d399);
}
.portal-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
.portal-card.personal-card:hover {
  border-color: #3b82f6 !important;
}
.portal-card.university-card:hover {
  border-color: #10b981 !important;
}
.portal-card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}
.portal-card:hover .portal-card-icon {
  transform: scale(1.1) rotate(5deg);
}
.portal-card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}
.portal-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  color: var(--dark);
}
.portal-card-desc {
  font-size: 0.95rem;
  color: var(--gray);
  line-height: 1.5;
  margin: 0 0 1.75rem 0;
  flex-grow: 1;
}
.portal-card-btn {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--secondary);
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}
.portal-card:hover .portal-card-btn {
  transform: translateX(6px);
}
</style>
