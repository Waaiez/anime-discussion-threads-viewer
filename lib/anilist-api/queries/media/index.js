import api from '../../api';
import query from './query';

const media = async (vars) => {
	const response = await api(query, vars);
	if (response === undefined)
		return {
			data: null,
			error: {
				response: { text: 'No response from the server.', status: 500 },
			},
		};
	if (response.error) return response;
	return response;
};

export default media;
