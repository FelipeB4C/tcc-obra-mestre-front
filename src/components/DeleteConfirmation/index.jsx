import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const DeleteConfirmation = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você tem certeza que deseja deletar este usuário?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Deletar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
