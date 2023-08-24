document.getElementById('fetchMarketInfo').addEventListener('click', async () => {
    const marketInfoElement = document.getElementById('marketInfo');
    marketInfoElement.innerHTML = '<p>Loading market information...</p>';

    try {
        const response = await fetch('https://api.coinstats.app/public/v1/markets?coinId=bitcoin');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }
        
        const data = await response.json();

        if (data && data.markets && data.markets.length > 0) {
            const bitcoinMarkets = data.markets;

            const marketInfoHTML = generateMarketInfoHTML(bitcoinMarkets);
            marketInfoElement.innerHTML = marketInfoHTML;
        } else {
            marketInfoElement.innerHTML = '<p>No market information available for Bitcoin.</p>';
        }
    } catch (error) {
        marketInfoElement.innerHTML = '<p>Error fetching Bitcoin market information. Please try again later.</p>';
        console.error('Error fetching Bitcoin market information:', error);
    }
});

function generateMarketInfoHTML(markets) {
    return `
        <h2>Bitcoin Market Information</h2>
        <ul>
            ${markets.map(market => `<li><strong>${market.exchange}</strong>: $${market.price.toFixed(2)}</li>`).join('')}
        </ul>
    `;
}