// ======================================================
// CSRF TOKEN
// ======================================================

// Laravel generates a CSRF token in the Blade view:
//
// <meta name="csrf-token" content="{{ csrf_token() }}">
//
// We read the token here so it can be sent with
// POST, PUT and DELETE requests.
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');


// ======================================================
// HTML ELEMENTS
// ======================================================

// Product form.
const form =
    document.getElementById('productForm');


// Hidden field containing the product ID.
//
// Empty = create product
// Contains ID = update product
const productId =
    document.getElementById('productId');


// Product name input.
const nameInput =
    document.getElementById('name');


// Product price input.
const priceInput =
    document.getElementById('price');


// Product stock input.
const stockInput =
    document.getElementById('stock');


// Table body where products will be displayed.
const productsTable =
    document.getElementById('productsTable');


// Cancel editing button.
const cancelButton =
    document.getElementById('cancelButton');


// Pagination container.
const pagination =
    document.getElementById('pagination');


// Total products badge.
const productsCount =
    document.getElementById('productsCount');


// ======================================================
// SEARCH ELEMENTS
// ======================================================

// Search form.
const searchForm =
    document.getElementById('searchForm');


// Search input.
const searchInput =
    document.getElementById('searchInput');


// Clear search button.
const clearSearchButton =
    document.getElementById(
        'clearSearchButton'
    );


// ======================================================
// APPLICATION STATE
// ======================================================

// Products currently loaded from Laravel.
//
// This contains only the products for the current
// pagination page.
let products = [];


// Current pagination page.
let currentPage = 1;


// Last available pagination page.
let lastPage = 1;


// Current search term.
//
// Example:
//
// ""
//
// or:
//
// "keyboard"
let currentSearch = '';


// ======================================================
// LOAD PRODUCTS
// ======================================================

// Loads products from Laravel.
//
// Examples:
//
// /api/products
//
// /api/products?page=2
//
// /api/products?search=keyboard
//
// /api/products?search=keyboard&page=2
async function loadProducts(page = 1) {

    try {

        // Create URL parameters.
        const params =
            new URLSearchParams();


        // Add the page number.
        params.set(
            'page',
            page
        );


        // If there is a search term,
        // add it to the request.
        if (currentSearch) {

            params.set(
                'search',
                currentSearch
            );
        }


        // Build the final URL.
        const url =
            `/api/products?${params.toString()}`;


        // Send GET request to Laravel.
        const response =
            await fetch(url);


        // Check for HTTP errors.
        if (!response.ok) {

            throw new Error(
                'Failed to load products.'
            );
        }


        // Convert JSON response into
        // a JavaScript object.
        const result =
            await response.json();


        // Laravel's paginator stores the
        // products inside "data".
        products =
            result.data;


        // Store current page.
        currentPage =
            result.current_page;


        // Store last page.
        lastPage =
            result.last_page;


        // Render table.
        renderProducts();


        // Render pagination.
        renderPagination(result);


        // Update product counter.
        updateProductCount(result);


    } catch (error) {

        console.error(error);

        alert(
            'Failed to load products.'
        );
    }
}


// ======================================================
// RENDER PRODUCTS
// ======================================================

