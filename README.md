🚀 Crypto Dashboard
----------------------------------------------------
A real-time cryptocurrency dashboard displaying current prices, market capitalization, and 24-hour price changes for popular cryptocurrencies like Bitcoin, Ethereum, and Cardano.

📌 Features
Real-time crypto price updates

Market capitalization and percentage changes

Beautiful UI with dark mode

Responsive design

Navigation to detailed crypto pages

🎨 Design Decisions
--------------------------------------
📌 1. State Management
Used Redux Toolkit for efficient state handling and caching of API responses.

📌 2. Data Fetching
Fetching data from CoinGecko API with fetchCrypto() action in Redux.

Utilized useEffect to trigger API calls.

📌 3. Performance Optimization
Used React.memo and lazy loading to optimize performance.

Implemented debounced API calls to prevent excessive requests.

📌 4. Styling
Tailwind CSS for clean and responsive design.

Live Link
-----------------------
https://crypto-dashboard-36ly.vercel.app/
