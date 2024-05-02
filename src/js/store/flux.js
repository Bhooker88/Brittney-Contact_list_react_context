const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: []
		},
		actions: {
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/bhooker/contacts")
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw new Error('Failed to fetch');
				})
				.then((data) => {
					// Assuming the API returns an object with a 'contacts' array
					if (data && Array.isArray(data.contacts)) {
						setStore({ contacts: data.contacts });
					} else {
						console.error('Expected an array of contacts, received:', data);
						setStore({ contacts: [] }); // Set to an empty array if data structure is incorrect
					}
				})
				.catch((error) => {
					console.error('Error fetching contacts:', error);
					setStore({ contacts: [] }); // Ensure contacts is always an array
				});
			},
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
			
			},
			changeColor: (index, color) => {
				
				const store = getStore();

				
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
