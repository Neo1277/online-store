// ======================================================
// PRODUCT API
// ======================================================
//
// Responsibility:
// Communicate with the Laravel backend.
//
// This class does NOT:
// - manipulate the DOM
// - render products
// - manage pagination UI
// - handle forms
//
// It only knows how to communicate with the API.
// ======================================================

export default class ProductApi {

    constructor(httpClient) {

        // Dependency Injection:
        //
        // We don't directly depend on fetch().
        // Instead, an HTTP client is provided from outside.
        //
        // This follows the Dependency Inversion Principle.
        this.httpClient = httpClient;
    }


    // ==================================================
    // GET PRODUCTS
    // ==================================================

    async getProducts(page = 1, search = '') {

        const params = new URLSearchParams();


        params.set(
            'page',
            page
        );


        // Only send search when we actually
        // have a search term.
        if (search) {

            params.set(
                'search',
                search
            );
        }


        return this.httpClient.get(
            `/api/products?${params.toString()}`
        );
    }


    // ==================================================
    // CREATE PRODUCT
    // ==================================================

    async createProduct(product) {

        return this.httpClient.post(
            '/api/products',
            product
        );
    }


    // ==================================================
    // UPDATE PRODUCT
    // ==================================================

    async updateProduct(id, product) {

        return this.httpClient.put(
            `/api/products/${id}`,
            product
        );
    }


    // ==================================================
    // DELETE PRODUCT
    // ==================================================

    async deleteProduct(id) {

        return this.httpClient.delete(
            `/api/products/${id}`
        );
    }
}
