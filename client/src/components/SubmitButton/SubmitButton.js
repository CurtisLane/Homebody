import React, { useContext, useState, useEffect } from "react";
import BodyContext from "../../utils/BodyContext";
import API from '../../utils/API'

function SubmitButton() {

    const { targets, setTargets } = useContext(BodyContext);
    const [ selectedState, updateSelected ] = useState(false)

    // toggle submit button deactivation based on targets hook
    useEffect(() => {
     (async () => {
         if (targets.options[0].selected || targets.options[1].selected || targets.options[2].selected || targets.options[3].selected){
            updateSelected(true)
        } else {
            updateSelected(false)
        }
     })()
        
    }, [targets])
    
    // function for a single target query
    const oneTarget = data => {
        setTargets({...targets}, targets.workout = data)
    }

    // function for a two target query
    const twoTargets = (data, targetArr) => {
        let countOne = 0
        let countTwo = 0
        let n = data.length
        let workoutArr = []

        for (let i =0; i < n; i++){
            if (data[i].target === targetArr[0] && countOne < 3){
                workoutArr.push(data[i])
                countOne++
            } else if (data[i].target === targetArr[1] && countTwo < 3) {
                workoutArr.push(data[i])
                countTwo++
            }
        }
        setTargets({...targets}, targets.workout = workoutArr)
    }

    // function for three target query
    const threeTargets = (data, targetArr) => {
        let countOne = 0
        let countTwo = 0
        let countThree = 0
        let n = data.length
        let workoutArr = []

        for (let i =0; i < n; i++){
            if (data[i].target === targetArr[0] && countOne < 2){
                workoutArr.push(data[i])
                countOne++
            } else if (data[i].target === targetArr[1] && countTwo < 2) {
                workoutArr.push(data[i])
                countTwo++
            } else if (data[i].target === targetArr[2] && countThree < 2) {
                workoutArr.push(data[i])
                countThree++
            }
        }
        setTargets({...targets}, targets.workout = workoutArr)
    }

    // function for four target query
    const fourTargets = (data, targetArr) => {
        let countOne = 0
        let countTwo = 0
        let countThree = 0
        let countFour = 0
        let n = data.length
        let workoutArr = []

        for (let i =0; i < n; i++){
            if (data[i].target === targetArr[0] && countOne < 2){
                workoutArr.push(data[i])
                countOne++
            } else if (data[i].target === targetArr[1] && countTwo < 2) {
                workoutArr.push(data[i])
                countTwo++
            } else if (data[i].target === targetArr[2] && countThree < 2) {
                workoutArr.push(data[i])
                countThree++
            } else if (data[i].target === targetArr[3] && countFour < 2) {
                workoutArr.push(data[i])
                countFour++
            }
        }
        setTargets({...targets}, targets.workout = workoutArr)
    }

    // on submit button click
    const handleSubmit = e => {
        let targetArr = []
        for (let i = 0; i < 4; i++){
            if (targets.options[i].selected){
                targetArr.push(targets.options[i].name.toLowerCase())
            }
        }
        API.getExerciseByTarget(targetArr)
        .then(results => {
            
            let data = results.data
            for(let i = data.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * i)
                const temp = data[i]
                data[i] = data[j]
                data[j] = temp
            }
            switch (targetArr.length){
                case 1:
                    oneTarget(data)
                    console.log(targets.workout)
                    break;
                case 2:
                    twoTargets(data, targetArr)
                    console.log(targets.workout)
                    break;
                case 3:
                    threeTargets(data, targetArr)
                    console.log(targets.workout)
                    break;
                case 4:
                    fourTargets(data, targetArr)
                    console.log(targets.workout)
                    break;
                default:
                    console.log('Something went wrong.')
            }
        })
    }

    return (
        <div>

            <button type="button" className="btn btn-danger btn-lg" disabled={!selectedState} onClick={handleSubmit}>Create My Workout</button>

        </div>
    )
}

export default SubmitButton