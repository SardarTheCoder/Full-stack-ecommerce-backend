const productService = require("../services/product.service.js");

const createProduct = async (req,res) => {
    try {
        // console.log('Request Body:', req.body);
        const product = await productService.createProduct(req.body);
        // console.log('Created Product:', product);
        return res.status(201).send(product);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ error: error.message },);
    }
}

const deleteProduct = async (req,res) => {
    const productId = req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req,res) => {
    const productId = req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const createMultipleProduct = async (req, res) => {
    try {
      let products = Array.isArray(req.body) ? req.body : [req.body];
      const createdProducts = await productService.createMultipleProduct(products);
      return res.status(201).send({ message: "Products Created Successfully", status: true });
    } catch (error) {
    //   console.log("Error:", error);
      return res.status(500).send({ error: error.message });
    }
  };
  
  
  
  
  
  
  

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProduct
};