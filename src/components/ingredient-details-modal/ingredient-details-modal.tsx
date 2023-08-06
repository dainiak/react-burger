import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";

export const IngredientDetailsModal = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const closeIngredientDetails = () => {
        navigate('/', {replace: true});
    }

    return (
        <Modal onClose={closeIngredientDetails}>
            <IngredientDetails ingredientId={id} />
        </Modal>
    );
}