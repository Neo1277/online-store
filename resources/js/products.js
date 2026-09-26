// ======================================================
// PRODUCTS APPLICATION
// ======================================================
//
// Responsibility:
//
// Coordinate the different product components.
//
// This file should NOT contain:
// - API implementation
// - table rendering implementation
// - pagination implementation
// - form implementation
//
// It coordinates the components instead.
// ======================================================

import ProductApi
    from './products/ProductApi.js';

import ProductService
    from './products/ProductService.js';

import ProductRenderer
    from './products/ProductRenderer.js';

import ProductPagination
    from './products/ProductPagination.js';

import ProductForm
    from './products/ProductForm.js';

import DeleteConfirmationModal
    from './products/DeleteConfirmationModal.js';

// ======================================================
// HTTP CLIENT
// ======================================================
//
// This is our abstraction around fetch().
//
// ProductApi doesn't need to know how HTTP requests
// are actually implemented.
//
// This helps with Dependency Inversion.
// ======================================================

class HttpClient {

    constructor(csrfToken) {

        this.csrfToken =
            csrfToken;
    }


    // ==================================================
    // GET
    // ==================================================

    async get(url) {

        const response =
            await fetch(url, {

                method: 'GET',

                headers: {

                    'Accept':
                        'application/json'

                }

            });


        return this.handleResponse(
            response
        );
    }


    // ==================================================
    // POST
    // ==================================================

    async post(url, data) {

        const response =
            await fetch(url, {

                method: 'POST',

                headers: {

                    'Content-Type':
                        'application/json',

                    'Accept':
                        'application/json',

                    'X-CSRF-TOKEN':
                        this.csrfToken

                },

                body:
                    JSON.stringify(data)

            });


        return this.handleResponse(
            response
        );
    }


    // ==================================================
    // PUT
    // ==================================================

    async put(url, data) {

        const response =
            await fetch(url, {

                method: 'PUT',

                headers: {

                    'Content-Type':
                        'application/json',

                    'Accept':
                        'application/json',

                    'X-CSRF-TOKEN':
                        this.csrfToken

                },

                body:
                    JSON.stringify(data)

            });


        return this.handleResponse(
            response
        );
    }


    // ==================================================
    // DELETE
    // ==================================================

    async delete(url) {

        const response =
            await fetch(url, {

                method: 'DELETE',

                headers: {

                    'Accept':
                        'application/json',

                    'X-CSRF-TOKEN':
                        this.csrfToken

                }

            });


        return this.handleResponse(
            response
        );
    }


    // ==================================================
    // HANDLE RESPONSE
    // ==================================================

    async handleResponse(response) {

        const data =
            await response.json();


        if (!response.ok) {

            const error =
                new Error(
                    data.message ||
                    'Something went wrong.'
                );


            error.status =
                response.status;


            error.data =
                data;


            throw error;
        }


        return data;
    }
}


// ======================================================
// GET CSRF TOKEN
// ======================================================

const csrfToken =
    document
        .querySelector(
            'meta[name="csrf-token"]'
        )
        .getAttribute('content');


// ======================================================
// CREATE DEPENDENCIES
// ======================================================

const httpClient =
    new HttpClient(
        csrfToken
    );


const productApi =
    new ProductApi(
        httpClient
    );


const productService =
    new ProductService(
        productApi
    );


// ======================================================
// GET DOM ELEMENTS
// ======================================================

const form =
    document.getElementById(
        'productForm'
    );


const productId =
    document.getElementById(
        'productId'
    );


const nameInput =
    document.getElementById(
        'name'
    );


const priceInput =
    document.getElementById(
        'price'
    );


const stockInput =
    document.getElementById(
        'stock'
    );


const productsTable =
    document.getElementById(
        'productsTable'
    );


const cancelButton =
    document.getElementById(
        'cancelButton'
    );


const paginationElement =
    document.getElementById(
        'pagination'
    );


const productsCount =
    document.getElementById(
        'productsCount'
    );


const searchForm =
    document.getElementById(
        'searchForm'
    );


const searchInput =
    document.getElementById(
        'searchInput'
    );


const clearSearchButton =
    document.getElementById(
        'clearSearchButton'
    );

// ======================================================
// CREATE UI COMPONENTS
// ======================================================

const renderer =
    new ProductRenderer(
        productsTable
    );


const productForm =
    new ProductForm(
        form,
        productId,
        nameInput,
        priceInput,
        stockInput,
        cancelButton
    );


// ======================================================
// CREATE DELETE CONFIRMATION MODAL
// ======================================================

const deleteModalElement =
    document.getElementById(
        'deleteConfirmationModal'
    );


const deleteModal =
    new DeleteConfirmationModal(
        deleteModalElement
    );


// ======================================================
// APPLICATION STATE
// ======================================================

let products = [];

let currentPage = 1;

let currentSearch = '';


