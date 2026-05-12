async function loadProperties() {
    try {
        const res = await fetch('/properties.json');
        const properties = await res.json();

        const grid = document.getElementById('propertyGrid');
        grid.innerHTML = '';

        if (!properties || properties.length === 0) {
            grid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                    No properties yet.<br>
                    Add some from the admin panel.
                </p>`;
            return;
        }

        let visibleIndex = 0;

        properties.forEach((property) => {
            // ✅ Skip if no image (since image is now required)
            if (!property.image || property.image.trim() === '') {
                console.warn('Property skipped: No image provided', property);
                return;
            }

            // ✅ Skip completely empty properties (optional safety)
            if (
                !property.title?.trim() &&
                !property.price?.trim() &&
                !property.location?.trim() &&
                !property.body?.trim()
            ) {
                // Still allow if there's an image (as per your request)
                // Only skip if literally nothing else + no image (already handled above)
            }

            // Hidden logic for "View More"
            const extraClass = visibleIndex >= 4 ? ' extra hidden' : '';
            visibleIndex++;

            // Safe trimmed values
            const titleHTML = property.title?.trim()
                ? `<h4>${property.title}</h4>`
                : '';

            const locationHTML = property.location?.trim()
                ? `<p>${property.location}</p>`
                : '';

            const priceHTML = property.price?.trim()
                ? `<span>${property.price}</span>`
                : '';

            const bodyHTML = property.body?.trim()
                ? `<p>${property.body}</p>`
                : '';

            // Fix image path
            let imageSrc = property.image;
            if (!imageSrc.startsWith('/')) {
                imageSrc = '/' + imageSrc;
            }

            const card = `
                <div class="menu__card${extraClass}">
                    <img src="${imageSrc}" alt="${property.title?.trim() || 'Property'}" />
                    
                    <div class="menu__card__content">
                        ${titleHTML}
                        ${locationHTML}
                        ${priceHTML}
                        ${bodyHTML}
                    </div>
                </div>
            `;

            grid.innerHTML += card;
        });

        // Extra safety
        if (grid.innerHTML.trim() === '') {
            grid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                    No valid properties to display.
                </p>`;
        }

        // ✅ Auto-hide toggle button if ≤ 4 properties
        const toggleBtn = document.getElementById('toggleViewBtn');
        if (toggleBtn) {
            const hasExtra = grid.querySelector('.menu__card.extra');
            toggleBtn.style.display = hasExtra ? 'inline-block' : 'none';
        }

    } catch (err) {
        console.error('Error loading properties:', err);
        document.getElementById('propertyGrid').innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                Failed to load properties.<br>
                Check console for errors.
            </p>`;
    }
}