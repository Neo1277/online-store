<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <!-- Laravel CSRF Token -->
    <meta
        name="csrf-token"
        content="{{ csrf_token() }}"
    >

    <title>Product Management</title>


    <!-- Bootstrap 5 CSS -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    ></script>

    <!-- Our JavaScript -->
    @vite('resources/js/products.js')

</head>

<body class="bg-light">


    <!-- Navbar -->
    <nav class="navbar navbar-dark bg-dark">

        <div class="container">

            <span class="navbar-brand mb-0 h1">
                Online Store
            </span>

        </div>

    </nav>


    <!-- Main Content -->
    <main class="container py-5">

        <div class="row">

            <div class="col-12">

                <div class="card shadow-sm">

                    <div class="card-header bg-primary text-white">

                        <h1 class="h4 mb-0">
                            Product Management
                        </h1>

                    </div>


                    <div class="card-body">


                        <!-- Product Form -->
                        <form id="productForm">

                            <!-- Hidden Product ID -->
                            <input
                                type="hidden"
                                id="productId"
                            >


                            <div class="row g-3">


                                <!-- Product Name -->
                                <div class="col-md-6">

                                    <label
                                        for="name"
                                        class="form-label"
                                    >
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        placeholder="Enter product name"
                                        required
                                    >

                                </div>


                                <!-- Price -->
                                <div class="col-md-3">

                                    <label
                                        for="price"
                                        class="form-label"
                                    >
                                        Price
                                    </label>

                                    <div class="input-group">

                                        <span class="input-group-text">
                                            $
                                        </span>

                                        <input
                                            type="number"
                                            class="form-control"
                                            id="price"
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                            required
                                        >

                                    </div>

                                </div>


                                <!-- Stock -->
                                <div class="col-md-3">

                                    <label
                                        for="stock"
                                        class="form-label"
                                    >
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        class="form-control"
                                        id="stock"
                                        placeholder="0"
                                        min="0"
                                        required
                                    >

                                </div>


                            </div>


                            <!-- Buttons -->
                            <div class="mt-4">

                                <button
                                    type="submit"
                                    class="btn btn-primary"
                                >
                                    Save Product
                                </button>


                                <button
                                    type="button"
                                    id="cancelButton"
                                    class="btn btn-secondary"
                                    style="display: none;"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>


                    </div>

                </div>


                <!-- Products Table -->
                <!-- Products Table -->
                <div class="card shadow-sm mt-4">

                    <div class="card-header">

                        <div class="d-flex justify-content-between align-items-center">

                            <h2 class="h5 mb-0">
                                Products
                            </h2>

                            <span
                                id="productsCount"
                                class="badge bg-secondary"
                            >
                                0 products
                            </span>

                        </div>

                    </div>


                    <div class="card-body">


                        <!-- Search Form -->
                        <form id="searchForm">

                            <div class="row g-2">

                                <div class="col-md-8">

                                    <label
                                        for="searchInput"
                                        class="visually-hidden"
                                    >
                                        Search products
                                    </label>

                                    <input
                                        type="text"
                                        id="searchInput"
                                        class="form-control"
                                        placeholder="Search products..."
                                    >

                                </div>


                                <div class="col-md-auto">

                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Search
                                    </button>

                                </div>


                                <div class="col-md-auto">

                                    <button
                                        type="button"
                                        id="clearSearchButton"
                                        class="btn btn-outline-secondary"
                                    >
                                        Clear
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>


                    <div class="card-body p-0">

                        <div class="table-responsive">

                            <table
                                class="table table-hover table-striped mb-0"
                            >

                                <thead class="table-dark">

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Price
                                        </th>

                                        <th>
                                            Stock
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody id="productsTable">

                                    <!-- JavaScript will insert products here -->

                                </tbody>

                            </table>

                        </div>

                    </div>


                    <!-- Pagination -->
                    <div class="card-footer">

                        <nav aria-label="Product pagination">

                            <ul
                                id="pagination"
                                class="pagination justify-content-center mb-0"
                            >
                            </ul>

                        </nav>

                    </div>

                </div>




            </div>

        </div>

    </main>
    
    <!-- ================================================== -->
    <!-- DELETE CONFIRMATION MODAL                         -->
    <!-- ================================================== -->

    <div
        class="modal fade"
        id="deleteConfirmationModal"
        tabindex="-1"
        aria-labelledby="deleteConfirmationModalLabel"
        aria-hidden="true"
    >

        <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content">

                <!-- Modal header -->
                <div class="modal-header">

                    <h5
                        class="modal-title"
                        id="deleteConfirmationModalLabel"
                    >
                        Confirm deletion
                    </h5>

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>

                </div>


                <!-- Modal body -->
                <div class="modal-body">

                    <p class="mb-0">
                        Are you sure you want to delete this product?
                    </p>

                    <p class="text-muted small mt-2 mb-0">
                        This action cannot be undone.
                    </p>

                </div>


                <!-- Modal footer -->
                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-cancel-delete
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="btn btn-danger"
                        data-confirm-delete
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    </div>


    <!-- Bootstrap 5 JavaScript -->
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    ></script>

</body>

</html>
