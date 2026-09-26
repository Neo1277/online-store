// ======================================================
// DELETE CONFIRMATION MODAL
// ======================================================
//
// Responsibility:
// Handle the confirmation modal.
//
// This class is responsible ONLY for:
// - Showing the modal
// - Hiding the modal
// - Returning the user's confirmation
//
// It does NOT:
// - Delete products
// - Call the API
// - Know about ProductService
// - Know about Laravel
//
// This follows the Single Responsibility Principle.
// ======================================================

export default class DeleteConfirmationModal {

    constructor(modalElement) {

        this.modalElement = modalElement;

        // Bootstrap modal instance.
        this.modal =
            new bootstrap.Modal(
                this.modalElement
            );


        // Get the buttons from the modal.
        this.confirmButton =
            this.modalElement.querySelector(
                '[data-confirm-delete]'
            );

        this.cancelButton =
            this.modalElement.querySelector(
                '[data-cancel-delete]'
            );


        // Store the current resolve function.
        //
        // This allows us to return true/false
        // when the user interacts with the modal.
        this.resolveConfirmation = null;


        this.registerEvents();
    }


    // ==================================================
    // REGISTER EVENTS
    // ==================================================

    registerEvents() {

        // User clicked "Delete".
        this.confirmButton.addEventListener(
            'click',
            () => {

                this.close();

                if (this.resolveConfirmation) {

                    this.resolveConfirmation(
                        true
                    );

                    this.resolveConfirmation =
                        null;
                }
            }
        );


        // User clicked "Cancel".
        this.cancelButton.addEventListener(
            'click',
            () => {

                this.close();

                if (this.resolveConfirmation) {

                    this.resolveConfirmation(
                        false
                    );

                    this.resolveConfirmation =
                        null;
                }
            }
        );


        // User closes the modal using
        // the X button or outside the modal.
        this.modalElement.addEventListener(
            'hidden.bs.modal',
            () => {

                if (this.resolveConfirmation) {

                    this.resolveConfirmation(
                        false
                    );

                    this.resolveConfirmation =
                        null;
                }
            }
        );
    }


    // ==================================================
    // SHOW
    // ==================================================

    show() {

        return new Promise(resolve => {

            this.resolveConfirmation =
                resolve;

            this.modal.show();

        });
    }


    // ==================================================
    // CLOSE
    // ==================================================

    close() {

        this.modal.hide();
    }
}