// ======================================================
// PRODUCT FORM
// ======================================================
//
// Responsibility:
// Handle the product form.
//
// It knows how to:
// - read form values
// - populate the form
// - reset the form
//
// It does NOT:
// - communicate directly with Laravel
// - render the product table
// - manage pagination
// ======================================================

export default class ProductForm {

    constructor(
        form,
        productIdInput,
        nameInput,
        priceInput,
        stockInput,
        cancelButton
    ) {

        this.form = form;

        this.productIdInput =
            productIdInput;

        this.nameInput =
            nameInput;

        this.priceInput =
            priceInput;

        this.stockInput =
            stockInput;

        this.cancelButton =
            cancelButton;
    }


    // ==================================================
    // GET FORM DATA
    // ==================================================

    getData() {

        return {

            name:
                this.nameInput.value.trim(),

            price:
                this.priceInput.value,

            stock:
                this.stockInput.value

        };
    }


    // ==================================================
    // GET PRODUCT ID
    // ==================================================

    getProductId() {

        return this.productIdInput.value;
    }


    // ==================================================
    // SET PRODUCT
    // ==================================================

    setProduct(product) {

        this.productIdInput.value =
            product.id;

        this.nameInput.value =
            product.name;

        this.priceInput.value =
            product.price;

        this.stockInput.value =
            product.stock;


        this.cancelButton.style.display =
            'inline-block';


        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });
    }


    // ==================================================
    // RESET
    // ==================================================

    reset() {

        this.form.reset();

        this.productIdInput.value = '';

        this.cancelButton.style.display =
            'none';
    }
}
