const INITIAL_STATE = {
    courseID: 'Course Details',
    courseName: ''
}
const courseDashboardReducer = (state = INITIAL_STATE, action) => {
    let statecopy = JSON.parse(JSON.stringify(state));
    const { type, payload } = action;
    //console.log(payload)
    switch (type) {
        case "COURSE_DASHBOARD":
            statecopy.courseID = payload.data.courseID;
            statecopy.courseName = payload.data.name;
            return statecopy;
        default:
            return statecopy;
    }
}

export default courseDashboardReducer;