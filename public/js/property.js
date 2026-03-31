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

        let visibleIndex = 0; // ✅ ensures hidden logic works after skipping empty ones

        properties.forEach((property) => {

            // ✅ Skip completely empty properties
            if (
                !property.title?.trim() &&
                !property.price?.trim() &&
                !property.location?.trim() &&
                !property.image
            ) {
                return;
            }

            // ✅ Handle hidden logic AFTER filtering
            const isHidden = visibleIndex >= 4 ? 'hidden' : '';
            visibleIndex++;

            // ✅ Safe trimmed rendering
            const titleHTML = property.title?.trim()
                ? `<h4>${property.title}</h4>`
                : '';

            const locationHTML = property.location?.trim()
                ? `<p>${property.location}</p>`
                : '';

            const priceHTML = property.price?.trim()
                ? `<span>${property.price}</span>`
                : '';

            // ✅ Fix image path issues
            let imageSrc = '';
            if (property.image) {
                imageSrc = property.image.startsWith('/')
                    ? property.image
                    : '/' + property.image;
            }

            const card = `
                <div class="menu__card ${isHidden}">
                    ${imageSrc ? `<img src="${imageSrc}" alt="${property.title?.trim() || 'Property'}" />` : ''}
                    
                    <div class="menu__card__content">
                        ${titleHTML}
                        ${locationHTML}
                        ${priceHTML}
                    </div>
                </div>
            `;

            grid.innerHTML += card;
        });

        // ✅ Extra safety: if everything got filtered out
        if (grid.innerHTML.trim() === '') {
            grid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                    No valid properties to display.
                </p>`;
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