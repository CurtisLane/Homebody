import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
import API from '../../utils/API'
import BodyContext from '../../utils/BodyContext';

/* This modal pops up in response to a user clicking the delete button on any SavedWorkoutCard component displayed. 
The id of the workout is passed through props from the Saved WorkoutCard to the DeleteButton and finally to the ConfrimDeleteModal to be used in the API call from the handleDelete method. */

function ConfirmDeleteModal(props) {
    const { userWorkouts, setUserWorkouts } = useContext(BodyContext);

    const handleDelete = event => {
        const workoutId = event.target.attributes.getNamedItem("data-value").value
        const newWorkouts = userWorkouts.filter(workout => workout._id !== workoutId)
        setUserWorkouts(newWorkouts)
        API.removeWorkout(workoutId)
        .then(r => props.onHide())
        .catch(err => console.log(err))
    }

    return (

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='container-fluid text-danger text-center'
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <h3>Delete Workout?</h3>
                <p className="mt-3">
                    This action can not be undone! Are you sure you want to permanently delete this workout?
                </p>
            </Modal.Body>
            <Modal.Footer className="row d-flex justify-content-center text-center m-0">
                <div className="col-10 col-md-8 offset-1 offset-md-2 row mt-2">
                    <div className="col-6">
                        <Button className="btn btn-primary" onClick={props.onHide}>Close</Button>
                    </div>
                    <div className="col-6">
                        <Button className="btn btn-danger" data-value={props.id} onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeleteModal