const getAllProductSatic = (req, res) => {
	res.status(200).json({ msg: 'products testing route' });
};

const getAllProduct = (req, res) => {
	res.status(200).json({ msg: 'products route' });
};

module.exports = {
	getAllProduct,
	getAllProductSatic,
};