// Creates the table rows.
function renderProducts() {

    // Clear the current table.
    productsTable.innerHTML = '';


    // If no products were found,
    // display a message.
    if (products.length === 0) {

        productsTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-4"
                >

                    No products found.

                </td>

            </tr>

        `;

        return;
    }


    // Loop through the products.
    products.forEach(product => {

        // Create a table row.
        const row =
            document.createElement('tr');


        // Create the row HTML.
        row.innerHTML = `

            <td>
                ${product.id}
            </td>


            <td>
                ${product.name}
            </td>


            <td>
                $${product.price}
            </td>


            <td>
                ${product.stock}
            </td>


            <td>

                <!-- Edit button -->
                <button
                    class="btn btn-sm btn-warning me-1"
                    onclick="editProduct(${product.id})"
                >
                    Edit
                </button>


                <!-- Delete button -->
                <button
                    class="btn btn-sm btn-danger"
                    onclick="deleteProduct(${product.id})"
                >
                    Delete
                </button>

            </td>

        `;


        // Add row to table.
        productsTable.appendChild(row);

    });
}


// ======================================================
// RENDER PAGINATION
// ======================================================

// Creates Bootstrap pagination.
//
// Example:
//
// « 1 2 3 4 5 »
function renderPagination(result) {

    // Clear existing pagination.
    pagination.innerHTML = '';


    // If there is only one page,
    // we don't need pagination.
    if (result.last_page <= 1) {

        return;
    }


    // ==================================================
    // PREVIOUS BUTTON
    // ==================================================

    const previousLi =
        document.createElement('li');


    previousLi.classList.add(
        'page-item'
    );


    // Disable Previous on page 1.
    if (
        result.current_page === 1
    ) {

        previousLi.classList.add(
            'disabled'
        );
    }


    const previousButton =
        document.createElement('button');


    previousButton.classList.add(
        'page-link'
    );


    previousButton.innerHTML =
        '&laquo;';


    previousButton.setAttribute(
        'aria-label',
        'Previous'
    );


    previousButton.addEventListener(
        'click',
        () => {

            if (
                result.current_page > 1
            ) {

                loadProducts(
                    result.current_page - 1
                );
            }

        }
    );


    previousLi.appendChild(
        previousButton
    );


    pagination.appendChild(
        previousLi
    );


    // ==================================================
    // PAGE NUMBERS
    // ==================================================

    for (
        let page = 1;
        page <= result.last_page;
        page++
    ) {

        const pageLi =
            document.createElement('li');


        pageLi.classList.add(
            'page-item'
        );


        // Highlight current page.
        if (
            page === result.current_page
        ) {

            pageLi.classList.add(
                'active'
            );
        }


        const pageButton =
            document.createElement('button');


        pageButton.classList.add(
            'page-link'
        );


        pageButton.textContent =
            page;


        pageButton.addEventListener(
            'click',
            () => {

                loadProducts(page);

            }
        );


        pageLi.appendChild(
            pageButton
        );


        pagination.appendChild(
            pageLi
        );
    }


    // ==================================================
    // NEXT BUTTON
    // ==================================================

    const nextLi =
        document.createElement('li');


    nextLi.classList.add(
        'page-item'
    );


    // Disable Next on the last page.
    if (
        result.current_page ===
        result.last_page
    ) {

        nextLi.classList.add(
            'disabled'
        );
    }


    const nextButton =
        document.createElement('button');


    nextButton.classList.add(
        'page-link'
    );


    nextButton.innerHTML =
        '&raquo;';


    nextButton.setAttribute(
        'aria-label',
        'Next'
    );


    nextButton.addEventListener(
        'click',
        () => {

            if (
                result.current_page <
                result.last_page
            ) {

                loadProducts(
                    result.current_page + 1
                );
            }

        }
    );


    nextLi.appendChild(
        nextButton
    );


    pagination.appendChild(
        nextLi
    );
}


// ======================================================
// UPDATE PRODUCT COUNT
// ======================================================

// Updates the badge:
//
// 50 products
//
// If searching:
//
// 3 products
function updateProductCount(result) {

    const count =
        result.total;


    productsCount.textContent =
        `${count} ${
            count === 1
                ? 'product'
                : 'products'
        }`;
}


// ======================================================
// SEARCH
// ======================================================

// This event runs when the user submits
// the search form.
searchForm.addEventListener(
    'submit',
    function (event) {

        // Prevent normal HTML form submission.
        event.preventDefault();


        // Get the search text.
        //
        // trim() removes unnecessary spaces.
        currentSearch =
            searchInput.value.trim();


        // Always start from page 1
        // when performing a new search.
        loadProducts(1);

    }
);


// ======================================================
// CLEAR SEARCH
// ======================================================

// Runs when the user clicks Clear.
clearSearchButton.addEventListener(
    'click',
    function () {

        // Clear the search input.
        searchInput.value = '';


        // Remove the current search.
        currentSearch = '';


        // Reload all products starting
        // from page 1.
        loadProducts(1);

    }
);


// ======================================================
// CREATE / UPDATE PRODUCT
// ======================================================

// Handles both creating and updating.
//
// CREATE:
//
// POST /api/products
//
// UPDATE:
//
// PUT /api/products/{id}
form.addEventListener(
    'submit',
    async function (event) {

        // Prevent normal browser form submission.
        event.preventDefault();


        // Get product ID.
        const id =
            productId.value;


        // Get form values.
        const data = {

            name:
                nameInput.value,

            price:
                priceInput.value,

            stock:
                stockInput.value

        };


        // Default operation:
        // CREATE
        let url =
            '/api/products';

        let method =
            'POST';


        // If we have an ID:
        // UPDATE
        if (id) {

            url =
                `/api/products/${id}`;

            method =
                'PUT';
        }


        try {

            const response =
                await fetch(
                    url,
                    {

                        method:
                            method,

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Accept':
                                'application/json',

                            'X-CSRF-TOKEN':
                                csrfToken

                        },

                        body:
                            JSON.stringify(data)

                    }
                );


            // Check if Laravel returned an error.
            if (!response.ok) {

                const error =
                    await response.json();


                console.error(error);


                // Laravel validation error.
                if (
                    response.status === 422
                ) {

                    alert(
                        'Please check the information you entered.'
                    );

                } else {

                    alert(
                        'Something went wrong.'
                    );
                }


                return;
            }


            // Clear form.
            resetForm();


            // Reload page 1.
            //
            // Since the products are ordered by latest(),
            // a newly-created product will appear at the top.
            await loadProducts(1);


        } catch (error) {

            console.error(error);

            alert(
                'Something went wrong.'
            );
        }

    }
);


// ======================================================
// EDIT PRODUCT
// ======================================================

// Called when Edit is clicked.
function editProduct(id) {

    // Find the product in the current page.
    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) {

        return;
    }


    // Put product ID into hidden input.
    productId.value =
        product.id;


    // Fill the form.
    nameInput.value =
        product.name;

    priceInput.value =
        product.price;

    stockInput.value =
        product.stock;


    // Show Cancel button.
    cancelButton.style.display =
        'inline-block';


    // Scroll to the form.
    window.scrollTo({

        top: 0,

        behavior: 'smooth'

    });
}


// ======================================================
// DELETE PRODUCT
// ======================================================

// Deletes a product.
async function deleteProduct(id) {

    // Ask for confirmation.
    const confirmed =
        confirm(
            'Are you sure you want to delete this product?'
        );


    if (!confirmed) {

        return;
    }


    try {

        // Send DELETE request.
        const response =
            await fetch(
                `/api/products/${id}`,
                {

                    method:
                        'DELETE',

                    headers: {

                        'Accept':
                            'application/json',

                        'X-CSRF-TOKEN':
                            csrfToken

                    }

                }
            );


        if (!response.ok) {

            const error =
                await response.json();


            console.error(error);


            alert(
                'Failed to delete product.'
            );


            return;
        }


        // If we deleted the only product
        // on the current page, we may need
        // to go back to the previous page.
        if (
            products.length === 1 &&
            currentPage > 1
        ) {

            await loadProducts(
                currentPage - 1
            );

        } else {

            await loadProducts(
                currentPage
            );
        }


    } catch (error) {

        console.error(error);

        alert(
            'Something went wrong.'
        );
    }
}


// ======================================================
// CANCEL EDITING
// ======================================================

cancelButton.addEventListener(
    'click',
    function () {

        resetForm();

    }
);


// ======================================================
// RESET FORM
// ======================================================

// Resets the product form.
function resetForm() {

    // Clear all inputs.
    form.reset();


    // Clear the product ID.
    //
    // Empty ID means the next submission
    // will create a product.
    productId.value = '';


    // Hide Cancel button.
    cancelButton.style.display =
        'none';
}


// ======================================================
// INITIAL LOAD
// ======================================================

// Load the first page when the application
// starts.
loadProducts(1);
