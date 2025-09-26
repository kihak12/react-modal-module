import React from "react";
import { ModalComponent } from "../../src/ModalComponent";

const composeSelector = (name: string) => `[data-selector=\"modal-${name}\"]`;

const modal = {
    container: composeSelector('container'),
    closeButton: composeSelector('close-button'),
    closeButtonIcon: composeSelector('close-icon'),
    title: composeSelector('title'),
    content: composeSelector('content-text'),
    confirmButton: composeSelector('confirm-button'),
    cancelButton: composeSelector('cancel-button'),
}

describe("ModalComponent", () => {
  it("should render default modal values", () => {
    cy.mount(<ModalComponent />);

    cy.get(modal.container).should('exist').and('be.visible');

    cy.get(modal.closeButton).should('exist');
    cy.get(modal.closeButtonIcon).should('have.attr', 'src', 'data:image/svg+xml,%3c?xml%20version=\'1.0\'%20encoding=\'UTF-8\'?%3e%3csvg%20width=\'24\'%20height=\'24\'%20viewBox=\'0%200%2024%2024\'%20fill=\'none\'%20xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath%20d=\'M18%206L6%2018\'%20stroke=\'white\'%20stroke-width=\'2\'%20stroke-linecap=\'round\'/%3e%3cpath%20d=\'M6%206L18%2018\'%20stroke=\'white\'%20stroke-width=\'2\'%20stroke-linecap=\'round\'/%3e%3c/svg%3e')
        .and('have.attr', 'alt', 'Close Modal')

      cy.get(modal.title).should('not.exist');
      cy.get(modal.content).should('not.exist');

      cy.get(modal.confirmButton).should('exist');
      cy.contains(modal.confirmButton, 'Confirm');
      cy.get(modal.cancelButton).should('not.exist');

      cy.contains(modal.title, 'This expect should make github action fail, and don\'t push to npm registry')
  });

  it("should render provided title and content", () => {
    cy.mount(<ModalComponent title="My Modal" textContent="Hello world" />);

    cy.get(modal.title).should('exist').and('contain.text', 'My Modal');
    cy.get(modal.content).should('exist').and('contain.text', 'Hello world');
  });

  it("should show cancel button when enabled and use provided texts", () => {
    cy.mount(
      <ModalComponent
        showCancelButton
        cancelButtonText="Nope"
        confirmButtonText="Yep"
      />
    );

    cy.get(modal.confirmButton).should('exist').and('contain.text', 'Yep');
    cy.get(modal.cancelButton).should('exist').and('contain.text', 'Nope');
  });

  it("should call callbacks when buttons are clicked", () => {
    const onClose = cy.stub().as('onClose');
    const onConfirm = cy.stub().as('onConfirm');
    const onCancel = cy.stub().as('onCancel');

    cy.mount(
      <ModalComponent
        showCancelButton
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    cy.get(modal.closeButton).click();
    cy.get('@onClose').should('have.been.calledOnce');

    cy.get(modal.confirmButton).click();
    cy.get('@onConfirm').should('have.been.calledOnce');

    cy.get(modal.cancelButton).click();
    cy.get('@onCancel').should('have.been.calledOnce');
  });
});
