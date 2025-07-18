document.addEventListener('DOMContentLoaded', () => {
    const shortenBtn = document.getElementById('shortenBtn');
    const originalLinkInput = document.getElementById('originalLink');
    const resultDiv = document.getElementById('result');

    shortenBtn.addEventListener('click', async () => {
        const originalUrl = originalLinkInput.value;

        if (!originalUrl) {
            resultDiv.textContent = 'Por favor, insira uma URL.';
            return;
        }

        try {
            const response = await fetch('/encurtar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl }),
            });

            const data = await response.json();

            if (response.ok) {
                resultDiv.innerHTML = `Link encurtado: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
            } else {
                resultDiv.textContent = `Erro: ${data.error}`;
            }

        } catch (error) {
            console.error('Erro ao encurtar o link:', error);
            resultDiv.textContent = 'Ocorreu um erro. Tente novamente.';
        }
    });
});
