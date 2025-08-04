fetch('http://localhost:5000/api/foods')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('food-list');
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'food-card';
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <strong>$${item.price}</strong>
            `;
            container.appendChild(card);
        });
    });
