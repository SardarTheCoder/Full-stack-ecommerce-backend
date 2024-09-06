const Category = require("../models/category.model.js");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  try {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    // if not, then create
    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        level: 1,
      });
      // save category
      await topLevel.save();
    }

    // Second Level Category
    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    // if not second level, then create
    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
        level: 2,
      });
      // save
      await secondLevel.save();
    }

    // Third Level Category
    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
    });

    // if not, then create
    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
        level: 3,
      });
      // save
      await thirdLevel.save();
    }

    const product = new Product({
      title: reqData.title,
      color: reqData.color,
      description: reqData.description,
      discountedPrice: reqData.discountedPrice,
      discountPercent: reqData.discountPercent,
      imageUrl: reqData.imageUrl,
      brand: reqData.brand,
      price: reqData.price,
      size: reqData.size,
      quantity: reqData.quantity,
      category: thirdLevel,
    });

    // save Product
    await product.save();
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
//delete Product
async function deleteProduct(productId) {
  const product = await findProductById(productId);
  await Product.findByIdAndDelete(productId);
  return "Product Deleted Seccessfully";
}

//update Product
async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();
  //if Not Found
  if (!product) {
    throw new Error("Product Not Found With Id" + id);
  }
  return product;
}
//Get All Products
async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;
  // pageSize from FrontEnd if not than default page size is 10
  pageSize = pageSize || 10;
  //find product
  let query = Product.find().populate("category");
  //if category find than
  if (category) {
    //if category exist
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  //if color exist than
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    //update query
    query = query.where("color").regex(colorRegex);
  }
  //if size exist than
  if (size) {
    const sizesArray = size.split(","); // Convert comma-separated string to array
    query = query.where("size.name").in(sizesArray);
}
  //if minPrice Exist than
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }
  //if minDiscount Exist than
  if (minDiscount) {
    query = query.where("discountPersent").gte(minDiscount);
  }
  //if Stock Exist than
  if (stock) {
    //in Stock
    if (stock == "in_stock") {
      query = query.where("quantity").gte(0);
    }
    //out Stock
    else if (stock == "out_of_stock") {
      query = query.where("quantity").gte(1);
    }
  }
  //sort Product
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    console.log("Sort direction:", sortDirection);
    query = query.sort({ price: sortDirection });
    console.log("Sorted query:", query);
  }
  
  // console.log("MongoDB Query:", query);

  //Total Products
  const totalProducts = await Product.countDocuments(query);

  //pageination apply
  const skip = (pageNumber - 1) * pageSize;
  // Ensure skip is not negative
  query = query.skip(Math.max(skip, 0)).limit(pageSize);
  // console.log('Skip:', skip);
  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, curentPage: pageNumber, totalPages };
}
//For Admin
//create MultiPle Product
const createMultipleProduct = async (products) => {
  try {
    const createdProducts = await Product.create(products);
    return createdProducts; // Return the array of created products
  } catch (error) {
    throw error;
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