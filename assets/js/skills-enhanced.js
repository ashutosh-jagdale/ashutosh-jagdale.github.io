// Skills Section Enhancements - Search and Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('skillSearchInput');
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (!searchInput || !skillsGrid) return;

    // Skill data with experience levels and example projects
    const skillsData = {
        'Python': { years: '3+', category: 'Programming Languages', level: 'expert', projects: ['Data Pipeline', 'NLP Assistant'] },
        'Java': { years: '3+', category: 'Programming Languages', level: 'expert', projects: ['Enterprise API'] },
        'JavaScript': { years: '2+', category: 'Programming Languages', level: 'expert', projects: ['Client Dashboard'] },
        'TypeScript': { years: '2+', category: 'Programming Languages', level: 'expert', projects: ['Admin UI'] },
        'C++': { years: '1+', category: 'Programming Languages', level: 'expert' },
        'SQL': { years: '3+', category: 'Programming Languages', level: 'expert', projects: ['Reporting DB'] },
        'HTML & CSS': { years: '2+', category: 'Programming Languages', level: 'expert' },
        'Kotlin': { years: '1+', category: 'Programming Languages', level: 'intermediate' },
        'Swift': { years: '0.5+', category: 'Programming Languages', level: 'beginner' },
        'Go': { years: '1+', category: 'Programming Languages', level: 'intermediate' },
        'React.js': { years: '2+', category: 'Frameworks & Web', level: 'expert', projects: ['SPA Analytics', 'Interactive Charts'] },
        'Angular': { years: '1.5+', category: 'Frameworks & Web', level: 'expert' },
        'Spring Boot': { years: '2+', category: 'Frameworks & Web', level: 'expert' },
        'Django': { years: '1.5+', category: 'Frameworks & Web', level: 'expert' },
        'AWS': { years: '2+', category: 'Cloud & DevOps', level: 'expert', projects: ['Platform Infra'] },
        'Docker': { years: '2+', category: 'Cloud & DevOps', level: 'expert' },
        'Kubernetes': { years: '1+', category: 'Cloud & DevOps', level: 'intermediate' },
        'MySQL': { years: '3+', category: 'Databases & Storage', level: 'expert' },
        'MongoDB': { years: '2+', category: 'Databases & Storage', level: 'expert' },
        'PostgreSQL': { years: '1.5+', category: 'Databases & Storage', level: 'expert' },
        'TensorFlow': { years: '1.5+', category: 'ML & AI', level: 'expert', projects: ['Image Classifier'] },
        'OpenAI API': { years: '1+', category: 'AI Tools & Platforms', level: 'expert', projects: ['Assistant Integrations'] }
    };

    // Initialize search functionality
    function initializeSearch() {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            filterSkills(searchTerm);
        });

        // Allow Escape key to clear search
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                filterSkills('');
            }
        });
    }

    // Filter skills based on search term
    function filterSkills(searchTerm) {
        const skillTags = document.querySelectorAll('.skill-tag');
        let matchCount = 0;

        skillTags.forEach(tag => {
            const skillName = tag.textContent.trim().split('\n')[0]; // Get first line (skill name)
            const isMatch = skillName.toLowerCase().includes(searchTerm);

            if (searchTerm === '') {
                tag.classList.remove('hidden', 'match-highlight');
            } else if (isMatch) {
                tag.classList.remove('hidden');
                tag.classList.add('match-highlight');
                matchCount++;
            } else {
                tag.classList.add('hidden');
            }
        });

        // Show/hide no results message
        updateNoResultsMessage(matchCount);
    }

    // Update no results message
    function updateNoResultsMessage(matchCount) {
        let noResultsMsg = document.getElementById('noSkillsResult');
        
        if (matchCount === 0 && searchInput.value.trim() !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'noSkillsResult';
                noResultsMsg.className = 'no-skills-found';
                skillsGrid.parentElement.insertBefore(noResultsMsg, skillsGrid.nextSibling);
            }
            noResultsMsg.textContent = `No skills found matching "${searchInput.value}". Try searching for different terms.`;
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    }

    // Add experience and proficiency data to skill tags
    function enhanceSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            const skillName = tag.textContent.trim();
            const skillData = skillsData[skillName];

            if (skillData) {
                // Add data attributes for experience
                tag.setAttribute('data-experience', skillData.years + ' exp');
                

                // Add proficiency level using canonical level in skillsData (Expert/Intermediate/Beginner)
                const level = (skillData.level || 'intermediate').toLowerCase();
                const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);
                tag.setAttribute('data-proficiency', levelLabel);

                // Insert visual proficiency bar inside tag
                const proficiencyMap = { expert: '100%', intermediate: '60%', beginner: '30%' };
                const barWidth = proficiencyMap[level] || '50%';
                const barWrap = document.createElement('div');
                barWrap.className = 'skill-proficiency-bar';
                const barInner = document.createElement('div');
                barInner.className = 'skill-proficiency-level';
                barInner.style.width = barWidth;
                barWrap.appendChild(barInner);
                tag.appendChild(barWrap);

                // Add click handler for more info (includes related projects if available)
                tag.style.cursor = 'pointer';
                tag.addEventListener('click', function(e) {
                    showSkillDetails(skillName, skillData);
                });

                // Add title tooltip
                tag.title = `${skillName}: ${skillData.years} of experience`;
            }
        });
    }

    // Show skill details on click
    function showSkillDetails(skillName, skillData) {
        // Create simple toast/tooltip
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 150, 255, 0.95);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: slideInDown 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0px 8px 24px rgba(0, 150, 255, 0.3);
        `;
        
        // Build projects list if available
        let projectsHTML = '';
        if (skillData.projects && skillData.projects.length) {
            projectsHTML = `<div style="margin-top:8px;"><strong>Projects:</strong><ul style="margin:6px 0 0 18px;padding:0;">` +
                skillData.projects.map(p => `<li style="margin-bottom:4px;">${p}</li>`).join('') +
                `</ul></div>`;
        }

        tooltip.innerHTML = `
            <strong>${skillName}</strong>
            <div style="font-size:13px;margin-top:6px;line-height:1.4;">
                <div>Experience: <strong>${skillData.years}</strong></div>
                <div>Category: <strong>${skillData.category}</strong></div>
                <div>Level: <strong>${skillData.level.charAt(0).toUpperCase() + skillData.level.slice(1)}</strong></div>
            </div>
            ${projectsHTML}
        `;

        document.body.appendChild(tooltip);

        // Remove tooltip after 4 seconds
        setTimeout(() => {
            tooltip.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => tooltip.remove(), 300);
        }, 4000);
    }

    // Initialize all enhancements
    initializeSearch();
    enhanceSkillTags();

    // Add fade out animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
});
