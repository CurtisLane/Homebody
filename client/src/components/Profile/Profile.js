import React, { useContext, useEffect } from "react";
import BodyContext from "../../utils/BodyContext";
import API from "../../utils/API";
import SavedWorkoutCard from "../SavedWorkoutCard/SavedWorkoutCard";
import SavedWorkoutTab from '../Tabs/Tabs'

const Profile = () => {
  const { userState, userWorkouts, setUserWorkouts } = useContext(BodyContext);
  const userId = userState._id;

  useEffect(() => {
    (async () => {
      if (userId) {
        API.getUserWorkouts().then(r => {
          const savedWorkouts = r.data.savedWorkouts
          setUserWorkouts(savedWorkouts);
        });
      }
    })()
  }, [userState]);

  return (
    <div className="container-fluid page">
      <div className="row d-flex justify-content-center mt-4">
        {userWorkouts.length ?
          userWorkouts.map(w => {
            return (
            // <SavedWorkoutTab
            //   key={w._id}
            //   id={w._id}
            //   date={w.created}
            //   exercises={w.workout}/>
            
            <SavedWorkoutCard
              key={w._id}
              id={w._id}
              date={w.created}
              exercises={w.workout}
            />
            )
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
