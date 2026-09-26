// ======================================================
// PRODUCT SERVICE
// ======================================================
//
// Responsibility:
// Manage product-related application logic.
//
// This class does NOT know about:
// - HTML
// - Bootstrap
// - DOM elements
//
// It communicates with ProductApi.
// ======================================================

export default class ProductService {

    constructor(productApi) {

        // Inject the API dependency.
        this.productApi = productApi;
    }


    // ==================================================
    // GET PRODUCTS
    // ==================================================

    async getProducts(page = 1, search = '') {

        return this.productApi.getProducts(
            page,
            search
        );
    }


    // ==================================================
    // CREATE PRODUCT
    // ==================================================

    async createProduct(product) {

        return this.productApi.createProduct(
            product
        );
    }


    // ==================================================
    // UPDATE PRODUCT
    // ==================================================

    async updateProduct(id, product) {

        return this.productApi.updateProduct(
            id,
            product
        );
    }


    // ==================================================
    // DELETE PRODUCT
    // ==================================================

    async deleteProduct(id) {

        return this.productApi.deleteProduct(
            id
        );
    }
}