// ======================================================
// PAGINATION
// ======================================================
//
// We pass a callback to ProductPagination.
//
// ProductPagination doesn't need to know how products
// are loaded.
//
// It simply says:
//
// "The user selected page X."
//
// Our application decides what to do with that.
// ======================================================

const pagination =
    new ProductPagination(
        paginationElement,
        (page) => {

            loadProducts(
                page,
                currentSearch
            );

        }
    );


// ======================================================
// LOAD PRODUCTS
// ======================================================

async function loadProducts(
    page = 1,
    search = ''
) {

    try {

        const result =
            await productService.getProducts(
                page,
                search
            );


        // Save current products.
        products =
            result.data;


        currentPage =
            result.current_page;


        // Render the table.
        renderer.render(
            products
        );


        // Render pagination.
        pagination.render(
            result
        );


        // Update product counter.
        updateProductCount(
            result.total
        );


    } catch (error) {

        console.error(error);

        showError(
            error
        );
    }
}


// ======================================================
// UPDATE PRODUCT COUNT
// ======================================================

function updateProductCount(total) {

    productsCount.textContent =
        `${total} ${
            total === 1
                ? 'product'
                : 'products'
        }`;
}


// ======================================================
// SHOW ERROR
// ======================================================

function showError(error) {

    console.error(
        'Product error:',
        error
    );


    alert(
        error.message ||
        'Something went wrong.'
    );
}


// ======================================================
// SEARCH
// ======================================================

searchForm.addEventListener(
    'submit',
    event => {

        event.preventDefault();


        // Store the search term.
        currentSearch =
            searchInput.value.trim();


        // Search always starts at page 1.
        loadProducts(
            1,
            currentSearch
        );
    }
);


// ======================================================
// CLEAR SEARCH
// ======================================================

clearSearchButton.addEventListener(
    'click',
    () => {

        // Clear input.
        searchInput.value = '';


        // Clear application state.
        currentSearch = '';


        // Reload all products.
        loadProducts(
            1,
            ''
        );
    }
);


// ======================================================
// CREATE / UPDATE
// ======================================================

form.addEventListener(
    'submit',
    async event => {

        event.preventDefault();


        try {

            // Read form values.
            const data =
                productForm.getData();


            // Get product ID.
            const id =
                productForm.getProductId();


            if (id) {

                // UPDATE
                await productService.updateProduct(
                    id,
                    data
                );

            } else {

                // CREATE
                await productService.createProduct(
                    data
                );
            }


            // Clear form.
            productForm.reset();


            // Reload first page.
            loadProducts(
                1,
                currentSearch
            );


        } catch (error) {

            showError(
                error
            );
        }
    }
);

// ======================================================
// EDIT PRODUCT
// ======================================================

productsTable.addEventListener(
    'click',
    event => {

        const button =
            event.target.closest(
                '.edit-product'
            );

        if (!button) {
            return;
        }

        const id =
            Number(
                button.dataset.id
            );

        const product =
            products.find(
                product =>
                    product.id === id
            );

        if (!product) {
            return;
        }

        productForm.setProduct(
            product
        );
    }
);


// ======================================================
// DELETE PRODUCT
// ======================================================
//
// The application handles the workflow:
//
// 1. User clicks Delete.
// 2. Show confirmation modal.
// 3. Wait for user's decision.
// 4. If confirmed, call ProductService.
// 5. Reload the products.
//
// Notice that this code doesn't know how the modal
// itself works.
//
// It only asks:
// "Did the user confirm?"
//
// This keeps the responsibilities separated.
// ======================================================

productsTable.addEventListener(
    'click',
    async event => {

        // Find the Delete button.
        const button =
            event.target.closest(
                '.delete-product'
            );


        // If this wasn't a Delete button,
        // do nothing.
        if (!button) {

            return;
        }


        // Get the product ID.
        const id =
            Number(
                button.dataset.id
            );


        // Show the confirmation modal.
        //
        // The modal returns:
        //
        // true  → user confirmed
        // false → user cancelled
        //
        const confirmed =
            await deleteModal.show();


        // User cancelled.
        if (!confirmed) {

            return;
        }


        try {

            // Delete through the service.
            await productService.deleteProduct(
                id
            );


            // If the deleted product was the only
            // product on the current page and we're
            // not on the first page, go back one page.
            if (
                products.length === 1 &&
                currentPage > 1
            ) {

                await loadProducts(
                    currentPage - 1,
                    currentSearch
                );

            } else {

                // Otherwise reload the current page.
                await loadProducts(
                    currentPage,
                    currentSearch
                );
            }


        } catch (error) {

            showError(
                error
            );
        }
    }
);


// ======================================================
// CANCEL EDITING
// ======================================================

cancelButton.addEventListener(
    'click',
    () => {

        productForm.reset();

    }
);


// ======================================================
// INITIALIZE APPLICATION
// ======================================================

loadProducts(
    1,
    ''
);
