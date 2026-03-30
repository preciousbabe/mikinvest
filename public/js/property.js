async function loadProperties() {
    try {
        const res = await fetch('/content/properties/index.json');
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

        properties.forEach((property, index) => {
            const isHidden = index >= 4 ? 'hidden' : '';

            const titleHTML    = property.title    ? `<h4>${property.title}</h4>` : '';
            const locationHTML = property.location ? `<p>${property.location}</p>` : '';
            const priceHTML    = property.price    ? `<span>${property.price}</span>` : '';
            const imageSrc     = property.image    ? property.image : '';

            const card = `
                <div class="menu__card ${isHidden}">
                    ${imageSrc ? `<img src="${imageSrc}" alt="${property.title || 'Property'}" />` : ''}
                    
                    <div class="menu__card__content">
                        ${titleHTML}
                        ${locationHTML}
                        ${priceHTML}
                    </div>
                </div>
            `;

            grid.innerHTML += card;
        });

    } catch (err) {
        console.error('Error loading properties:', err);
        
        document.getElementById('propertyGrid').innerHTML = `
            <p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                No properties yet.<br>
                Add some from the admin panel.
            </p>`;
    }
}