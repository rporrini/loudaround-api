module.exports = (object, method, newMethod) => {
	const decorated = object[method];
	object[method] = newMethod(object, decorated);
};
