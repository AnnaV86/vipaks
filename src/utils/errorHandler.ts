// eslint-disable-next-line no-console
export const errorHandler = (error: unknown) => {
	console.error(error);
	throw Error;
};
