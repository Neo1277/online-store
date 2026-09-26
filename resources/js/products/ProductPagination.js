// ======================================================
// PRODUCT PAGINATION
// ======================================================
//
// Responsibility:
// Render and handle pagination controls.
//
// It does NOT:
// - communicate with Laravel
// - render products
// - manage the product form
//
// ======================================================

export default class ProductPagination {

    constructor(element, onPageChange) {

        this.element = element;

        // Callback provided by the application.
        //
        // The pagination component doesn't need to know
        // what happens when a page changes.
        this.onPageChange = onPageChange;
    }


    // ==================================================
    // RENDER
    // ==================================================

    render(result) {

        this.element.innerHTML = '';


        // No pagination necessary.
        if (result.last_page <= 1) {

            return;
        }


        this.renderPreviousButton(
            result
        );


        this.renderPageNumbers(
            result
        );


        this.renderNextButton(
            result
        );
    }


    // ==================================================
    // PREVIOUS BUTTON
    // ==================================================

    renderPreviousButton(result) {

        const li =
            document.createElement('li');


        li.classList.add(
            'page-item'
        );


        if (result.current_page === 1) {

            li.classList.add(
                'disabled'
            );
        }


        const button =
            document.createElement('button');


        button.classList.add(
            'page-link'
        );


        button.innerHTML =
            '&laquo;';


        button.setAttribute(
            'aria-label',
            'Previous'
        );


        button.addEventListener(
            'click',
            () => {

                if (result.current_page > 1) {

                    this.onPageChange(
                        result.current_page - 1
                    );
                }

            }
        );


        li.appendChild(button);

        this.element.appendChild(li);
    }


    // ==================================================
    // PAGE NUMBERS
    // ==================================================

    renderPageNumbers(result) {

        for (
            let page = 1;
            page <= result.last_page;
            page++
        ) {

            const li =
                document.createElement('li');


            li.classList.add(
                'page-item'
            );


            if (
                page === result.current_page
            ) {

                li.classList.add(
                    'active'
                );
            }


            const button =
                document.createElement('button');


            button.classList.add(
                'page-link'
            );


            button.textContent =
                page;


            button.addEventListener(
                'click',
                () => {

                    this.onPageChange(page);

                }
            );


            li.appendChild(button);

            this.element.appendChild(li);
        }
    }


    // ==================================================
    // NEXT BUTTON
    // ==================================================

    renderNextButton(result) {

        const li =
            document.createElement('li');


        li.classList.add(
            'page-item'
        );


        if (
            result.current_page ===
            result.last_page
        ) {

            li.classList.add(
                'disabled'
            );
        }


        const button =
            document.createElement('button');


        button.classList.add(
            'page-link'
        );


        button.innerHTML =
            '&raquo;';


        button.setAttribute(
            'aria-label',
            'Next'
        );


        button.addEventListener(
            'click',
            () => {

                if (
                    result.current_page <
                    result.last_page
                ) {

                    this.onPageChange(
                        result.current_page + 1
                    );
                }

            }
        );


        li.appendChild(button);

        this.element.appendChild(li);
    }
}
