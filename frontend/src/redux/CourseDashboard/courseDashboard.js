const INITIAL_STATE = {
    courseID: 'Course Details',
    courseName: '',
    enrollString: '',
    name: '',
}
const courseDashboardReducer = (state = INITIAL_STATE, action) => {
    let statecopy = JSON.parse(JSON.stringify(state));
    const { type, payload } = action;
    switch (type) {
        case "COURSE_DASHBOARD":
            statecopy.courseID = payload.data.courseID;
            statecopy.courseName = payload.data.name;
            statecopy.enrollString = payload.data.enrollString;
            return statecopy;

        case "SET_NAME":
            statecopy.name = payload;
            return statecopy;

        default:
            return statecopy;
    }
}

export default courseDashboardReducer;