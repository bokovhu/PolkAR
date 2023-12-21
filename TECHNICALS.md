# PolkAR - Technical Rundown

This document contains the _executed_, _troubled_ and _planned_ technical details for the _PolkAR - Cubo entry_ for _Dorahacks Polkadot Winter Championship 2023_.

The technical features planned for this Hackathon by the team can be summarized in the following bullet points:

* **Blockchain Visualization**: Create an application for visualizing data gathered from the blockchain. We planned for visualizing _statistics_, as well as _on-chain data_.
* **Augmented Reality**: Create an AR experience, in which the different types of visualizations can be placed on the _6 sides of Cubo_, our piece of AR-furniture.
* **AI-Supported Setup**: Make the user experience better by utilizing _AI-models_, and _AI-assistants_ for setting up the user's dashboard.

# Executed

Our team was able to execute the following technical details by the submission deadline:

* Create a _monorepo architecture_ to make the final product _standardized_.
* Create a _React+Bootstrap+THREE.js_ application
* Store the user's dashboard's widgets
* Allow the user to add widgets to the dashboard
* Make the dashboard widgets configurable
* Build configuration form of the widgets _dynamically_ from the _parameter metadata_ of said visualization types
* Create a proof-of-concept AR experience for testing _stability_ of the open-source `AR.js` library, and its tracking methods
* Create a 3D visualization of the Polkadot blockchain
* Show the _current available balance of a wallet_ as a type of visualization
* Show the _last block number_ (in real-time) as a type of visualization
* Create a handheld _AR-controller prototype_ via _3D printing_, and _inexpensive paper printing, and some glue_
* Create an _AR furniture prototype_ from _wood_, and using _laser etching_ to apply the AR markers on the sides

# Troubled

During the Hackathon, we have faced many challenges. This section details these challenges. Most of them remained unsolved by the submission deadline, but we will also list the potential ways of implementing these features and fixes.

* **AR.js custom render code integration** - We have successfully created a proof-of-concept AR.js app, that uses the _A-Frame library_ to display different 3D models on the different sides of our cube. Where we have failed however is creating the immersive AR experience using the tools at hand. Problems include _poor documentation_ of the AR.js library, and _poor architecture_ of the AR.js library - it was simply not designed to work well with modern module bundlers, and gettings things to run was a pain-in-the-ass. We have eventually decided to stop working on the AR experience, because it was much more time consuming, then useful.
* **Stabilized AR scene** - We have decided, that instead of putting _6 different scenes on the 6 sides of the cube_, we would implement the AR experience based on _only one detected marker_. This approach would give us a much better user experience, since it basically eliminates the _flickering_, and _rendering issues_ that arise from marker detection faults. We would instead always draw the _entire scene_, including a _fully solid, opaque cube_ in place of the original cube on the camera image. This could also serve as a _sizing_, and _perspective calibration_ measure to better align the AR characteristics with the characteristics of the phone's camera (or AR/VR googles' camera).
* **More types of blockchain data visualization** - We have simply not had the resources and knowledge necessary to dive deep into more novel visualization types. We have planned to create new visualizations, based around the _validator and nominator data_. We have also tried to focus on bringing solutions alive, that would be pleasing for _beginners of the blockchain ecosystem_. In the end, our application is lacking in content.

# Planned

The following bullet points outline _planned features_, that the team has not had time to work on in implementation terms.

* **Semantic Search for the Visualization Configuration** - Our plan was to create _hundreds of visualization types_, each of them having a _few parameters only_, as opposed to creating _a few visualization types_ with _many parameters_. The thought process was that this would make the app more _beginner friendly_. We have identified early on, that this size of list in terms of available options would necessiate some kind of filtering, so that the list of available options can be narrowed down easily. Conventional search algorithms need the user to know _exactly the words_ they are looking for, that is why we wanted to implement **semantic search** over the list of available options. We would have indexed `{{name}} - {{description}}` texts for each available option using _OpenAI's embedding API_, then would have created an embedding for the _search term_, and would have executed a cosine-similarity search between these vectors to rank the items of the available visualization types list.
* **AI-based assistant for Visualization Configuration** - Building on top of OpenAI's _GPT / ChatGPT API_, and the _semantic search feature_, we would have been able to deliver a _chat agent_ for creating dashboard widgets (or widgets placed on the side of the AR cube) using _natural text instructions_, or _chat sessions_. The assistant could choose the _best fitting visualization type_ from the semantic search results, and also perform the _parametrization_ of these widgets, based on the original instructions, and the _interface_ of the visualization.
* **Smart Contract-based authorization** - We have investigated the option of _monetizing the application_. Since historical data requires us to develop _backend services_ (APIs), through which historical data can be queried, this places the burden of _running said backend infrastructure_ on us, the app developers. One way to monetize the app is thus to make widgets, that depend on this kind of data _paid_. A Smart Contract can be used to _accept API payments_, and the backend can also check, based on the _signed JWT of a user_ (signed using their wallet's private key) if the caller user is part of the paid users in the Smart Contract. Another monetization strategy is to place _advertisements_ inside the application, and sell an _ad-free version_ of the app - this could also be backend by a simple Smart Contract, so that no centralized server infrastructure is necessary to make the authorization checks.
