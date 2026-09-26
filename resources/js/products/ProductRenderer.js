// ======================================================
// PRODUCT RENDERER
// ======================================================
//
// Responsibility:
// Render products into the HTML table.
//
// This class does NOT:
// - make API calls
// - manage pagination
// - submit forms
// - delete products
//
// Single Responsibility Principle.
// ======================================================

export default class ProductRenderer {

    constructor(tableElement) {

        this.tableElement = tableElement;
    }


    // ==================================================
    // RENDER PRODUCTS
    // ==================================================

    render(products) {

        // Clear the existing table.
        this.tableElement.innerHTML = '';


        // If there are no products,
        // display a friendly message.
        if (products.length === 0) {

            this.renderEmptyState();

            return;
        }


        // Create a row for every product.
        products.forEach(product => {

            const row =
                this.createProductRow(product);


            this.tableElement.appendChild(row);

        });
    }


    // ==================================================
    // CREATE PRODUCT ROW
    // ==================================================

    createProductRow(product) {

        const row =
            document.createElement('tr');


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

                <button
                    type="button"
                    class="btn btn-sm btn-warning me-1 edit-product"
                    data-id="${product.id}"
                >
                    Edit
                </button>

                <button
                    type="button"
                    class="btn btn-sm btn-danger delete-product"
                    data-id="${product.id}"
                >
                    Delete
                </button>

            </td>

        `;


        return row;
    }


    // ==================================================
    // EMPTY STATE
    // ==================================================

    renderEmptyState() {

        this.tableElement.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center text-muted py-4"
                >
                    No products found.
                </td>

            </tr>

        `;
    }
}
