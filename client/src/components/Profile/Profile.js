import React, { useContext, useEffect } from "react";
import BodyContext from "../../utils/BodyContext";
import API from "../../utils/API";
import SavedWorkoutCard from "../SavedWorkoutCard/SavedWorkoutCard";

const Profile = () => {
  const { userState, userWorkouts, setUserWorkouts } = useContext(BodyContext);
  const userId = userState._id;
  // const [userWorkouts, setUserWorkouts] = useState([]);


  useEffect(() => {
      if (userId) {
        API.getUserWorkouts(userId).then(r => {
          const savedWorkouts = r.data.savedWorkouts
          console.log("savedWorkouts: ", r)
          setUserWorkouts(savedWorkouts);

        });
      }
  }, [userState]);
  console.log("userWorkouts hook: ", userWorkouts)

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center mt-4">
        {userWorkouts.length ?
          userWorkouts.map(w => {
            return (<SavedWorkoutCard
              key={w._id}
              id={w._id}
              date={w.created}
              exercises={w.workout}
            />)
          })
          : <>
            <div className="container mt-4">
              <h3 className="text-center text-light">You have no saved workouts. Go back to the <a href="/home">home page</a> to create one!</h3>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Profile;
